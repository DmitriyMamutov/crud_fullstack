import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    nickname: String,
    real_name: String,
    origin_description: String,
    superpowers: [String],
    catch_phrase: String,
    selectedFile: String,
})

var PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage;