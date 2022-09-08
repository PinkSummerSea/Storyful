import React from 'react'
import LogoSearch from '../../components/logoSearch/LogoSearch';
import Home from "../../img/home5.png";
import Comment from "../../img/chat.png";
import Globe from "../../img/globe11.png";
import { Link } from "react-router-dom";
import './NotFound.css'
import NF from '../../img/pngegg.png'
import { useNavigate } from "react-router-dom";
import Header from '../../components/header/Header';

const NotFound = () => {
    const navigate = useNavigate();
    const handleClick = () => {
      navigate("/city_map");
    };
  return (
    <div className="NotFound">
      
      <Header />
      <div className="error-wrapper">
        <h1>Oops. </h1>
        <h3>We didn't find the page you are looking for. </h3>
        <img src={NF} alt="" />
        <button
          className="button fc-button"
          id='error-button'
          onClick={handleClick}
        >
          Explore City Story Map
        </button>
      </div>
    </div>
  );
}

export default NotFound