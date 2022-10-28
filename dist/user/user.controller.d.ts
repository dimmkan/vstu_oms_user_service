import { UserGetInfo } from 'src/contracts';
import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getUserInfo({ id }: UserGetInfo.Request): Promise<UserGetInfo.Response>;
}
