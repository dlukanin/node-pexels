import { PhotosResource } from '../resources/photos.resource';
import { VideosResource } from '../resources/videos.resource';

export interface IImageData {
    format: string;
    data: Buffer;
}

export interface IPexelsClient {
    photos: PhotosResource;
    videos: VideosResource;
}
