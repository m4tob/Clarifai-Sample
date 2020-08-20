const path = require('path');
const fs = require('fs');

module.exports = {
    urls: [
        'https://samples.clarifai.com/metro-north.jpg'
    ],
    base64: loadImages()
};

function loadImages() {
    const directoryPath = path.join(__dirname, '../testsuite');
    let base64 = [];

    let files = fs.readdirSync(directoryPath);
    files.forEach((file) => {
        let img_file = path.join(directoryPath, file);
        let data = fs.readFileSync(img_file, { encoding: 'base64' });
        base64.push({ name: file, data: data });
    });

    return base64;
}