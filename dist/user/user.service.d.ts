import { UserGetInfo, UserUpdateInfo } from '../contracts';
export declare class UserService {
    directus: any;
    constructor();
    getUserInfo(id: number): Promise<UserGetInfo.Response>;
    updateUserInfo(dto: UserUpdateInfo.Request): Promise<UserUpdateInfo.Response>;
}
