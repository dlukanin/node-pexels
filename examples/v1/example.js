const Fs = require('fs');
const { Client } = require('../../build/index');

function main() {
    const client = new Client({
        apiKey: '<YOUR_API_KEY>'
    });
    
    client.photos.search('people', { perPage: 5, page: 1 })
        .then(({ photos }) => {
            console.log(photos);
    
            if (photos.length > 0) {
                const [photo] = photos;
                const source = 'medium';
    
                client.photos.fetch(photo, source)
                    .then(({ format, data }) => {
                        return Fs.writeFile(`image-${source}.${format}`, data);
                    });
            }
        })
        .catch((err) => {
            console.error(err);
        });
    
    client.photos.get(1)
        .then((photo) => {
            console.log(photo);
        })
        .catch((err) => {
            console.log(err);
        });

    client.photos.curated()
        .then(({ photos }) => {
            console.log(photos);
        })
        .catch((err) => {
            console.log(err);
        });
}

main();
