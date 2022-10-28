export declare namespace UserGetInfo {
    const topic = "user.getinfo.query";
    class Request {
        id: number;
    }
    class Response {
        id: number;
        email: string;
        confirmed: boolean;
        user_profiles: {
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
