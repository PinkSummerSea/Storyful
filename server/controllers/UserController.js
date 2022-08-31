import UserModel from "../models/userModel.js";
import bcrypt from 'bcrypt'

export const getUser = async(req, res) => {
    const id = req.params.id

    try {
        const user = await UserModel.findById(id)
        if(user){

            const {password, ...otherDetails} = user._doc
            res.status(200).json(otherDetails)
        } else {
            res.status(404).json("user does not exist")
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

export const updateUser = async(req, res) => {
    const id = req.params.id
    const {currentUserId, currentUserAdminStatus, password} = req.body

    if(id===currentUserId || currentUserAdminStatus){
        try {

            if(password){
                const salt = await bcrypt.genSalt(10)
                req.body.password = await bcrypt.hash(password, salt)
            }

            const user = await UserModel.findByIdAndUpdate(id, req.body, {new: true})

            if(user){
            const {password, ...otherDetails} = user._doc
            res.status(200).json(otherDetails)
        } else {
            res.status(404).json("can't update user")
        }
        } catch (error) {
            res.status(500).json(error)
        }
    } else {
        res.status(403).json("Access Denied.")
    }
}

export const deleteUser = async(req, res) => {
    const id = req.params.id
    const {currentUserId, currentUserAdminStatus} = req.body
    if(id===currentUserId || currentUserAdminStatus){
        try {
            await UserModel.findByIdAndDelete(id)
            res.status(200).json('User deleted successfully')
        } catch (error) {
            res.status(500).json(error)
        }
    } else {
        res.status(403).json('Access Denied.')
    }
}

export const followUser = async(req, res) => {
    const id = req.params.id

    const {currentUserId} = req.body

    if(currentUserId === id) {
        res.status(403).json('Invalid Action.')
    } else {
        try {
            const followedUser = await UserModel.findById(id)
            const followingUser = await UserModel.findById(currentUserId)

            if(!followedUser.followers.includes(currentUserId)) {
                await followedUser.updateOne({$push: {followers: currentUserId}})
                await followingUser.updateOne({$push: {following: id}})
                res.status(200).json("Successfully followed the user")
            } else {
                res.status(403).json("Already following the user")
            }
        } catch (error) {
            res.status(500).json(error)
        }
    }
}

export const unfollowUser = async(req, res) => {
    const id = req.params.id

    const {currentUserId} = req.body

    if(currentUserId === id) {
        res.status(403).json('Invalid Action.')
    } else {
        try {
            const followedUser = await UserModel.findById(id)
            const followingUser = await UserModel.findById(currentUserId)

            if(followedUser.followers.includes(currentUserId)) {
                await followedUser.updateOne({$pull: {followers: currentUserId}})
                await followingUser.updateOne({$pull: {following: id}})
                res.status(200).json("Successfully unfollowed the user")
            } else {
                res.status(403).json("You are not following the user")
            }
        } catch (error) {
            res.status(500).json(error)
        }
    }
}