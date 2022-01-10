const fs = require('node:fs/promises');
const { Client } = require('node-pexels');

function getUnavailablePhoto(client) {
    return client.v1.photos.get(1)
}

function downloadPhoto(client) {
    return client.v1.photos.search('people', { perPage: 1, page: 1 })
        .then(({ photos }) => client.v1.photos.fetch(photos[0], 'medium'))
        .then(({ format, data, source }) => fs.writeFile(`${source}.${format}`, data));
}

function getCuratedPhotos(client) {
    return client.v1.photos.curated();
}

function main() {
    const client = new Client({ apiKey: '<YOUR-API-KEY>' });
    
    downloadPhoto(client).catch(console.error);
    
    getUnavailablePhoto(client).catch(console.error);

    getCuratedPhotos(client).then(console.log)
}

main();
