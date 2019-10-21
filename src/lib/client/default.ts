import { IPexelsClient } from './interfaces';
import { GotHttpClient } from '../http/got.http.client';
import { PhotosResource } from '../resources/photos.resource';
import { VideosResource } from '../resources/videos.resource';
import { EImageFormat } from '../resources/photos.resource.interface';

export interface IPexelsClientConstructorParams {
    readonly apiKey: string;
    readonly apiVersion?: string;
}

export class DefaultPexelsClient implements IPexelsClient {

    private readonly baseUrl: string = 'https://api.pexels.com';
    private readonly apiKey: string;
    private readonly apiVersion: string;

    private readonly photosResource: PhotosResource;
    private readonly videosResource: VideosResource;

    constructor(kwargs: IPexelsClientConstructorParams) {
        this.apiKey = kwargs.apiKey;
        this.apiVersion = kwargs.apiVersion || 'v1';

        const httpClient = new GotHttpClient();

        this.photosResource = new PhotosResource(
            this.apiKey,
            `${this.baseUrl}/${this.apiVersion}`,
            httpClient
        );

        this.videosResource = new VideosResource(
            this.apiKey,
            this.baseUrl,
            httpClient
        );
    }

    public get photos(): PhotosResource {
        return this.photosResource;
    }

    public get videos(): VideosResource {
        return this.videosResource;
    }
}
