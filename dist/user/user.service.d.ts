import { UserGetAvatar, UserGetInfo, UserSetAvatar, UserUpdateInfo, UserDeleteAvatar } from '../contracts';
export declare class UserService {
    directus: any;
    constructor();
    getUserInfo(id: number): Promise<UserGetInfo.Response>;
    updateUserInfo(dto: UserUpdateInfo.Request): Promise<UserUpdateInfo.Response>;
    getUserAvatar(id: number): Promise<UserGetAvatar.Response>;
    setUserAvatar(dto: UserSetAvatar.Request): Promise<UserSetAvatar.Response>;
    deleteUserAvatar(id: number): Promise<UserDeleteAvatar.Response>;
}
