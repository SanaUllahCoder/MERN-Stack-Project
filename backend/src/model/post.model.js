const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    images: String,
    caption: String,

});

const Post = mongoose.model('post', postSchema);
module.exports = Post;
