import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class MailerService {
  constructor(private readonly httpService: HttpService) {}

  async sendRefreshMail(password_hash: string, ToAddress: string) {
    const htmlText = `
    <h3>Смена пароля<h3>
    Для смены пароля перейдите по <a href=${process.env.GATEWAY_HOST}/user/confirm-refresh-link?hash=${password_hash}>ссылке</a>
    `;

    const data = {
      apiKey: process.env.EMAIL_TOKEN,
      Subject: 'Смена пароля',
      Body: htmlText,
      FromAddress: 'kandmi@rarus.ru',
      ToAddress,
    };
    await lastValueFrom(
      this.httpService.post(`${process.env.EMAIL_HOST}/singleEmail`, data),
    );
  }
}
