# node-pexels
Node client for https://www.pexels.com API

[![Build Status](https://travis-ci.org/dlukanin/node-pexels.svg?branch=master)](https://travis-ci.org/dlukanin/node-pexels)

Simple api client for https://www.pexels.com/ powered by got (https://www.npmjs.com/package/got)

Check out https://www.pexels.com/api for API usage rules and key request.

## Usage

```
const Client = require('node-pexels').Client;

const client = new Client('your-api-key');

client.search('people', 5, 1)
    .then((results) => {
        // Do something with results
        console.log(results);
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

#### search(query: string, perPage?: number, page?: number): Promise\<IPexelsResponse\>
Popular photos request.

#### IPexelsResponse
Response from pexels api

You can find response schema here: https://github.com/dlukanin/node-pexels/blob/master/src/test/response_schema.ts
and response example on the Pexels API page.