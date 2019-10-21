import { IHttpClient } from '../http/http.client.interface';
import { IPexelsImage, IPexelsResponse, IImageData } from './photos.resource.interface';
import * as Path from 'path';

export class PhotosResource {

    private readonly defHeaders: object = {
        Authorization: this.apiKey
    };

    constructor(
        private readonly apiKey: string,
        private readonly baseUrl: string,
        private readonly httpClient: IHttpClient
    ) {}

    public async get(photoId: number): Promise<IPexelsImage> {
        this.validatePhotoMethodParams(photoId);

        return this.httpClient.call(
            `${this.baseUrl}/photos/${photoId}`,
            { headers: this.defHeaders, json: true }
        );
    }

    public async search(query: string, opts: { perPage?: number, page?: number } = {}): Promise<IPexelsResponse> {
        const { perPage, page } = opts;

        this.validateSearchMethodParams(query, perPage, page);

        const queryParams: {
            query: string,
            page?: number,
            per_page?: number
        } = { query };

        if (page) {
            queryParams.page = page;
        }

        if (perPage) {
            queryParams.per_page = perPage;
        }

        return this.httpClient.call(
            `${this.baseUrl}/search`,
            { query: queryParams, headers: this.defHeaders, json: true }
        );
    }

    public async curated(perPage?: number, page?: number): Promise<IPexelsResponse> {
        this.validatePageAndPerPageArguments(perPage, page);

        const query: { per_page?: number, page?: number } = {};

        if (perPage) {
            query.per_page = perPage;
        }

        if (page) {
            query.page = page;
        }

        return this.httpClient.call(
            `${this.baseUrl}/curated`,
            { query, headers: this.defHeaders, json: true }
        );
    }

    public async fetch(photo: IPexelsImage, src: string): Promise<IImageData> {
        const url = photo.src[src];

        const data = await this.httpClient.call(
            url,
            { headers: this.defHeaders }
        );

        const format = Path.extname(url.split('?')[0].split('#')[0]).replace('.', '');

        return { format, data };
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
}