import { IsEmail } from 'class-validator';

export namespace ValidateUserEmail {
  export const topic = 'user.validateemail.command';

  export class Request {
    @IsEmail()
    email: string;
  }

  export class Response {
    validate: boolean;
  }
}
