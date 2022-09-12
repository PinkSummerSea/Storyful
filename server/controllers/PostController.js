import PostModel from "../models/postModel.js";
import mongoose from "mongoose";
import UserModel from "../models/userModel.js";


export const createPost = async(req, res) => {
    console.log(req.body)
    const newPost = new PostModel(req.body)

    try {
        await newPost.save()
        res.status(200).json(newPost)
    } catch (error) {
        res.status(500).json(error)
    }
}

export const getPost = async(req, res) => {
    const id = req.params.id

    try {
        const post = await PostModel.findById(id)
        res.status(200).json(post)
    } catch (error) {
        res.status(500).json(error)
    }

}

export const getAllPosts = async(req, res) => {
    const {q} = req.query
    try {
        //console.log(posts.length)
        if (q) {
            const filteredPosts = await PostModel.find({$or: [{"title": {'$regex' : q, '$options' : 'i'}}, {"desc": {'$regex' : q, '$options' : 'i'}}, {"location": {'$regex' : q, '$options' : 'i'}}]}).sort({_id: -1}) 
            res.status(200).json(filteredPosts)
        } else {
            const posts = await PostModel.find().sort({_id: -1})
            res.status(200).json(posts)
        }
        
    } catch (error) {
        res.status(500).json(error)
    }
    
}

export const updatePost = async (req, res) => {
  const postId = req.params.id;
  const { userId } = req.body;

  try {
    const post = await PostModel.findById(postId);
    if (post.userId === userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json("Post Updated");
    } else {
      res.status(403).json("Access denied");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

export const deletePost = async(req, res) => {
    const postId = req.params.id
    const userId = req.params.userId
    console.log('postId', postId)
    

    try {
        const post = await PostModel.findById(postId)
        if(post.userId === userId) {
            await post.deleteOne()
            res.status(200).json(postId)
        } else {
            res.status(403).json('Access denied')
        }
    } catch (error) {
        res.status(500).json(error);
    }
}

export const likePost = async (req, res) => {
    const postId = req.params.id
    const {userId} = req.body

    try {
        let post = await PostModel.findById(postId)

        if(post.likes.includes(userId)) {
            //await post.updateOne({$pull: {likes: userId}})
            post = await PostModel.findOneAndUpdate({_id: postId}, {$pull: {likes: userId}}, {new: true})
            res.status(200).json({post: post, message: "post unliked"})
        } else {
            //await post.updateOne({$push: {likes: userId}})
            post = await PostModel.findOneAndUpdate({_id: postId}, {$push: {likes: userId}}, {new: true})
            res.status(200).json({post: post, message: "post liked"})
        }
    } catch (error) {
        res.status(500).json(error);
    }
}

export const getTimelinePosts =  async(req, res) => {
    const userId = req.params.id
    
    try {
        const currentUserPosts = await PostModel.find({userId: userId})
        const followingPosts = await UserModel.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(userId),
                }
            },
            {
                $lookup: {
                    from: 'posts',
                    localField: 'following',
                    foreignField: 'userId',
                    as: "followingPosts"
                }
            },
            {
                $project: {
                    followingPosts: 1,
                    _id: 0
                }
            }
        ]);

        res
            .status(200)
            .json(currentUserPosts.concat(...followingPosts[0].followingPosts).sort((a, b) => {
                return b.createdAt - a.createdAt}))
    } catch (error) {
        res.status(500).json(error);
    }
}