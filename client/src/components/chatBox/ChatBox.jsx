import { useEffect } from 'react'
import { useState, useRef } from 'react'
import { addMessage, getMessages } from '../../api/MessageRequest'
import { getUser } from '../../api/UserRequest'
import './ChatBox.css'
import {format} from 'timeago.js'
import InputEmoji from 'react-input-emoji'
const ChatBox = ({chat, currentUserId, setSendMessage, receiveMessage}) => {

    const [friendData, setFriendData] = useState(null)
    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState('');
    const scroll = useRef()

    useEffect(()=>{
        if(receiveMessage && receiveMessage.chatId === chat?._id) {
            setMessages([...messages, receiveMessage])
        }
    }, [receiveMessage])

    useEffect(() => {
        const friendId = chat?.members?.find(id => id!==currentUserId)
        const fetchFriendData = async () => {
            try {
                const { data } = await getUser(friendId);
                setFriendData(data);
            } catch (error) {
                console.log(error)
            }
        }
        if(chat) fetchFriendData();
    }, [chat, currentUserId])

    useEffect(() => {
      const fetchMessages = async () => {
        try {
          const {data} = await getMessages(chat._id)
          console.log(data)
          setMessages(data)
        } catch (error) {
          console.log(error);
        }      
      };
      if (chat) fetchMessages();
    }, [chat]);
    
    const handleChange = (newMessage) => {
        setNewMessage(newMessage);
    }

    const handleSend = async (e) => {
        e.preventDefault()
        const message = {
            senderId: currentUserId,
            text: newMessage,
            chatId: chat._id
        }

        // add message to db

        try {
            const {data} = await addMessage(message)
            setMessages([...messages, data])
            setNewMessage('')
        } catch (error) {
            console.log(error)
        }

        // send message to socket server
        const receiverId = chat.members.find(id => id!==currentUserId)
        setSendMessage({...message, receiverId})
    }

    // always scroll to the latest message

    useEffect(()=>{
        scroll.current?.scrollIntoView({ behaviour: 'smooth'})
    },[messages])

  return (
    <>
      <div className="ChatBox-container">

        {chat ? (
            <>
            <div className="chat-header">
                <div className="follower">
                <div>
                    <img
                    src={
                        friendData?.profilePicture
                        ? process.env.REACT_APP_PUBLIC_FOLDER +
                            friendData.profilePicture
                        : process.env.REACT_APP_PUBLIC_FOLDER +
                            "defaultProfile2.png"
                    }
                    className="followerImg"
                    style={{ width: "50px", height: "50px" }}
                    alt=""
                    />
                    <div className="name" style={{ fontSize: "0.8rem" }}>
                    <span>
                        {friendData?.firstname} {friendData?.lastname}
                    </span>
                    </div>
                </div>
                </div>
                <hr style={{ width: "85%", border: "0.1px solid #ececec" }} />
            </div>

            <div className="chat-body">
                {messages.map((message) => (
                
                    <div
                    ref = {scroll}
                    className={
                        message.senderId === currentUserId
                        ? "message own"
                        : "message"
                    }
                    key={message._id}
                    >
                        <span>{message.text}</span>
                        <span>{format(message.createdAt)}</span>
                    </div>
                
                ))}
            </div>

            <div className="chat-sender">
                <div>+</div>
                <InputEmoji value={newMessage} onChange={handleChange} />
                <div className="send-button button" onClick={handleSend}>Send</div>
            </div>
            </>
        ) : (
            <span className='chatbox-empty-message'>start Chatting now!</span>
        )}
      </div>
    </>
  );
}

export default ChatBox