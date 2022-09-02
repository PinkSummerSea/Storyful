import express from 'express'
import { deleteUser, followUser, getUser, unfollowUser, updateUser, getAllUsers } from '../controllers/UserController.js'
import authMiddleware from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/', getAllUsers)
router.get('/:id', getUser)
router.put('/:id', authMiddleware, updateUser)
router.delete('/:id',authMiddleware, deleteUser)
router.put('/:id/follow',authMiddleware, followUser)
router.put('/:id/unfollow',authMiddleware, unfollowUser)

export default router