import './Story.css'
import { useParams, Link } from 'react-router-dom'
import Post from '../../components/post/Post'
import { useEffect, useState } from 'react'
import axios from 'axios'
import ProfileCard from '../../components/profileCard/ProfileCard'
import LogoSearch from '../../components/logoSearch/LogoSearch'
import Home from "../../img/home5.png";
import Comment from "../../img/chat.png";
import Globe from "../../img/globe11.png";

const Story = () => {
    const { storyId } = useParams();
    const [post, setPost] = useState(null)
    useEffect(() => {
      const getPost = async (id) => {
        try {
          const { data } = await axios.get(`http://localhost:8000/post/${id}`);
          setPost(data);
        } catch (error) {
          console.log(error);
        }
      };
      getPost(storyId);
    }, [storyId]);

  return (
    <div>
    <div style={{display: 'flex', justifyContent: 'space-between', padding: '1rem 10rem'}}>
      <LogoSearch />
      <div style={{ width: "20rem", alignSelf: "center" }}>
          <div className="navIcons">
            <Link to="../home">
              <img src={Home} alt="" />
            </Link>
            <Link to="../city_map">
              <img src={Globe} alt="" />
            </Link>
            <Link to="../chat">
              <img src={Comment} alt="" />
            </Link>
          </div>
        </div>
    </div>

      <div className="Story">
        <div>
          <ProfileCard />
        </div>
        <div>{post && <Post data={post} from="story" />}</div>
      </div>
    </div>
  );
}

export default Story