export interface IHttpClient {
    call(uri: string, opts?: IRequestParams): Promise<any>;
}

export interface IRequestParams {
    readonly headers?: object;
    readonly query?: object;
    readonly body?: object;
    readonly json?: boolean;
}
