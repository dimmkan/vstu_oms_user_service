export namespace UserUpdateInfo {
  export const topic = 'user.updateinfo.query';

  export class Request {
    id: number;
    user_profile: {
      full_name: string;
      sex: string;
      birthday: string;
      user_building: number; // User building ID
    };
  }

  export class Response {
    success: boolean;
  }
}
