import { V1 } from '../v1/v1';

export interface IPexelsClient {
    readonly v1: V1;
}

export interface IPexelsClientConstructorParams {
    readonly apiKey: string;
}