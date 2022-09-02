import FollowersCard from '../followersCard/FollowersCard'
import LogoSearch from '../logoSearch/LogoSearch'
import InfoCard from '../infoCard/InfoCard'
import './ProfileLeft.css'

const ProfileLeft = () => {
  return (
    <div className="ProfileLeft">
        <LogoSearch />
        <InfoCard />
        <FollowersCard />
    </div>
  )
}

export default ProfileLeft