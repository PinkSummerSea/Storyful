const postReducer = (state = {posts: [], loading: false, uploading: false, error: false, allPosts: [], queriedPosts: []}, action) => {
    switch(action.type){
        case "UPLOAD_START":
            return {...state, uploading: true, error: false}
        case "UPLOAD_SUCCESS":
            return {...state, posts: [action.data, ...state.posts], uploading: false, error: false}
        case "UPLOADE_FAIL":
            return {...state, uploading: false, error: true}
        case "GET_POSTS_START":
            return { ...state, loading: true, error: false };
        case "GET_POSTS_SUCCESS":
            return { ...state, posts: action.data, loading: false, error: false };
        case "GET_POSTS_FAIL":
            return { ...state, loading: false, error: true };
        case "ALL_POSTS_FETCHED":
            return { ...state, allPosts: action.data, loading: false, error: false };
        case "FETCH_ALL_POSTS_FAIL":
            return { ...state, loading: false, error: true };
        case "UPDATE_QUERIED_POSTS":
            return {...state, queriedPosts: action.data}
        default:
            return state
    }
}

export default postReducer