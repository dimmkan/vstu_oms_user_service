export declare namespace UserSetAvatar {
    const topic = "user.setavatar.query";
    class Request {
        id: number;
        avatar: string;
        filename: string;
    }
    class Response {
        avatar_id: string;
    }
}
