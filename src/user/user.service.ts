import { Directus } from '@directus/sdk';
import { Injectable } from '@nestjs/common';
import { UserGetInfo, UserUpdateInfo } from '../contracts';

@Injectable()
export class UserService {
  directus: any;
  constructor() {
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
    await user_profiles_collection.updateOne(dto.id, dto.user_profile);
    return { success: true };
  }
}
