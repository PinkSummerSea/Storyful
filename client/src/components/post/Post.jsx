import './Post.css'
import Heart from '../../img/like.png'
import NotLike from '../../img/notlike.png'
import {useSelector} from 'react-redux'
import { useState } from 'react'
import { likePost } from '../../api/PostRequest.js'
import { deletePost } from '../../actions/PostAction'
import { useEffect } from 'react'
import {UilLocationPoint} from "@iconscout/react-unicons";
import { Link, useNavigate } from 'react-router-dom'
import trash from "../../img/trash.png";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const Post = ({ data, from }) => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const [liked, setLiked] = useState();
  const [likes, setLikes] = useState()
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLike = () => {
    likePost(data._id, user._id);
    setLiked((prev) => !prev);
    liked? setLikes((prev)=>prev-1): setLikes((prev)=>prev+1)
  };

  useEffect(()=>{
    setLiked(data.likes.includes(user._id))
    setLikes(data.likes.length)
  }, [data.likes])

  const handleDelete = async () => {
    console.log(user._id)
    try {
      dispatch(deletePost(data._id, user._id));
      if(from==='story'){
        navigate('../home')
      }
      toast("🦄 Post deleted", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className={from === "storybook" ? "StorybookPost" : "Post"}>
      
      <div className="detail">
        <h3 id="short">
          <Link to={`../story/${data.userId}/${data._id}`} id="title">
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
        src={data.image ? data.image : ""}
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
        { data.userId === user._id && (
            <img
              src={trash}
              alt=""
              width="25px"
              style={{ cursor: "pointer" }}
              onClick={handleDelete}
            />
        )}
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