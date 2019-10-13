import {DefaultPexelsClient} from '../../lib/client/default';
import {config} from '../config';
import {matchers} from 'jest-json-schema';
import {fetchSchema, photoSchema, responseSchema} from '../response_schema';

expect.extend(matchers);

describe('pexels client integration tests', (): void => {
    jest.setTimeout(20000);

    it('should throw error on photo method with invalid api key', (done: jest.DoneCallback): void => {
        const client = new DefaultPexelsClient('test');
        client.photo(0)
            .then((result) => {
                done('expected error, instead got ' + result);
            })
            .catch((error) => {
                done();
            });
    });

    it('should throw error on search method with invalid api key', (done: jest.DoneCallback): void => {
        const client = new DefaultPexelsClient('test');
        client.search('forest', 10, 2)
            .then((result) => {
                done('expected error, instead got ' + result);
            })
            .catch((error) => {
                done();
            });
    });

    it('should throw error on popular method with invalid api key', (done: jest.DoneCallback): void => {
        const client = new DefaultPexelsClient('test');
        client.popular(10, 2)
            .then((result) => {
                done('expected error, instead got ' + result);
            })
            .catch((error) => {
                done();
            });
    });

    it('should throw error on photo method with 404 status code', (done: jest.DoneCallback): void => {
        const client = new DefaultPexelsClient(config.apiKey);
        client.photo(0)
            .then((result) => {
                done('expected error, instead got ' + result);
            })
            .catch((error) => {
                expect(error.message).toMatch(/.*404.*/);
                done();
            });
    });

    it('should return valid response on photo method call', (done: jest.DoneCallback): void => {
        const client = new DefaultPexelsClient(config.apiKey);
        client.photo(1261427)
            .then((result) => {
                expect(result).toMatchSchema(photoSchema);
                done();
            })
            .catch((error) => {
                done(error);
            });
    });

    it('should return valid response on search method call', (done: jest.DoneCallback): void => {
        const client = new DefaultPexelsClient(config.apiKey);
        client.search('people', 5, 1)
            .then((result) => {
                expect(result).toMatchSchema(responseSchema);
                done();
            })
            .catch((error) => {
                done(error);
            });
    });

    it('should return valid response on popular method call', (done: jest.DoneCallback): void => {
        const client = new DefaultPexelsClient(config.apiKey);
        client.popular(5, 1)
            .then((result) => {
                expect(result).toMatchSchema(responseSchema);
                done();
            })
            .catch((error) => {
                done(error);
            });
    });

    it('should fetch photo', (done: jest.DoneCallback): void => {
        const client = new DefaultPexelsClient(config.apiKey);
        client.popular(5, 1)
            .then((result) => {
                return client.fetch(result.photos[1], 'small');
            })
            .then((result) => {
                expect(result).toMatchSchema(fetchSchema);
                expect(result.data).toBeInstanceOf(Buffer);

                done();
            })
            .catch((error) => {
                done(error);
            });
    });
});
