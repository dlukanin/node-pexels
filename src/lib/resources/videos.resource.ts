import { IHttpClient } from '../http/http.client.interface';
import { ISearchVideosParams, IPopularVideosParams } from './videos.resource.interface';

export class VideosResource {

    private readonly defHeaders: object = {
        Authorization: this.apiKey
    };

    constructor(
        private readonly apiKey: string,
        private readonly baseUrl: string,
        private readonly httpClient: IHttpClient
    ) {}

    public async search(query: string, kwargs: ISearchVideosParams = {}): Promise<any[]> {
        const { perPage, page, maxDuration, minDuration, maxWidth, minWidth } = kwargs;

        const queryParams: {
            query: string,
            per_page?: number,
            page?: number,
            max_duration?: string,
            min_duration?: string,
            min_width?: string,
            max_width?: string
        } = { query };

        if (perPage) {
            queryParams.per_page = perPage;
        }

        if (page) {
            queryParams.page = page;
        }

        if (maxDuration) {
            queryParams.max_duration = maxDuration;
        }

        if (minDuration) {
            queryParams.min_duration = minDuration;
        }

        if (minWidth) {
            queryParams.min_width = minWidth;
        }

        if (maxWidth) {
            queryParams.max_width = maxWidth;
        }

        return this.httpClient.call(
            `${this.baseUrl}/videos/search`,
            { query: queryParams, headers: this.defHeaders, json: true }
        );
    }

    public async popular(kwargs: IPopularVideosParams = {}): Promise<any> {
        const { perPage, page, maxDuration, minDuration, maxWidth, minWidth } = kwargs;

        const queryParams: {
            per_page?: number,
            page?: number,
            max_duration?: string,
            min_duration?: string,
            min_width?: string,
            max_width?: string
        } = {};

        if (perPage) {
            queryParams.per_page = perPage;
        }

        if (page) {
            queryParams.page = page;
        }

        if (maxDuration) {
            queryParams.max_duration = maxDuration;
        }

        if (minDuration) {
            queryParams.min_duration = minDuration;
        }

        if (minWidth) {
            queryParams.min_width = minWidth;
        }

        if (maxWidth) {
            queryParams.max_width = maxWidth;
        }

        return this.httpClient.call(
            `${this.baseUrl}/videos/popular`,
            { headers: this.defHeaders, query: queryParams, json: true }
        );
    }

    public async get(videoId: number): Promise<any> {
        return this.httpClient.call(
            `${this.baseUrl}/videos/videos/${videoId}`,
            { headers: this.defHeaders, json: true }
        );
    }
}