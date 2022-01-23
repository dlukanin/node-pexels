import { GotHttpClient } from './common/http/got-http.client';
import { V1 } from './v1';

export interface IPexelsClient {
    readonly v1: V1;
}

export interface IPexelsClientConstructorParams {
    readonly apiKey: string;
}

class DefaultPexelsClient implements IPexelsClient {
    private readonly _v1: V1;

    constructor(kwArgs: IPexelsClientConstructorParams) {
        this._v1 = new V1(kwArgs.apiKey, new GotHttpClient());
    }

    public get v1(): V1 {
        return this._v1;
    }
}

export { DefaultPexelsClient as Client };
