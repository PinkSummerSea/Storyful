import ProfileLeft from '../../components/profileLeft/ProfileLeft'
import ProfileCard from '../../components/profileCard/ProfileCard'
import RightSide from '../../components/rightSide/RightSide'
import './Profile.css'
import PostSide from '../../components/postSide/PostSide'
const Profile = () => {
  return (
    <div className="Profile">
        <ProfileLeft />

        <div className='Profile-center'>
          <ProfileCard location='profilePage'/>
          <PostSide />
        </div>

        <RightSide />
    </div>
  )
}

export default Profile