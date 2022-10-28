import { IsNumber } from 'class-validator';

export namespace UserGetInfo {
  export const topic = 'user.getinfo.query';

  export class Request {
    @IsNumber()
    id: number;
  }

  export class Response {
    id: number;
    email: string;
    confirmed: boolean;
    user_profile: {
      id: number;
      full_name: string;
      sex: string;
      birthday: string;
      user_building: {
        id: number;
        name: string;
        address: string;
      };
    };
  }
}
