import React from "react";
import {useDispatch, useSelector} from 'react-redux'
import { followUser, unfollowUser } from "../../actions/UserAction.js";
import {useState} from 'react'
import { useNavigate } from "react-router-dom";
const User = ({person}) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {user} = useSelector(state => state.authReducer.authData)
  const [following, setFollowing] = useState(person.followers.includes(user._id))
  const handleFollow = () => {
    following
      ? dispatch(unfollowUser(person._id, user))
      : dispatch(followUser(person._id, user));
    setFollowing(prev => !prev)
  }
  const handleRedirect = () => {
    navigate(`/profile/${person._id}`)
  }
  return (
    <div className="follower">
      <div>
        <img
          src={
            person.profilePicture
              ? person.profilePicture
              : "https://res.cloudinary.com/danvmjkut/image/upload/v1663006406/defaultProfile2_tktwrq.png"
          }
          alt=""
          className="followerImg"
          onClick={handleRedirect}
          style={{ cursor: "pointer" }}
        />
        <div className="name" onClick={handleRedirect}>
          <span>
            {person.firstname} {person.lastname}
          </span>
          <span>@{person.username}</span>
        </div>
      </div>
      <button
        className={
          following ? "button fc-button UnfollowButton" : "button fc-button"
        }
        onClick={handleFollow}
      >
        {following ? "Unfollow" : "Follow"}
      </button>
    </div>
  );
};

export default User;
