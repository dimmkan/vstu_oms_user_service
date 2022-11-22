export declare namespace ValidateUserEmail {
    const topic = "user.validateemail.command";
    class Request {
        email: string;
    }
    class Response {
        validate: boolean;
    }
}
