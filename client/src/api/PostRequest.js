import axios from 'axios'

const API = axios.create({baseURL: "https://storyful.herokuapp.com/"})

export const getTimelinePosts = (userId) => API.get(`/post/${userId}/timeline`)
export const likePost = (id, userId) => API.put(`/post/${id}/like`, {userId: userId})
export const getAllPosts = () => API.get('/post/')
export const deletePost = (postId, userId) => API.delete(`/post/${userId}/${postId}`)