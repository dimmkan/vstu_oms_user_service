import { UserGetAvatar, UserGetInfo, UserSetAvatar, UserUpdateInfo, UserDeleteAvatar, ValidateUserEmail, GenerateRefreshPasswordLink, ConfirmRefreshPasswordLink } from '../contracts';
import { MailerService } from 'src/mailer/mailer.service';
export declare class UserService {
    private readonly mailerService;
    directus: any;
    constructor(mailerService: MailerService);
    getUserInfo(id: number): Promise<UserGetInfo.Response>;
    updateUserInfo(dto: UserUpdateInfo.Request): Promise<UserUpdateInfo.Response>;
    getUserAvatar(id: number): Promise<UserGetAvatar.Response>;
    setUserAvatar(dto: UserSetAvatar.Request): Promise<UserSetAvatar.Response>;
    deleteUserAvatar(id: number): Promise<UserDeleteAvatar.Response>;
    validateUserEmail(email: string): Promise<ValidateUserEmail.Response>;
    generateRefreshPasswordLink(email: string, new_password: string): Promise<GenerateRefreshPasswordLink.Response>;
    confirmRefreshPasswordLink(hash: string): Promise<ConfirmRefreshPasswordLink.Response>;
}
