import React from 'react'
import './ProfileCard.css'
import {useSelector} from 'react-redux'
import {Link, useParams, useNavigate} from 'react-router-dom'
import { useEffect, useState } from 'react'
import * as UserApi from "../../api/UserRequest.js";
import { createChat } from '../../api/ChatRequest.js'

const ProfileCard = ({location}) => {

    const [user, setUser] = useState(useSelector(state => state.authReducer.authData.user)) 
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

    
   
    const posts = useSelector(state => state.postReducer.posts)
    const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER

    return (
      <div className="ProfileCard">
        <div className="ProfileImages">
          <img
            src={
              (profileUser || user).coverPicture
                ? serverPublic + (profileUser || user).coverPicture
                : serverPublic + "defaultCover.png"
            }
            alt=""
          />
          <img
            src={
              (profileUser || user).profilePicture
                ? serverPublic + (profileUser || user).profilePicture
                : serverPublic + "defaultProfile2.png"
            }
            alt=""
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
                      posts.filter(
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

        {location === "profilePage" ? (
          ""
        ) : (
          <span>
            <Link
              style={{ textDecoration: "none", color: "inherit" }}
              to={`/profile/${user._id}`}
            >
              My profile
            </Link>
          </span>
        )}
      </div>
    );
}

export default ProfileCard