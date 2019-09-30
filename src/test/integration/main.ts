import {DefaultPexelsClient} from '../../lib/client/default';
import {config} from '../config';
import * as chai from 'chai';
import * as jsonSchema from 'chai-json-schema';
import {fetchSchema, photoSchema, responseSchema} from '../response_schema';

chai.use(jsonSchema);

describe('pexels client', function(): void {
    this.timeout(20000);

    it('should throw error on photo method with invalid api key', function(done: MochaDone): void {
        const client = new DefaultPexelsClient('test');
        client.photo(0)
            .then((result) => {
                done('expected error, instead got ' + result);
            })
            .catch((error) => {
                done();
            });
    });

    it('should throw error on search method with invalid api key', function(done: MochaDone): void {
        const client = new DefaultPexelsClient('test');
        client.search('forest', 10, 2)
            .then((result) => {
                done('expected error, instead got ' + result);
            })
            .catch((error) => {
                done();
            });
    });

    it('should throw error on popular method with invalid api key', function(done: MochaDone): void {
        const client = new DefaultPexelsClient('test');
        client.popular(10, 2)
            .then((result) => {
                done('expected error, instead got ' + result);
            })
            .catch((error) => {
                done();
            });
    });

    it('should throw error on photo method with 404 status code', function(done: MochaDone): void {
        const client = new DefaultPexelsClient(config.apiKey);
        client.photo(0)
            .then((result) => {
                done('expected error, instead got ' + result);
            })
            .catch((error) => {
                chai.expect(error.message).match(/.*404.*/);
                done();
            });
    });

    it('should return valid response on photo method call', function(done: MochaDone): void {
        const client = new DefaultPexelsClient(config.apiKey);
        client.photo(1261427)
            .then((result) => {
                chai.expect(result).to.be.jsonSchema(photoSchema);
                done();
            })
            .catch((error) => {
                done(error);
            });
    });

    it('should return valid response on search method call', function(done: MochaDone): void {
        const client = new DefaultPexelsClient(config.apiKey);
        client.search('people', 5, 1)
            .then((result) => {
                chai.expect(result).to.be.jsonSchema(responseSchema);
                done();
            })
            .catch((error) => {
                done(error);
            });
    });

    it('should return valid response on popular method call', function(done: MochaDone): void {
        const client = new DefaultPexelsClient(config.apiKey);
        client.popular(5, 1)
            .then((result) => {
                chai.expect(result).to.be.jsonSchema(responseSchema);
                done();
            })
            .catch((error) => {
                done(error);
            });
    });

    it('should fetch photo', function(done: MochaDone): void {
        const client = new DefaultPexelsClient(config.apiKey);
        client.popular(5, 1)
            .then((result) => {
                return client.fetch(result.photos[1], 'small');
            })
            .then((result) => {
                chai.expect(result).to.be.jsonSchema(fetchSchema);
                chai.expect(result.data).to.be.instanceOf(Buffer);

                done();
            })
            .catch((error) => {
                done(error);
            });
    });
});
