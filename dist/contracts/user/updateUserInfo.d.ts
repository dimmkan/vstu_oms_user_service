export declare namespace UserUpdateInfo {
    const topic = "user.updateinfo.query";
    class Request {
        id: number;
        user_profile: {
            full_name: string;
            sex: string;
            birthday: string;
            user_building: number;
        };
    }
    class Response {
        success: boolean;
    }
}
