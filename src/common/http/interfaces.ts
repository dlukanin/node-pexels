export interface IHttpClient {
    call<R = any>(uri: string, opts?: Partial<IRequestParams>): Promise<R>;
}

export interface IRequestParams {
    readonly headers: Record<string, string | number >;
    readonly query: Record<string, string | number>;
    readonly body: Record<string , string | number>;
    readonly json: boolean;
}
