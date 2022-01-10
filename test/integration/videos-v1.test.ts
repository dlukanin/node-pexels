import { matchers } from 'jest-json-schema';
import { Client, IPexelsClient } from '../../src';
import { config } from '../config';
import { videoV1Schema } from '../response_schema';

expect.extend(matchers);

describe('Videos v1 tests', (): void => {
    jest.setTimeout(10000);

    let client: IPexelsClient;

    beforeAll(() => {
        client = new Client({ apiKey: config.apiKey });
    });

    afterAll(() => {
        client = undefined;
    });

    it('should throw 401 error with invalid api key', async (done) => {
        const client = new Client({ apiKey: 'test' });

        try {
            const photo = await client.v1.photos.get(0);

            done('expected error, instead got ',  photo);
        } catch (err) {
            done();
        }
    });

    it('should throw 404 error if video not found', async (done) => {
        try {
            const video = await client.v1.videos.get(0);

            done('expected error, instead got ', video);
        } catch (err) {
            expect(err.message).toMatch(/.*404.*/);
            done();
        }
    });

    it('should return valid response on single video', async (done) => {
        try {
            const video = await client.v1.videos.get(2499611);

            expect(video).toMatchSchema(videoV1Schema);
            done();
        } catch (err) {
            done(err);
        }
    });

});
