import { useEffect } from 'react'
import { useState } from 'react'
import { getUser } from '../../api/UserRequest'
import './Conversation.css'

const Conversation = ({data, currentUserId, online, receiveMessage, showNoti, currentChat,setCurrentChat, setShowNoti}) => {
    const [friendData, setFriendData] = useState(null)


    const friendId = data.members.find((id) => id!== currentUserId)
   
    useEffect(() => {
      
      const getFriendData = async () => {

        try {
            const res = await getUser(friendId);
            setFriendData(res.data);
            console.log(res.data);
        } catch (error) {
            console.log(error)
        }
        
      };
    
      getFriendData();
    }, []);


  return (
    <>
      <div
        className={
          showNoti && receiveMessage.chatId === data._id
            ? "follower conversation showNoti"
            : "follower conversation"
        }
        // onClick={()=>{
        //   (showNoti && (receiveMessage.chatId === data._id)) && setShowNoti(false)
        // }}
      >
        <div>
          {online && <div className="online-dot"></div>}
          <img
            src={
              friendData?.profilePicture
                ? friendData.profilePicture
                : "https://res.cloudinary.com/danvmjkut/image/upload/v1663006406/defaultProfile2_tktwrq.png"
            }
            className="followerImg"
            style={{ width: "50px", height: "50px" }}
            alt=""
          />
          <div className="name" style={{ fontSize: "0.8rem" }}>
            <span>
              {friendData?.firstname} {friendData?.lastname}
            </span>
            <span>{online ? "Online" : "Offline"}</span>
          </div>
        </div>
      </div>
      <hr style={{ width: "85%", border: "0.1px solid #ececec" }} />
    </>
  );
}

export default Conversation