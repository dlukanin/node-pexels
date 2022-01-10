export interface IPexelsResponse {
    page: number;
    perPage: number;
    photos: IPexelsImage[];
    nextPage?: string;
    prevPage?: string;
    totalResults?: number;
    url?: string;
}

export interface IPexelsImage {
    width: number;
    height: number;
    url: string;
    photographer: string;
    src: { [K in EImageFormat]: string };
}

export interface IImageData {
    format: string;
    data: Buffer;
}

export enum EImageFormat {
    // The size of the original image is given with the attributes width and height.
    original = 'original',
    // This image has a maximum width of 940px and a maximum height of 650px.
    // It has the aspect ratio of the original image.
    large = 'large',
    // This image has a maximum width of 1880px and a maximum height of 1300px.
    // It has the aspect ratio of the original image.
    large2x = 'large2x',
    // This image has a height of 350px and a flexible width.
    // It has the aspect ratio of the original image.
    medium = 'medium',
    // This image has a height of 130px and a flexible width.
    // It has the aspect ratio of the original image.
    small = 'small',
    // This image has a width of 800px and a height of 1200px.
    portrait = 'portrait',
    // This image has a width of 1200px and height of 627px.
    landscape = 'landscape',
    // This image has a width of 280px and height of 200px.
    tiny = 'tiny'
}