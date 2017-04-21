import {IPexelsClient, IPexelsResponse} from './interfaces';
import * as got from 'got';

export class DefaultPexelsClient implements IPexelsClient {
    public static endpoint: string = 'https://api.pexels.com/v1/';
    public static SEARCH_RESOURCE: string = 'search';
    public static POPULAR_RESOURCE: string = 'popular';

    constructor(protected apiKey: string) {}

    public search(query: string, perPage?: number, page?: number): Promise<IPexelsResponse> {
        return this.makeRequest(DefaultPexelsClient.SEARCH_RESOURCE, {
            query,
            per_page: perPage,
            page
        });
    }

    public popular(perPage?: number, page?: number): Promise<IPexelsResponse> {
        return this.makeRequest(DefaultPexelsClient.POPULAR_RESOURCE, {
            per_page: perPage,
            page
        });
    }

    private makeRequest(resource: string, queryStringObject: {[key: string]: any}): Promise<any> {
        return got(
            DefaultPexelsClient.endpoint + resource,
                {
                    json: true,
                    query: queryStringObject,
                    headers: {Authorization: ' ' + this.apiKey}
                }
            )
            .then((response: any) => response.body)
            .catch((error: any) => {
                throw new Error('Pexels api request failed: ' + error.message);
            });
    }
}