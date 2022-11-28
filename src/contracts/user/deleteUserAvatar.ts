import { IsNotEmpty, IsNumber } from 'class-validator';

export namespace UserDeleteAvatar {
  export const topic = 'user.deleteavatar.query';

  export class Request {
    @IsNumber()
    @IsNotEmpty()
    id: number;
  }

  export class Response {
    success: boolean;
  }
}
