import './Story.css'
import { useParams } from 'react-router-dom'
import Post from '../../components/post/Post'
import { useEffect, useState } from 'react'
import axios from 'axios'

const Story = () => {
    const {id} = useParams()
    const [post, setPost] = useState(null)
    useEffect(()=>{
        const getPost = async(id) => {
            try {
                const { data } = await axios.get(
                  `http://localhost:8000/post/${id}`
                );
                setPost(data);
            } catch (error) {
                console.log(error)
            }
        }
        getPost(id)
     }, [id])

  return (
    <div className="Story">
        {post && <Post data={post} from='story'/>}
    </div>
  );
}

export default Story