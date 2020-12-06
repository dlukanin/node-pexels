# node-pexels
Node unofiicial client for https://www.pexels.com API. Typescript definitions included.

[![Build Status](https://travis-ci.org/dlukanin/node-pexels.svg?branch=master)](https://travis-ci.org/dlukanin/node-pexels)
[![Coverage Status](https://coveralls.io/repos/github/dlukanin/node-pexels/badge.svg)](https://coveralls.io/github/dlukanin/node-pexels)

Simple api client for [Pexels](https://www.pexels.com/) powered by [got package](https://www.npmjs.com/package/got).

Check out [Pexels API](https://www.pexels.com/api) for API usage rules and key request.


## Requirements
Node 8+


## Changelog

#### v 1.0.0
Security updates. Removed es5 support in lib.

#### v 0.0.5
Fixes, deps update, etc.

#### v 0.0.4
Added retrieving single photo method ([#1](https://github.com/dlukanin/node-pexels/pull/1))

#### v 0.0.3
Some fixes in inner logic and interfaces. Added methods args validation. Some fixes in doc.

#### v 0.0.2
Some fixes in schema and ts definitions.

#### v 0.0.1
Hello, world! First version of package.

## Usage

```
const Client = require('node-pexels').Client;
const fs = require('fs');

const client = new Client('your-api-key');

client.search('people', 5, 1)
    .then((results) => {
        // Do something with results
        console.log(results);
        if (results.photos.length > 0) {
            const photo = results.photos[0];
            const source = 'medium';

            return client.fetch(photo, source)
        } else {
            throw new Error('no results found');
        }
    })
    .then((file) => {
        return new Promise(
            (reject, resolve) => {
                fs.writeFile(
                    `./img.${file.format}`,
                    file.data,
                    (err) => {
                        if (err) {
                            reject(err);
                        }
                        resolve();
                    }
                );
            }
        );
    })
    .catch((error) => {
        // Something bad happened
        console.error(error);
    });
```

## Docs
### Client
#### constructor(apiKey: string)
Creates new API client instance.

#### search(query: string, perPage?: number, page?: number): Promise\<IPexelsResponse\>
Search request by provided query.

#### photo(id: number): Promise\<IPexelsImage\>;
Search photo by provided id.

#### popular(perPage?: number, page?: number): Promise\<IPexelsResponse\>
Popular photos request.

### fetch(photo: IPexelsImage, src: TPexelsImageSource): Promise\<IImageData\>
Fetch a photo file from the selected source.

#### IPexelsResponse, IPexelsImage
Responses from pexels api.

#### IImageData
Object containing an image buffer, and format.

You can find schemas [here](https://github.com/dlukanin/node-pexels/blob/master/src/test/response_schema.ts)
and response example on the [Pexels API](https://www.pexels.com/api) page.

## FAQ
#### Does client use http or https?
Client use https. You can use http (if you *really* want to) by modifying `endpoint` property of Client function.
