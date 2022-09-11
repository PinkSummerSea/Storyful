import * as PostApi from '../api/PostRequest.js'


export const getTimelinePosts = (userId) =>  async(dispatch) => {

    dispatch({type: "GET_POSTS_START"})

    try {
        const {data} = await PostApi.getTimelinePosts(userId)
        dispatch({type: "GET_POSTS_SUCCESS", data: data})
    } catch (error) {
        console.log(error)
        dispatch({type: "GET_POSTS_FAIL"})
    }
}

export const getAllPosts = () => async(dispatch) => {
   
    try {
         const {data} = await PostApi.getAllPosts()
         dispatch({type: 'ALL_POSTS_FETCHED', data: data})
    } catch (error) {
        console.log(error)
        dispatch({type: "FETCH_ALL_POSTS_FAIL"})
    }
}

export const updateQueriedPosts = (data) => (dispatch) => {
    dispatch({type: "UPDATE_QUERIED_POSTS", data: data})
}

export const deletePost = (postId, userId) => async(dispatch) => {
    try {
        const {data} = await PostApi.deletePost(postId, userId)
        console.log(data)
        dispatch({type: 'DELETE_SUCCESS', data: data})
    } catch (error) {
        console.log(error)
        dispatch({type: 'DELETE_FAIL'})
    }
}