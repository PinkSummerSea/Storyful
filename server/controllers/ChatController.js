import ChatModel from "../models/chatModel.js";

export const createChat = async(req, res) => {

    const existingChat = await ChatModel.find({
        members: {$all: [req.body.senderId, req.body.receiverId]}
    })


    try {
        if(existingChat.length > 0) {
            res.status(200).json(existingChat[0])
        } else {
            const newChat = new ChatModel({
                members: [req.body.senderId, req.body.receiverId]
            })
            const result = await newChat.save()
            res.status(200).json(result)
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

export const userChats = async(req, res) => {
    try {
        const chats = await ChatModel.find({
            members: {$in: [req.params.userId]}
        })
        res.status(200).json(chats)
    } catch (error) {
         res.status(500).json(error)
    }
}

export const findChat = async(req, res) => {
    try {
        const chat = await ChatModel.findOne({
            members: {$all: [req.params.firstId, req.params.secondId]}
        })
        res.status(200).json(chat)
    } catch (error) {
        res.status(500).json(error)
    }
}