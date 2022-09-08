import '../auth/Auth.css'
import './Welcome.css'
import Logo from "../../img/open-book33.png";
import {useNavigate} from 'react-router-dom'
import React from 'react'

const Welcome = () => {

  const navigate = useNavigate()

  const handleClick = () => {
    navigate('/city_map')
  }

  return (
    <div className="Welcome">
      <div className="Auth">
        <div className="a-left">
          <img src={Logo} alt="" />
          <div className="Webname">
            <h1 id='welcome-logo' className="logo-text big-logo-text">Storyful</h1>
            <h6 className="slogan big-slogan">
              Open Your Storybook <br />
              and Discover Beautiful Souls
            </h6>
          </div>
        </div>
      </div>
      <button className="button welcome-button" id='welcome-button' onClick={handleClick}>
        Explore City Story Map
      </button>
    </div>
  );
}

export default Welcome