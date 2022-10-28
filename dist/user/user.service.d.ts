import { UserGetInfo } from '../contracts';
export declare class UserService {
    directus: any;
    constructor();
    getUserInfo(id: number): Promise<UserGetInfo.Response>;
}
