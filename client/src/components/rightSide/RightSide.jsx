import './RightSide.css'
import {useState} from 'react'
import Home from "../../img/home5.png";
import Comment from "../../img/chat.png";
import Globe from '../../img/globe11.png'
import TrendCard from '../trendCard/TrendCard';
//import ShareModal from '../shareModal/ShareModal';
import {Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import Crown from "../../img/crown (1)(1).png";

const RightSide = () => {

  const [modalOpened, setModalOpened] = useState(false)
  const navigate = useNavigate()
  const handleClick = () => {
    navigate('/chat', {replace: true})
  }

  return (
    <div className="RightSide">
      <div className="navIcons">
        <Link to="../home">
          <img src={Home} alt="" />
        </Link>
        {/* <UilSetting />*/}

        <img
          src={Comment}
          alt=""
          onClick={handleClick}
          style={{ cursor: "pointer" }}
        />
        <Link to="../city_map">
          <img src={Globe} alt="" />
        </Link>
        <Link to="../membership">
          <img src={Crown} alt="" />
        </Link>
      </div>

      <TrendCard />

      <button
        className="button r-button"
        onClick={() => {
          navigate("/city_map");
        }}
        // onClick={() => {
        //   setModalOpened(true);
        // }}
      >
        Explore City Story Map
      </button>
      {/* <ShareModal modalOpened={modalOpened} setModalOpened={setModalOpened} /> */}
    </div>
  );
}

export default RightSide