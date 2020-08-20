const Clarifai = require('clarifai');
const config = require('./config');
const testsuite = require('./testsuite');

const app = new Clarifai.App({ apiKey: config.API_KEY });

for (let i = 0; i < testsuite.urls.length; i++) {
    setTimeout(() => predictUrl(testsuite.urls[i]), i * 1000);
}

for (let i = 0; i < testsuite.base64.length; i++) {
    setTimeout(() => predictBase64(testsuite.base64[i]), i * 1000);
}

// url: string
function predictUrl(url) {
    app.models.initModel({ id: Clarifai.GENERAL_MODEL, version: 'aa7f35c01e0642fda5cf400f543e7c40' })
        .then((generalModel) => generalModel.predict(url))
        .then((response) => {
            var concepts = response['outputs'][0]['data']['concepts']
            let values = [];
            concepts.forEach((c) => values.push(c.name));

            console.log({ img: url, concepts: values });
        })
        .catch((error) => console.error(error.data));
};

// img: { name: string, data: string }
function predictBase64(img) {
    app.models.predict(Clarifai.GENERAL_MODEL, { base64: img.data })
        .then((response) => {
            var concepts = response['outputs'][0]['data']['concepts']
            let values = [];
            concepts.forEach((c) => values.push(c.name));

            console.log({ img: img.name, concepts: values });
        })
        .catch((error) => console.error(error.data));
};