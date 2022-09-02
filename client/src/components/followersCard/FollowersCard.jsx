import React from 'react'
import './FollowersCard.css'
import User from '../user/User.jsx'
import { useEffect } from 'react'
import { useState } from 'react'
import {useSelector} from 'react-redux'
import { getAllUsers } from '../../api/UserRequest'

const FollowersCard = () => {
    const [persons, setPersons] = useState([])
    const {user} = useSelector((state) => state.authReducer.authData)
    useEffect(() => {
        const fetchPersons = async()=>{
            const {data} = await getAllUsers()
            setPersons(data)
        }

        fetchPersons()
    }, [])
  return (
    <div className="FollowersCard">
        <h3>People you may know</h3>

        {
            persons.map((person, i) => {
                
                return(
                    person._id === user._id ? '' : <User person={person} key={person._id}/>
                )
            })
        }
    </div>
  )
}

export default FollowersCard