import { IHttpClient } from '../../http/http.client.interface';
import {
    ISearchVideosParams,
    IPopularVideosParams,
    IVideoResponse,
    ISearchVideosResponse
} from './videos.resource.interface';

export class VideosV1Resource {

    private readonly _defHeaders: Record<string, string>;
    private readonly _baseUrl: string = 'https://api.pexels.com/videos';

    constructor(
        apiKey: string,
        private readonly httpClient: IHttpClient
    ) {
        this._defHeaders = {
            Authorization: apiKey
        };
    }

    public async search(query: string, kwArgs: ISearchVideosParams = {}): Promise<ISearchVideosResponse> {
        const { perPage, page, maxDuration, minDuration, maxWidth, minWidth } = kwArgs;

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
            `${this._baseUrl}/search`,
            { query: queryParams, headers: this._defHeaders, json: true }
        );
    }

    public async popular(kwArgs: IPopularVideosParams = {}): Promise<ISearchVideosResponse> {
        const { perPage, page, maxDuration, minDuration, maxWidth, minWidth } = kwArgs;

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
            `${this._baseUrl}/popular`,
            { headers: this._defHeaders, query: queryParams, json: true }
        );
    }

    public async get(videoId: number): Promise<IVideoResponse> {
        return this.httpClient.call(
            `${this._baseUrl}/videos/${videoId}`,
            { headers: this._defHeaders, json: true }
        );
    }
}