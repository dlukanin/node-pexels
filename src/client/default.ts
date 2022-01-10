import { IPexelsClient, IPexelsClientConstructorParams } from './interfaces';
import { GotHttpClient } from '../http/got.http.client';
import { V1 } from '../v1/v1';

export class DefaultPexelsClient implements IPexelsClient {
    private readonly _v1: V1;

    constructor(kwArgs: IPexelsClientConstructorParams) {
        this._v1 = new V1(kwArgs.apiKey, new GotHttpClient());
    }

    public get v1(): V1 {
        return this._v1;
    }
}
