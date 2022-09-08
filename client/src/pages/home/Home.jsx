import React from 'react'
import { useEffect, useState } from 'react'
import PostSide from '../../components/postSide/PostSide'
import ProfileSide from '../../components/profileSide/ProfileSide'
import RightSide from '../../components/rightSide/RightSide'
import './Home.css'

const Home = () => {

  // function refreshPage() {
  //   setTimeout(() => {
  //     window.location.reload(false);
  //   }, 8000);
  //   console.log("page to reload");
  // }

  // useEffect(()=>{
  //   refreshPage()
  // }, [])
  // let a = localStorage.getItem('hasReloaded')
  // console.log(a)
  // useEffect(() => {
  //     if(!a) {
  //       window.location.reload();
  //       localStorage.setItem("hasReloaded", true);

  //     }
      
  //     return () => {
  //       localStorage.setItem("hasReloaded", false);
  //     }
  // }, []);

  return (
    <div className='Home'>
        <ProfileSide />
        <PostSide />
        <RightSide />
        
    </div>
  )
}

export default Home