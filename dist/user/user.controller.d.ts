import { UserDeleteAvatar, UserGetAvatar, UserGetInfo, UserSetAvatar, UserUpdateInfo, ValidateUserEmail } from 'src/contracts';
import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getUserInfo({ id }: UserGetInfo.Request): Promise<UserGetInfo.Response>;
    updateUserInfo(dto: UserUpdateInfo.Request): Promise<UserUpdateInfo.Response>;
    getUserAvatar({ id }: UserGetAvatar.Request): Promise<UserGetAvatar.Response>;
    setUserAvatar(dto: UserSetAvatar.Request): Promise<UserSetAvatar.Response>;
    deleteUserAvatar({ id }: UserDeleteAvatar.Request): Promise<UserDeleteAvatar.Response>;
    validateUserEmail({ email }: ValidateUserEmail.Request): Promise<ValidateUserEmail.Response>;
}
