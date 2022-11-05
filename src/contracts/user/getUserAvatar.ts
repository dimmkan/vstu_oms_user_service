import { IsNumber } from 'class-validator';

export namespace UserGetAvatar {
  export const topic = 'user.getavatar.query';

  export class Request {
    @IsNumber()
    id: number;
  }

  export class Response {
    avatar_id: string;
  }
}
