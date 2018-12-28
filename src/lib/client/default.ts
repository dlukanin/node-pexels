import {IPexelsClient, IPexelsImage, IPexelsResponse} from './interfaces';
import * as got from 'got';

export class DefaultPexelsClient implements IPexelsClient {
    public static endpoint: string = 'https://api.pexels.com/v1/';
    public static PHOTO_RESOURCE: string = 'photos';
    public static SEARCH_RESOURCE: string = 'search';
    public static POPULAR_RESOURCE: string = 'popular';

    constructor(protected apiKey: string) {}

    public photo(id: number): Promise<IPexelsImage> {
        try {
            this.validatePhotoMethodParams(id);
        } catch (err) {
            return Promise.reject(err);
        }

        return this.makeRequest(`${DefaultPexelsClient.PHOTO_RESOURCE}/${id}`, {});
    }

    public search(query: string, perPage?: number, page?: number): Promise<IPexelsResponse> {
        try {
            this.validateSearchMethodParams(query, perPage, page);
        } catch (err) {
            return Promise.reject(err);
        }

        return this.makeRequest(DefaultPexelsClient.SEARCH_RESOURCE, {
            query,
            per_page: perPage,
            page
        });
    }

    public popular(perPage?: number, page?: number): Promise<IPexelsResponse> {
        try {
            this.validatePageAndPerPageArguments(perPage, page);
        } catch (err) {
            return Promise.reject(err);
        }

        return this.makeRequest(DefaultPexelsClient.POPULAR_RESOURCE, {
            per_page: perPage,
            page
        });
    }

    private validatePhotoMethodParams(id: any): void | never {
        if (typeof id !== 'number') {
            throw new Error('Pexels client: invalid id param: ' + id);
        }
    }

    private validatePageAndPerPageArguments(perPage?: any, page?: any): void | never {
        const errorFields: string[] = [];

        if (typeof perPage !== 'undefined' && typeof perPage !== 'number') {
            errorFields.push(perPage);
        }
        if (typeof page !== 'undefined' && typeof page !== 'number') {
            errorFields.push(page);
        }

        if (errorFields.length) {
            throw new Error('Pexels client: invalid fields passed to method ' + errorFields);
        }
    }

    private validateSearchMethodParams(query: any, perPage?: any, page?: any): void | never {
        this.validatePageAndPerPageArguments(perPage, page);

        if (typeof query !== 'string') {
            throw new Error('Pexels client: invalid query param: ' + query);
        }
    }

    private makeRequest<TResponse>(resource: string, queryStringObject: {[key: string]: any}): Promise<TResponse> {
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
