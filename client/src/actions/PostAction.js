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

export default getTimelinePosts