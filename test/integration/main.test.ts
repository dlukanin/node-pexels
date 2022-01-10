import { matchers } from 'jest-json-schema';
import { Client, IPexelsClient } from '../../src';
import { config } from '../config';
import { fetchSchema, photoSchema, responseSchema } from '../response_schema';

expect.extend(matchers);

describe('pexels client integration tests', (): void => {
    let client: IPexelsClient;

    jest.setTimeout(20000);

    beforeAll(() => {
        client = new Client({ apiKey: config.apiKey });
    });

    afterAll(() => {
        client = undefined;
    });

    it('should throw error on photo method with invalid api key', async (done: jest.DoneCallback): Promise<void> => {
        const client = new Client({ apiKey: 'test' });

        try {
            const photo = await client.v1.photos.get(0);

            done('expected error, instead got ',  photo);
        } catch (err) {
            done();
        }
    });

    it('should throw error on search method with invalid api key', async (done: jest.DoneCallback): Promise<void> => {
        const client = new Client({ apiKey: 'test' });

        try {
            const photos = await client.v1.photos.search('forest', { page: 10, perPage: 2 });

            done('expected error, instead got ', photos);
        } catch (err) {
            done();
        }
    });

    it('should throw error on popular method with invalid api key', async (done: jest.DoneCallback): Promise<void> => {
        const client = new Client({ apiKey: 'test' });

        try {
            const photos = await client.v1.photos.curated(10, 2);

            done('expected error, instead got ', photos);
        } catch (err) {
            done();
        }
    });

    it('should throw error on photo method with 404 status code', async (done: jest.DoneCallback): Promise<void> => {
        try {
            const photo = await client.v1.photos.get(0);

            done('expected error, instead got ', photo);
        } catch (err) {
            expect(err.message).toMatch(/.*404.*/);
            done();
        }
    });

    it('should return valid response on photo method call', async (done: jest.DoneCallback): Promise<void> => {
        try {
            const photo = await client.v1.photos.get(1261427);

            expect(photo).toMatchSchema(photoSchema);
            done();
        } catch (err) {
            done(err);
        }
    });

    it('should return valid response on search method call', async (done: jest.DoneCallback): Promise<void> => {
        try {
            const photos = await client.v1.photos.search('people', { perPage: 5, page: 1 });

            expect(photos).toMatchSchema(responseSchema);
            done();
        } catch (err) {
            done(err);
        }
    });

    it('should return valid response on popular method call', async (done: jest.DoneCallback): Promise<void> => {
        try {
            const photos = await client.v1.photos.curated(5, 1);

            expect(photos).toMatchSchema(responseSchema);
            done();
        } catch (err) {
            done(err);
        }
    });

    it('should fetch photo', async (done: jest.DoneCallback): Promise<void> => {
        try {
            const photos = await client.v1.photos.curated();
            const photo = await client.v1.photos.fetch(photos.photos[1], 'small');

            expect(photo).toMatchSchema(fetchSchema);
            expect(photo.data).toBeInstanceOf(Buffer);

            done();
        } catch (err) {
            done(err);
        }
    });
});
