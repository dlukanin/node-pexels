const Client = require('../build/index').Client;

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