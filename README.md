# node-pexels
Node client for https://www.pexels.com API. Typescript definitions included.

[![Build Status](https://travis-ci.org/dlukanin/node-pexels.svg?branch=master)](https://travis-ci.org/dlukanin/node-pexels)
[![Coverage Status](https://coveralls.io/repos/github/dlukanin/node-pexels/badge.svg)](https://coveralls.io/github/dlukanin/node-pexels)

Simple api client for [Pexels](https://www.pexels.com/) powered by [got package](https://www.npmjs.com/package/got).

Check out [Pexels API](https://www.pexels.com/api) for API usage rules and key request.


## Changelog

#### v 0.0.2
Some fixes in schema and ts definitions.

#### v 0.0.1
Hello, world! First version of package.

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

#### popular(perPage?: number, page?: number): Promise\<IPexelsResponse\>
Popular photos request.

#### IPexelsResponse
Response from pexels api.

You can find response schema [here](https://github.com/dlukanin/node-pexels/blob/master/src/test/response_schema.ts)
and response example on the [Pexels API](https://www.pexels.com/api) page.

## FAQ
#### Does client use http or https?
Client use https. You can use http (if you *really* want to) by modifying `endpoint` property of Client function.

#### I want to have Buffer object instead of image url, what should i do?
Current version of module can't do this (hope to implement it in some future releases), you should do it in your own code.