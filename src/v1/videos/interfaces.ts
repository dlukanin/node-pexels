export interface ISearchVideosParams {
    // Defines the number of results per page.
    // optional, default: 15, max: 80
    readonly perPage?: number;
    // Defines the number of the page.
    // optional, default: 1
    readonly page?: number;
    // The minimum width in pixels of the returned videos.
    // optional, default: ""
    readonly minWidth?: string;
    // The maximum width in pixels of the returned videos.
    // optional, default: ""
    readonly maxWidth?: string;
    // The minimum duration in seconds of the returned videos.
    // optional, default: ""
    readonly minDuration?: string;
    // The maximum duration in seconds of the returned videos.
    // optional, default: ""
    readonly maxDuration?: string;

    /*
    Deprecation warning:
        The video API returns an array of images in the `video_pictures` field.
        The field `video_pictures` is deprecated and will be removed soon.
    */
}

export interface IPopularVideosParams {
    // Defines the number of results per page.
    // optional, default: 15, max: 80
    readonly perPage?: number;
    // Defines the number of the page.
    // optional, default: 1
    readonly page?: number;
    // The minimum width in pixels of the returned videos.
    // optional, default: ""
    readonly minWidth?: string;
    // The maximum width in pixels of the returned videos.
    // optional, default: ""
    readonly maxWidth?: string;
    // The minimum duration in seconds of the returned videos.
    // optional, default: ""
    readonly minDuration?: string;
    // The maximum duration in seconds of the returned videos.
    // optional, default: ""
    readonly maxDuration?: string;

    /*
    Deprecation warning:
        The video API returns an array of images in the `video_pictures` field.
        The field `video_pictures` is deprecated and will be removed soon.
    */
}

interface IVideoFileResponse {
    readonly id: number;
    readonly quality: string;
    readonly file_type: string;
    readonly width: number;
    readonly height: number;
    readonly link: string;
}

interface IVideoPictureResponse {
    readonly id: number;
    readonly picture: string;
    readonly nr: number;
}

interface IVideoUserResponse {
    readonly id: number;
    readonly name: string;
    readonly url: string;
}

export interface IVideoResponse {
    readonly id: number;
    readonly width: number;
    readonly height: number;
    readonly url: string;
    readonly image: string;
    readonly duration: number;
    readonly user: IVideoUserResponse;
    readonly video_files: IVideoFileResponse[];
    readonly video_pictures: IVideoPictureResponse[];
}

export interface ISearchVideosResponse {
    readonly page: number;
    readonly per_page: number;
    readonly total_results: number;
    readonly url: string;
    readonly videos: IVideoResponse[];
}
