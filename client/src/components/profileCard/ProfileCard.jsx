import React from 'react'
import './ProfileCard.css'
import {useSelector} from 'react-redux'
import {Link, useParams, useNavigate} from 'react-router-dom'
import { useEffect, useState } from 'react'
import * as UserApi from "../../api/UserRequest.js";

const ProfileCard = ({location}) => {

    const [user, setUser] = useState(useSelector(state => state.authReducer.authData.user)) 
    const [diffUser, setDiffUser] = useState(false)
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
      const fetchProfileUser = async () => {
        if (params.id && params.id !== user._id) {
          const res = await UserApi.getUser(params.id);
          setUser(res.data);
          setDiffUser(true)
        } else {
          const res = await UserApi.getUser(user._id);
          setUser(res.data);
        }
      };
      fetchProfileUser();
      
    }, [params, user]);

    const handleClick = () => {
        if (diffUser) {
            navigate('/chat')
        }
    }

    
   
    const posts = useSelector(state => state.postReducer.posts)
    const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER

    return (
        <div className="ProfileCard">
            <div className="ProfileImages">
                <img src={user.coverPicture ? serverPublic + user.coverPicture : serverPublic + "defaultCover.png"} alt="" />
                <img src={user.profilePicture ? serverPublic + user.profilePicture : serverPublic + "defaultProfile2.png"} alt="" />
            </div>

            <div className="ProfileName">
                <span>{user.firstname + ' ' + user.lastname}</span>
                <span>{user.worksAt ? user.worksAt : "Tell us a little bit about you"}</span>
            </div>

            <div style={{display: 'flex', justifyContent:'center'}}>
                <button className='button fc-button' onClick={handleClick}>Message {user.username}</button>
            </div>

            <div className="followStatus">
                <hr />
                <div>
                    <div className="follow">
                        <span>{user.following.length}</span>
                        <span>Followings</span>
                    </div>
                    <div className="vl"></div>
                    <div className="follow">
                        <span>{user.followers.length}</span>
                        <span>Followers</span>
                    </div>

                    {location === 'profilePage' && (
                        <>
                            <div className="vl">

                            </div>
                            <div className="follow">
                                <span>{posts.filter(p => (p.userId === user._id)).length}</span>
                                <span>Posts</span>
                            </div>
                        </>
                    )}
                </div>
                <hr />
            </div>
            
            {location === 'profilePage' ? '': (<span><Link style={{textDecoration: 'none', color: 'inherit'}} to={`/profile/${user._id}`}>My profile</Link></span>)}
            
        </div>
    )
}

export default ProfileCard