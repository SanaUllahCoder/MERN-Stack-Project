const express = require('express');
const multer = require('multer');
const connectDB = require('./db/db');
const result = require('./service/storage.service');
const postModel = require('./model/post.model');
const cors = require('cors');

connectDB();

const app = express();
app.use(cors());
app.use(express.json());

const upload = multer({ storage: multer.memoryStorage() })

app.post('/posts', upload.single("image"), async (req, res) => {

    const response = await result(req.file.buffer);
    console.log(response);

    const post = await postModel.create({
        images: response.url,
        caption: req.body.caption,
    })
    return res.status(201).json({
        msg: "Post created successfully",
        post,
    })   
});

app.get('/posts', async (req, res) => {
    const posts = await postModel.find();
    return res.status(200).json({     
        msg: "Posts fetched successfully",
        posts,
    })
});

module.exports = app;
