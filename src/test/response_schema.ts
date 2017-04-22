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

export const responseSchema = {
    type: 'object',
    required: [
        'page',
        'per_page',
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
        next_page: {
            type: 'string'
        },
        prev_page: {
            type: 'string'
        },
        photos: photosSchema,
        total_results: {
            type: 'number',
            minimum: 0
        },
        url: {
            type: 'string'
        }
    }
};