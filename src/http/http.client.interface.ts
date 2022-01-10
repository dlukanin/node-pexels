export interface IHttpClient {
    call<R = any>(uri: string, opts?: IRequestParams): Promise<R>;
}

export interface IRequestParams {
    readonly headers?: object;
    readonly query?: object;
    readonly body?: object;
    readonly json?: boolean;
}
