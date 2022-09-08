import './InfoCard.css'
import {UilPen} from '@iconscout/react-unicons'
import {useState} from 'react'
import ProfileModal from '../profileModal/ProfileModal'
import {useDispatch, useSelector} from 'react-redux'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import * as UserApi from '../../api/UserRequest.js'
import { logout } from '../../actions/AuthAction.js'

const InfoCard = () => {

    const [modalOpened, setModalOpened] = useState(false)
    const dispatch = useDispatch()
    const params = useParams()

    const profileUserId = params.id
    const [profileUser, setProfileUser] = useState({})
    const {user} = useSelector(state => state.authReducer.authData)

    const handleLogout = () => {
        dispatch(logout())
    }

    useEffect(()=>{
        const fetchProfileUser = async() => {
            if(profileUserId === user._id){
                setProfileUser(user)
            } else {
                const res = await UserApi.getUser(profileUserId)
                //console.log(res.data)
                setProfileUser(res.data)
            }
        }

        fetchProfileUser()
    },[user, profileUserId])
    return (
      <div className="InfoCard">
        <div className="infoHead">
          <h4>{profileUser.firstname}'s Profile</h4>
          {profileUser === user && (
            <div>
              <UilPen
                width="2rem"
                height="1.2rem"
                onClick={() => {
                  setModalOpened(true);
                }}
              />
              <ProfileModal
                modalOpened={modalOpened}
                setModalOpened={setModalOpened}
                data={user}
              />
            </div>
          )}
        </div>

        <div className="info">
          <span>
            <b>Status </b>
          </span>
          <span>
            {profileUser.relationship ? profileUser.relationship : ""}
          </span>
        </div>

        <div className="info">
          <span>
            <b>Lives in </b>
          </span>
          <span>{profileUser.livesin ? profileUser.livesin : ""}</span>
        </div>

        <div className="info">
          <span>
            <b>Works at </b>
          </span>
          <span>{profileUser.worksat ? profileUser.worksat : ""}</span>
        </div>
        {profileUser === user && (
          <button className="button logout-button" onClick={handleLogout}>
            Logout
          </button>
        )}
      </div>
    );
}

export default InfoCard