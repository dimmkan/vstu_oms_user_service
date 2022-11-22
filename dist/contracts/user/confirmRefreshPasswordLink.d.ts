export declare namespace ConfirmRefreshPasswordLink {
    const topic = "user.confirmrefreshpasswordlink.command";
    class Request {
        hash: string;
    }
    class Response {
        success: boolean;
    }
}
