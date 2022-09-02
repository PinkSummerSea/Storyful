import React from "react";
import {useDispatch, useSelector} from 'react-redux'
import { followUser, unfollowUser } from "../../actions/UserAction.js";
import {useState} from 'react'
import { useNavigate } from "react-router-dom";
const User = ({person}) => {
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER
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
              ? serverPublic + person.profilePicture
              : serverPublic + "defaultProfile2.png"
          }
          alt=""
          className="followerImg"
          onClick={handleRedirect}
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
