const fs = require('fs');
const Client = require('../build/index').Client;

const client = new Client('your-api-key');

client.search('people', 5, 1)
    .then((results) => {
        // Do something with results
        console.log(results);
        if (results.photos.length > 0) {
            const photo = results.photos[0];
            const source = 'medium';
            client.fetch(photo, source)
            .then(file => {
                return fs.writeFile(`image-${source}.${file.format}`, file.data);
            });
        }
    })
    .catch((error) => {
        // Something bad happened
        console.error(error);
    });
