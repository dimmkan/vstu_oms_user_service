export namespace UserDeleteAvatar {
  export const topic = 'user.deleteavatar.query';

  export class Request {
    id: number;
  }

  export class Response {
    success: boolean;
  }
}
