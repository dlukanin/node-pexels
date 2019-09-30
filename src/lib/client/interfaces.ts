export type TPexelsImageSource = 'original' | 'large' | 'medium' | 'small' | 'portrait' | 'landscape' | 'tiny';

export interface IPexelsImage {
    width: number;
    height: number;
    url: string;
    photographer: string;
    src: { [K in TPexelsImageSource]: string };
}

export interface IPexelsResponse {
    page: number;
    per_page: number;
    photos: IPexelsImage[];
    next_page?: string;
    prev_page?: string;
    total_results?: number;
    url?: string;
}

export interface IImageData {
    format: string;
    data: Buffer;
}

export interface IPexelsClient {
    photo(id: number): Promise<IPexelsImage>;
    search(query: string, perPage?: number, page?: number): Promise<IPexelsResponse>;
    popular(perPage?: number, page?: number): Promise<IPexelsResponse>;
    fetch(photo: IPexelsImage, src: TPexelsImageSource): Promise<IImageData>;
}
