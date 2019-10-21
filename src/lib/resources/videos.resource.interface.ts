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
    }
    */
}