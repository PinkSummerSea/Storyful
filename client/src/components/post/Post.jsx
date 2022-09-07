import './Post.css'
import Comment from '../../img/comment.png'
import Share from '../../img/share.png'
import Heart from '../../img/like.png'
import NotLike from '../../img/notlike.png'
import {useSelector} from 'react-redux'
import { useState } from 'react'
import { likePost } from '../../api/PostRequest.js'
import { useEffect } from 'react'
import {UilLocationPoint} from "@iconscout/react-unicons";
import { Link } from 'react-router-dom'

const Post = ({ data, from }) => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const [liked, setLiked] = useState();
  const [likes, setLikes] = useState()
  
  const handleLike = () => {
    likePost(data._id, user._id);
    setLiked((prev) => !prev);
    liked? setLikes((prev)=>prev-1): setLikes((prev)=>prev+1)
  };

  useEffect(()=>{
    setLiked(data.likes.includes(user._id))
    setLikes(data.likes.length)
  }, [data.likes])


  return (
    <div className="Post">
      <div className="detail">
        <h3>
          <Link to={`../story/${data._id}`} className="title">
            {data.title}
          </Link>
        </h3>
        <span style={{ position: "relative", top: "-10px", color: "gray" }}>
          by {data.username}
        </span>
        {from === "story" ? (
          <div dangerouslySetInnerHTML={{ __html: data.desc }}></div>
        ) : (
          <span className="desc">{data.desc.replace(/<[^>]*>?/gm, "")}</span>
        )}
      </div>
      <img
        src={data.image ? process.env.REACT_APP_PUBLIC_FOLDER + data.image : ""}
        alt=""
      />
      <div style={{ position: "relative", marginBottom: "0.6rem" }}>
        <span
          style={{ color: "var(--location)", position: "relative", top: "5px" }}
        >
          <UilLocationPoint />
        </span>
        <span style={{ color: "gray" }}> {data.location}</span>
      </div>
      <div className="postReact">
        <img
          src={liked ? Heart : NotLike}
          alt=""
          style={{ cursor: "pointer" }}
          onClick={handleLike}
        />
        <img src={Comment} alt="" />
        <img src={Share} alt="" />
      </div>

      <span style={{ color: "var(--gray)", fontSize: "12px" }}>
        {likes} likes
      </span>
    </div>
  );
};

export default Post;

// <div className="option" style={{ color: "var(--location" }}>
          //   <UilLocationPoint />
          //   Location
          // </div>