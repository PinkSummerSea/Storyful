import React from 'react'
import './ProfileCard.css'
import {useSelector} from 'react-redux'
import {Link, useParams, useNavigate} from 'react-router-dom'
import { useEffect, useState } from 'react'
import * as UserApi from "../../api/UserRequest.js";
import { createChat } from '../../api/ChatRequest.js'

const ProfileCard = ({location}) => {

    const {user} = useSelector(state => state.authReducer.authData)
    const [profileUser, setProfileUser] = useState(null)
    const [diffUser, setDiffUser] = useState(false)
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
      const fetchProfileUser = async () => {
        if (params.id && params.id !== user._id) {
          const res = await UserApi.getUser(params.id);
          setProfileUser(res.data);
          setDiffUser(true)
        } 
        // else {
        //   const res = await UserApi.getUser(user._id);
        //   setProfileUser(res.data);
        // }
      };
      fetchProfileUser();
      
    }, [params, user]);

    const handleClick = async () => {
        if (diffUser) {
            const {data} = await createChat(user._id, profileUser?._id)
            navigate('/chat', {state: {selectedChat: data}})
        }
    }

    const visitProfilePage = () => {
        navigate(`../profile/${profileUser?._id || user._id}`);
    }    
   
    const posts = useSelector(state => state.postReducer.posts)
    const {allPosts} = useSelector((state) => state.postReducer);

    return (
      <div className="ProfileCard">
        <div className="ProfileImages">
          <img
            src={
              (profileUser || user).coverPicture
                ? (profileUser || user).coverPicture
                : "https://res.cloudinary.com/danvmjkut/image/upload/v1663006406/defaultCover_pfkwbt.png"
            }
            alt=""
          />
          <img
            src={
              (profileUser || user).profilePicture
                ? (profileUser || user).profilePicture
                : "https://res.cloudinary.com/danvmjkut/image/upload/v1663006406/defaultProfile2_tktwrq.png"
            }
            alt=""
            onClick={visitProfilePage}
            style={{ cursor: "pointer" }}
          />
        </div>

        <div className="ProfileName">
          <span>
            {(profileUser || user).firstname +
              " " +
              (profileUser || user).lastname}
          </span>
          <span>
            Woks at{" "}
            {(profileUser || user).worksat ? (profileUser || user).worksat : ""}
          </span>
        </div>

        {profileUser && (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button className="button fc-button" onClick={handleClick}>
              Message {profileUser.username}
            </button>
          </div>
        )}

        <div className="followStatus">
          <hr />
          <div>
            <div className="follow">
              <span>{(profileUser || user).following.length}</span>
              <span>Followings</span>
            </div>
            <div className="vl"></div>
            <div className="follow">
              <span>{(profileUser || user).followers.length}</span>
              <span>Followers</span>
            </div>

            {location === "profilePage" && (
              <>
                <div className="vl"></div>
                <div className="follow">
                  <span>
                    {
                      allPosts.filter(
                        (p) => p.userId === (profileUser || user)._id
                      ).length
                    }
                  </span>
                  <span>Posts</span>
                </div>
              </>
            )}
          </div>
          <hr />
        </div>

        {diffUser ? (
          ""
        ) : (
          <button className="button">
            <Link
              style={{ textDecoration: "none", color: "inherit" }}
              to={`/profile/${user._id}`}
            >
              My profile
            </Link>
          </button>
        )}
      </div>
    );
}

export default ProfileCard