import './Posts.css'
import { postsData } from '../../fakeData/postsData'
import Post from '../post/Post'

const Posts = () => {
  return (
    <div className="Posts">
        {postsData.map((post, i) => {
            return <Post data={post} id={i}/>
        })}
    </div>
  )
}

export default Posts