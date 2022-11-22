import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export namespace GenerateRefreshPasswordLink {
  export const topic = 'user.generaterefreshpasswordlink.command';

  export class Request {
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    new_password: string;
  }

  export class Response {
    success: boolean;
  }
}
