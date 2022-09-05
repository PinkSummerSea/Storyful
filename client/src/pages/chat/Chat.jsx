import LogoSearch from '../../components/logoSearch/LogoSearch'
import './Chat.css'
import {useSelector} from 'react-redux'
import {useState, useEffect} from 'react'
import { userChats } from '../../api/ChatRequest'
import Conversation from '../../components/conversation/Conversation'
import { Link, useLocation } from 'react-router-dom'
import Home from "../../img/home.png";
import Noti from "../../img/noti.png";
import Comment from "../../img/comment.png";
import { UilSetting } from "@iconscout/react-unicons";
import ChatBox from '../../components/chatBox/ChatBox'
import {io} from 'socket.io-client'
import { useRef } from 'react'

const Chat = () => {
    
    const {user} = useSelector(state => state.authReducer.authData)
    const [chats, setChats] = useState([])
    const [currentChat, setCurrentChat] = useState(null)
    const [onlineUsers, setOnlineUsers] = useState([])
    const [sendMessage, setSendMessage] = useState(null)
    const [receiveMessage, setReceiveMessage] = useState(null);
    const [showNoti, setShowNoti] = useState(false);
    const [read, setRead] = useState(true)
    const socket = useRef()
    const location = useLocation()
    const {state} = useLocation()

   console.log(location)
    

    useEffect(()=>{
        socket.current = io('http://localhost:8800')
        socket.current.emit('new-user-add', user._id)
        socket.current.on('get-users', (activeUsers) =>  {
            setOnlineUsers(activeUsers)
        })

        return()=>{
          socket.current.disconnect()
        }
        
    }, [user])
    
    //send message to socket server
    useEffect(()=>{
        if(sendMessage) {
            socket.current.emit('send-message', sendMessage)
        }
    },[sendMessage])

    // receive message from socket server

    useEffect(() => {
      socket.current.on("receive-message", (data) => {
        setReceiveMessage(data);
      });
    }, []);

    useEffect(()=>{
      console.log(receiveMessage)
      if (!currentChat || (receiveMessage?.chatId !== currentChat._id)) {
        setRead(false);
      } else {
        setRead(true)
      }
    }, [receiveMessage,!!currentChat])

    useEffect(() => {
      const getChats = async () => {
        try {
          const { data } = await userChats(user._id);
          setChats(data);
          state?.selectedChat
            ? setCurrentChat(state.selectedChat)
            : setCurrentChat(data[0]);
          console.log(data);
        } catch (error) {
          console.log(error);
        }
      };
      getChats();
    }, [user]);

    useEffect(() => {
      if (
        receiveMessage && !read &&
        (!currentChat || (receiveMessage.chatId !== currentChat._id))
      ) {
        setShowNoti(true);
      } else {
        setShowNoti(false);
      }
    }, [receiveMessage, currentChat, read]);

    const checkOnlineStatus = (chat) => {
        const friendId = chat.members.find(id => id!==user._id) 
        const result = onlineUsers.find(u => u.userId === friendId)
        return result
    }

  return (
    <div className="Chat">
      <div className="Left-side-chat">
        <LogoSearch />
        <div className="Chat-container">
          <h2>Chats</h2>
          <div className="Chat-list">
            {chats.map((chat) => (
              <div
                onClick={() => {
                  setCurrentChat(chat);
                  if (showNoti && receiveMessage?.chatId === chat._id) {
                    setRead(true);
                  }
                  //setShowNoti(false)
                }}
                key={chat._id}
              >
                <Conversation
                  data={chat}
                  currentUserId={user._id}
                  online={checkOnlineStatus(chat)}
                  receiveMessage={receiveMessage}
                  currentChat={currentChat}
                  showNoti={showNoti}
                  setShowNoti={setShowNoti}
                  setCurrentChat={setCurrentChat}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="Right-side-chat">
        <div style={{ width: "20rem", alignSelf: "flex-end" }}>
          <div className="navIcons">
            <Link to="../home">
              <img src={Home} alt="" />
            </Link>
            <UilSetting />
            <img src={Noti} alt="" />
            <Link to="../chat">
              <img src={Comment} alt="" />
            </Link>
          </div>
        </div>

        <ChatBox
          chat={currentChat}
          currentUserId={user._id}
          setSendMessage={setSendMessage}
          receiveMessage={receiveMessage}
        />
      </div>
    </div>
  );
}

export default Chat