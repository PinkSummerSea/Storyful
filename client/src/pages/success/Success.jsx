import React, { useState, useEffect } from "react";
import './Success.css'
import {Link, useNavigate} from "react-router-dom";
import { BsBagCheckFill } from "react-icons/bs";
import confetti from "canvas-confetti";
import Header from "../../components/header/Header";

const Success = () => {
  const navigate = useNavigate()
  const runConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  }; 

  useEffect(()=>{
    runConfetti();
  }, [])


  return (
    <div className="">
      <Header />
      <div className="success-wrapper">
        <div className="success">
          <p className="icon">
            <BsBagCheckFill />
          </p>
          <h2>
            Congratulations! <br />
            You Are a Member Now!
          </h2>
          <h3>Enjoy unlimited messaging and more</h3>
          <p className="description">
            If you have any questions, please email{" "}
            <a className="email" href="mailto:lin.summer@outlook.com">
              lin.summer@outlook.com
            </a>
          </p>

          <button className="button" style={{ marginTop: "2em" }} onClick={()=>navigate('../home')}>
            Go back to homepage
          </button>
        </div>
      </div>
    </div>
  );
};

export default Success;
