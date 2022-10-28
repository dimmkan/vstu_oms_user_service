import { Directus } from '@directus/sdk';
import { Injectable } from '@nestjs/common';
import { UserGetInfo } from '../contracts';

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
        'user_profiles.id',
        'user_profiles.full_name',
        'user_profiles.sex',
        'user_profiles.birthday',
        'user_profiles.user_building.id',
        'user_profiles.user_building.name',
        'user_profiles.user_building.address',
      ],
    });
  }
}
