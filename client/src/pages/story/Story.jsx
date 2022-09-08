import './Story.css'
import { useParams } from 'react-router-dom'
import Post from '../../components/post/Post'
import { useEffect, useState } from 'react'
import axios from 'axios'
import ProfileCard from '../../components/profileCard/ProfileCard'
import Header from '../../components/header/Header'

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
    <Header />

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