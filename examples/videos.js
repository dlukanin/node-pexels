const { Client } = require('node-pexels');

function main() {
    const client = new Client({ apiKey: process.env.YOUR_API_KEY });

    client.v1.videos.popular()
        .then(({ videos }) => client.v1.videos.get(videos[0].id))
        .then(console.log)
        .catch(console.error);
}

main();