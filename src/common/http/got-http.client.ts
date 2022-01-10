import { IHttpClient, IRequestParams } from './interfaces';
import * as Got from 'got';

export class GotHttpClient implements IHttpClient {

    public async call<ResponseType>(url: string, params: IRequestParams): Promise<ResponseType> {
        const reqOpts: any = {};

        if (params.json) {
            reqOpts.json = true;
        } else {
            reqOpts.encoding = null;
        }

        if (params.headers) {
            reqOpts.headers = params.headers;
        }

        if (params.query) {
            reqOpts.query = params.query;
        }

        try {
            const { body } = await Got.get(url, reqOpts);

            return body;
        } catch (err) {
            throw new Error('Pexels api request failed: ' + err.message);
        }
    }
}