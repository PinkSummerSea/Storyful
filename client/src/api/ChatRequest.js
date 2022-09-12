import axios from 'axios'

const API = axios.create({baseURL: "https://storyful.herokuapp.com/"})

export const userChats = (userId) => API.get(`/chat/${userId}`)
export const createChat = (senderId, receiverId) => API.post('/chat', {senderId, receiverId})