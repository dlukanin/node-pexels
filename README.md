# node-pexels
Node unofficial client for https://www.pexels.com API. Typescript definitions included.

[![Build Status](https://travis-ci.org/dlukanin/node-pexels.svg?branch=master)](https://travis-ci.org/dlukanin/node-pexels)
[![Coverage Status](https://coveralls.io/repos/github/dlukanin/node-pexels/badge.svg)](https://coveralls.io/github/dlukanin/node-pexels)

Simple api client for [Pexels](https://www.pexels.com/) powered by [got package](https://www.npmjs.com/package/got).

Check out [Pexels API](https://www.pexels.com/api) for API usage rules and key request.


## Requirements
Node 10+


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
async function main() {
    const client = new Client({ apiKey: '<YOUR-API-KEY>' });
    await client.v1.photos.curated();
}
main();
```

For more see `examples/`

You can find schemas [here](https://github.com/dlukanin/node-pexels/blob/master/test/response_schema.ts)
and response example on the [Pexels API](https://www.pexels.com/api) page.

## FAQ
#### Does client use http or https?
Client use https. You can use http (if you *really* want to) by modifying `endpoint` property of Client function.
