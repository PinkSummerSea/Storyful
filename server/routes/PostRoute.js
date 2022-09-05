import express from 'express'
import { createPost, deletePost, getAllPosts, getPost, getTimelinePosts, likePost, updatePost } from '../controllers/PostController.js'
const router = express.Router()

router.get('/', getAllPosts)
router.post('/', createPost)
router.get('/:id', getPost)
router.put('/:id/like', likePost)
router.put('/:id', updatePost)
router.delete('/:id', deletePost)
router.get('/:id/timeline', getTimelinePosts)
export default router