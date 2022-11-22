export declare namespace GenerateRefreshPasswordLink {
    const topic = "user.generaterefreshpasswordlink.command";
    class Request {
        email: string;
        new_password: string;
    }
    class Response {
        success: boolean;
    }
}
