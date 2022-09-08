import './StoryBook.css'
import { useState, useRef, useEffect } from "react";
import { getAllPosts } from "../../actions/PostAction";
import { useSelector, useDispatch } from "react-redux";
import Post from '../../components/post/Post';

import {useLocation} from 'react-router-dom'
import Header from '../../components/header/Header';

const StoryBook = () => {
  const { queriedPosts } = useSelector((state) => state.postReducer);
  const {state} = useLocation()
  //console.log(queriedPosts)
  let { allPosts } = useSelector((state) => state.postReducer);
  //const [postsToShow, setPostsToShow] = useState(allPosts);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllPosts());
  }, []);
  return (
    <div className="wrapper">
      <Header />
      <div className="Storybook">
        {state?.query
          ? queriedPosts.length > 0
            ? queriedPosts.map((post) => (
                <Post data={post} key={post._id} from="storybook" />
              ))
            : "Sorry, no result"
          : allPosts.map((post) => (
              <div className="post-wrapper">
                <Post from="storybook" data={post} key={post._id} />
              </div>
            ))}
      </div>
    </div>
  );
}

export default StoryBook