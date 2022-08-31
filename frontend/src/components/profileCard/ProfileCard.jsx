import React from 'react'
import './ProfileCard.css'
import Cover from '../../img/bg5.png'
import Profile from '../../img/profile3.png'

const ProfileCard = () => {

    const profilePage = true;

    return (
        <div className="ProfileCard">
            <div className="ProfileImages">
                <img src={Cover} alt="" />
                <img src={Profile} alt="" />
            </div>

            <div className="ProfileName">
                <span>Julie_93</span>
                <span>Fashion Design Student</span>
            </div>

            <div className="followStatus">
                <hr />
                <div>
                    <div className="follow">
                        <span>367</span>
                        <span>Followings</span>
                    </div>
                    <div className="vl"></div>
                    <div className="follow">
                        <span>1,861</span>
                        <span>Followers</span>
                    </div>

                    {profilePage && (
                        <>
                            <div className="vl">

                            </div>
                            <div className="follow">
                                <span>3</span>
                                <span>Posts</span>
                            </div>
                        </>
                    )}
                </div>
                <hr />
            </div>
            
            {profilePage ? '': (<span>My profile</span>)}
            
        </div>
    )
}

export default ProfileCard