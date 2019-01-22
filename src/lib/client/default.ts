import {IPexelsClient, IPexelsImage, IPexelsResponse, TPexelsImageSource, IImageData} from './interfaces';
import * as got from 'got';

export class DefaultPexelsClient implements IPexelsClient {
    public static BASE_ENDPOINT: string = 'api.pexels.com/v1/';
    public static PHOTO_RESOURCE: string = 'photos';
    public static SEARCH_RESOURCE: string = 'search';
    public static POPULAR_RESOURCE: string = 'popular';
    protected endpoint: string = '';

    constructor(protected apiKey: string, https: boolean = true) {
        this.useHttps(https);
    }

    public useHttps(v: boolean = true): void {
        this.endpoint = `${v ? 'https' : 'http'}://${DefaultPexelsClient.BASE_ENDPOINT}`;
    }

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

    public fetch(photo: IPexelsImage, src: TPexelsImageSource): Promise<IImageData> {
        const url = photo.src[src];

        const qs: any = {
            w: '0',
            h: '0'
        };
        url.replace(/([^?=&]+)(=([^&]*))?/g, (r, k, q, v) => qs[k] = v);

        return this.makeAbsoluteRequest<string>(url, {}, false)
            .then((data: string) => ({
                width: parseInt(qs.w, 10),
                height: parseInt(qs.h, 10),
                format: url.replace(/.*\.(\w*)\?.*/, '$1'),
                data
            }));
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

    private makeAbsoluteRequest<TResponse>(
        url: string, queryStringObject: {[key: string]: any} = {}, json: boolean = true
    ): Promise<TResponse> {

        return got.get(url,
            {
                ...(json ? {json: true} : {}),
                ...(Object.keys(queryStringObject).length ? {query: queryStringObject} : {}),
                headers: {Authorization: this.apiKey}
            })
            .then((response: any) => response.body)
            .catch((error: any) => {
                throw new Error('Pexels api request failed: ' + error.message);
            });
    }

    private makeRequest<TResponse>(
        resource: string,
        queryStringObject: {[key: string]: any} = {},
        json: boolean = true
    ): Promise<TResponse> {

        return this.makeAbsoluteRequest(this.endpoint + resource, queryStringObject, json);
    }
}
