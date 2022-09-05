import axios from 'axios'

const API = axios.create({baseURL: "http://localhost:8000"})

export const userChats = (userId) => API.get(`/chat/${userId}`)
export const createChat = (senderId, receiverId) => API.post('/chat', {senderId, receiverId})