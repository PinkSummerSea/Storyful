import mongoose from "mongoose";

const PostSchema = mongoose.Schema(
    {
        userId: {type: String, required: true},
        username: String,
        title: String,
        desc: String,
        likes: [],
        image: String,
        lng: {type: Number, required: true},
        lat: {type: Number, required: true},
        location: String
    }, {timestamps: true}
)

const PostModel = mongoose.model('Posts', PostSchema)

export default PostModel