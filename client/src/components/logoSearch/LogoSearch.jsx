import {useState} from 'react'
import './LogoSearch.css'
import Logo from "../../img/open-book33.png";
import {UilSearch} from '@iconscout/react-unicons'
import {useDispatch} from 'react-redux'
import { updateQuery } from '../../actions/UserAction'
import { useEffect } from 'react'
import { getAllPosts, updateQueriedPosts } from '../../actions/PostAction'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

const LogoSearch = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleSearch = async () => {
    //query && dispatch(updateQuery(query))
    if(query) {
      const { data } = await axios.get(
        `https://storyful.herokuapp.com/post?q=${query}`
      );
      dispatch(updateQueriedPosts(data))
      navigate('../storybook', {state:{query: query}})
    }
  }
  // useEffect(()=>{
  //   dispatch(updateQueriedPosts([]));

  //   return()=>{
  //     dispatch(updateQueriedPosts([]));
  //   }
  // }, [])


  return (
    <div className="LogoSearch">
        <img src={Logo} alt='logo' className='logo'/>
        <div className="Search">
          <input type='text' placeholder='#Find Stories' onChange={e=>setQuery(e.target.value)}/>
          <div className="s-icon" onClick={handleSearch}>
            <UilSearch />
          </div>
        </div>
    </div>
  )
}

export default LogoSearch