import { IsNotEmpty, IsString } from 'class-validator';

export namespace ConfirmRefreshPasswordLink {
  export const topic = 'user.confirmrefreshpasswordlink.command';

  export class Request {
    @IsString()
    @IsNotEmpty()
    hash: string;
  }

  export class Response {
    success: boolean;
  }
}
