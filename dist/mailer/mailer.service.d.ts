import { HttpService } from '@nestjs/axios';
export declare class MailerService {
    private readonly httpService;
    constructor(httpService: HttpService);
    sendRefreshMail(password_hash: string, ToAddress: string): Promise<void>;
}
