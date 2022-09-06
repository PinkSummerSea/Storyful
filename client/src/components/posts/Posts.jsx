import './Posts.css'
import Post from '../post/Post'
import {useDispatch, useSelector} from 'react-redux'
import { useEffect } from 'react'
import {getTimelinePosts} from '../../actions/PostAction.js'
import { useParams } from "react-router-dom";

const Posts = () => {
  const dispatch = useDispatch()
  const params = useParams();
  const {user} = useSelector((state) => state.authReducer.authData)
  let {posts, loading} = useSelector((state) => state.postReducer)

  useEffect(()=> {
    dispatch(getTimelinePosts(user._id))
  }, [])

  if (!posts) return "No Posts";
  if (params.id) posts = posts.filter((post) => post.userId === params.id);

  return (
    <div className="Posts">
      {loading
        ? "Loading Posts..."
        :posts.map((post, i) => {return <Post data={post} key={post._id} />})
      }
    </div>
  );
}

export default Posts