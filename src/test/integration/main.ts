import {DefaultPexelsClient} from '../../lib/client/default';
import {config} from '../config';
import * as chai from 'chai';
import * as jsonSchema from 'chai-json-schema';
import {responseSchema} from '../response_schema';

chai.use(jsonSchema);

describe('pexels client', function(): void {
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
});
