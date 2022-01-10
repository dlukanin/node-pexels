import { IHttpClient } from '../http/http.client.interface';
import { PhotosV1Resource } from './photos/photos.resource';
import { VideosV1Resource } from './videos/videos.resource';

export class V1 implements V1 {
    private readonly _photosResource: PhotosV1Resource;
    private readonly _videosResource: VideosV1Resource;

    constructor(apiKey: string, httpClient: IHttpClient) {
        this._photosResource = new PhotosV1Resource(apiKey, httpClient);
        this._videosResource = new VideosV1Resource(apiKey, httpClient);
    }

    public get photos(): PhotosV1Resource {
        return this._photosResource;
    }

    public get videos(): VideosV1Resource {
        return this._videosResource;
    }

}