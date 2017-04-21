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
    total_results?: number;
    url?: string;
    next_page: string;
    photos: IPexelsImage[];
}

export interface IPexelsClient {
    search(query: string, perPage?: number, page?: number): Promise<IPexelsResponse>;
    popular(perPage?: number, page?: number): Promise<IPexelsResponse>;
}