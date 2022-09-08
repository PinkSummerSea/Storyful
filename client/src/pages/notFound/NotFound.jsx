import React from 'react'
import LogoSearch from '../../components/logoSearch/LogoSearch';
import Home from "../../img/home5.png";
import Comment from "../../img/chat.png";
import Globe from "../../img/globe11.png";
import { Link } from "react-router-dom";
import './NotFound.css'
import NF from '../../img/pngegg.png'
import { useNavigate } from "react-router-dom";

const NotFound = () => {
    const navigate = useNavigate();
    const handleClick = () => {
      navigate("/city_map");
    };
  return (
    <div className="NotFound">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "1rem 10rem",
        }}
      >
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