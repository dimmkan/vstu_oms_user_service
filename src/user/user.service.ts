import { Directus } from '@directus/sdk';
import { Injectable } from '@nestjs/common';
import {
  UserGetAvatar,
  UserGetInfo,
  UserSetAvatar,
  UserUpdateInfo,
  UserDeleteAvatar,
  ValidateUserEmail,
  GenerateRefreshPasswordLink,
  ConfirmRefreshPasswordLink,
} from '../contracts';
import * as _ from 'ramda';
import * as FormData from 'form-data';
import { Readable } from 'stream';
import * as bcrypt from 'bcrypt';
import { MailerService } from 'src/mailer/mailer.service';
import { RMQError } from 'nestjs-rmq';
import { ERROR_TYPE } from 'nestjs-rmq/dist/constants';

@Injectable()
export class UserService {
  directus: any;
  constructor(private readonly mailerService: MailerService) {
    this.directus = new Directus(process.env.DIRECTUS_HOST, {
      auth: {
        staticToken: process.env.ADMIN_API_KEY,
      },
    });
  }

  async getUserInfo(id: number): Promise<UserGetInfo.Response> {
    const users_collection = this.directus.items('users');
    return users_collection.readOne(id, {
      fields: [
        'id',
        'email',
        'confirmed',
        'user_profile.id',
        'user_profile.full_name',
        'user_profile.sex',
        'user_profile.birthday',
        'user_profile.user_building.id',
        'user_profile.user_building.name',
        'user_profile.user_building.address',
      ],
    });
  }

  async updateUserInfo(
    dto: UserUpdateInfo.Request,
  ): Promise<UserUpdateInfo.Response> {
    const user_profiles_collection = this.directus.items('user_profiles');
    const { id } = await user_profiles_collection
      .readByQuery({
        filter: {
          user_id: dto.id,
        },
        fields: ['id'],
      })
      .then(_.compose(_.head, _.path(['data'])));
    await user_profiles_collection.updateOne(id, dto.user_profile);
    return { success: true };
  }

  async getUserAvatar(id: number): Promise<UserGetAvatar.Response> {
    const user_avatar_collection = this.directus.items('user_avatar');
    const result = await user_avatar_collection
      .readByQuery({
        filter: {
          user_id: id,
        },
        fields: ['avatar'],
      })
      .then(_.compose(_.head, _.path(['data'])));
    return { avatar_id: (result && result.avatar) ?? '' };
  }

  async setUserAvatar(
    dto: UserSetAvatar.Request,
  ): Promise<UserSetAvatar.Response> {
    const user_avatar_collection = this.directus.items('user_avatar');
    const user_avatar = await user_avatar_collection
      .readByQuery({
        filter: {
          user_id: dto.id,
        },
        fields: ['id'],
      })
      .then(_.compose(_.head, _.path(['data'])));

    const form = new FormData();
    form.append('file', Readable.from(Buffer.from(dto.avatar, 'base64')), {
      filename: dto.filename,
    });
    const fileId = await this.directus.files.createOne(
      form,
      {},
      {
        requestOptions: {
          headers: {
            ...form.getHeaders(),
          },
        },
      },
    );

    if (!!user_avatar) {
      const result = await user_avatar_collection.updateOne(user_avatar.id, {
        avatar: fileId,
      });
      return { avatar_id: result.avatar };
    } else {
      const result = await user_avatar_collection.createOne({
        user_id: dto.id,
        avatar: fileId,
      });
      return { avatar_id: result.avatar };
    }
  }

  async deleteUserAvatar(id: number): Promise<UserDeleteAvatar.Response> {
    const user_avatar_collection = this.directus.items('user_avatar');
    const result = await user_avatar_collection
      .readByQuery({
        filter: {
          user_id: id,
        },
        fields: ['avatar'],
      })
      .then(_.compose(_.head, _.path(['data'])));

    if (!!result && !!result.avatar) {
      await this.directus.files.deleteOne(result.avatar);
    }

    return { success: true };
  }

  async validateUserEmail(email: string): Promise<ValidateUserEmail.Response> {
    const users_collection = this.directus.items('users');
    const result = await users_collection
      .readByQuery({
        filter: {
          email,
        },
        fields: ['id'],
      })
      .then(_.path(['data']));
    return { validate: !!result.length };
  }

  async generateRefreshPasswordLink(
    email: string,
    new_password: string,
  ): Promise<GenerateRefreshPasswordLink.Response> {
    const refresh_password_collection = this.directus.items('refresh_password');
    const hash = await bcrypt.hash(new_password, 10);
    await refresh_password_collection.createOne({
      email,
      new_password: hash,
    });

    await this.mailerService.sendRefreshMail(hash, email);

    return { success: true };
  }

  async confirmRefreshPasswordLink(
    hash: string,
  ): Promise<ConfirmRefreshPasswordLink.Response> {
    const refresh_password_collection = this.directus.items('refresh_password');
    const users_collection = this.directus.items('users');

    const result = await refresh_password_collection
      .readByQuery({
        filter: {
          new_password: hash,
        },
        fields: ['id,email'],
      })
      .then(_.compose(_.head, _.path(['data'])));

    if (!result) {
      throw new RMQError(
        '???????????? ?????? ?????????????????? ???????????? ???? ??????????????!',
        ERROR_TYPE.RMQ,
        400,
      );
    }

    const user = await users_collection
      .readByQuery({
        filter: {
          email: result.email,
        },
        fields: ['id'],
      })
      .then(_.compose(_.head, _.path(['data'])));

    await users_collection.updateOne(user.id, { password: hash });
    await refresh_password_collection.deleteOne(result.id);

    return { success: true };
  }
}
