import React from 'react'
import LogoSearch from "../../components/logoSearch/LogoSearch";
import Home from "../../img/home5.png";
import Comment from "../../img/chat.png";
import Globe from "../../img/globe11.png";
import Crown from "../../img/crown (1)(1).png";
import { Link } from "react-router-dom";

const Header = () => {
  return (
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
          <Link to="../membership">
            <img src={Crown} alt="" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Header