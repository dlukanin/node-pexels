import {DefaultPexelsClient} from '../../lib/client/default';
import {config} from '../config';
import * as chai from 'chai';
import * as jsonSchema from 'chai-json-schema';

chai.use(jsonSchema);

const srcSchema = {
    type: 'object',
    required: [
        'original',
        'large',
        'medium',
        'small',
        'portrait',
        'landscape',
        'tiny'
    ],
    properties: {
        original: {
            type: 'string'
        },
        large: {
            type: 'string'
        },
        medium: {
            type: 'string'
        },
        small: {
            type: 'string'
        },
        portrait: {
            type: 'string'
        },
        landscape: {
            type: 'string'
        },
        tiny: {
            type: 'string'
        }
    }
};

const photosSchema = {
    type: 'array',
    minItems: 1,
    uniqueItems: true,
    items: {
        type: 'object',
        required: [
            'width',
            'height',
            'url',
            'photographer',
            'src'
        ],
        properties: {
            width: {
                type: 'number'
            },
            height: {
                type: 'number'
            },
            url: {
                type: 'string'
            },
            photographer: {
                type: 'string'
            },
            src: srcSchema
        }
    }
};

const pexelsResponseSchema = {
    type: 'object',
    required: [
        'page',
        'per_page',
        'next_page',
        'photos'
    ],
    properties: {
        page: {
            type: 'number',
            minimum: 1
        },
        per_page: {
            type: 'number',
            minimum: 1
        },
        total_results: {
            type: 'number',
            minimum: 0
        },
        url: {
            type: 'string'
        },
        next_page: {
            type: 'string'
        },
        photos: photosSchema
    }
};

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
                (chai as any).expect(result).to.be.jsonSchema(pexelsResponseSchema);
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
                (chai as any).expect(result).to.be.jsonSchema(pexelsResponseSchema);
                done();
            })
            .catch((error) => {
                done(error);
            });
    });
});