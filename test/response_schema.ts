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

export const photoSchema = {
    type: 'object',
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

/*
    readonly id: number;
    readonly width: number;
    readonly height: number;
    readonly url: string;
    readonly image: string;
    readonly duration: number;
*/

export const videoV1Schema = {
    type: 'object',
    items: {
        type: 'object',
        required: [
            'id',
            'width',
            'height',
            'url',
            'image',
            'duration'
        ],
        properties: {
            id: {
                type: 'string'
            },
            width: {
                type: 'number'
            },
            height: {
                type: 'number'
            },
            url: {
                type: 'string'
            },
            image: {
                type: 'string'
            },
            duration: {
                type: 'number'
            }
        }
    }
};

const photosSchema = {
    ...photoSchema,
    type: 'array',
    minItems: 1
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

export const fetchSchema = {
    type: 'object',
    required: [
        'format',
        'data'
    ],
    properties: {
        format: {
            type: 'string'
        },
        data: {
            type: 'object'
        }
    }
};
