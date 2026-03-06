const {ImageKit} = require('@imagekit/nodejs');

const imagekit = new ImageKit({
    privateKey: process.env.PRIVATE_KEY,
});

async function uploadFile(buffer) {
    console.log(buffer);
    const response = await imagekit.files.upload({
        file: buffer.toString('base64'),
        fileName: "image.jpg",
    });
    return response;
}

    

module.exports = uploadFile;
