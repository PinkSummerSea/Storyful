import React from 'react'
import './Membership.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import {FiCheckCircle} from 'react-icons/fi'
import Header from '../../components/header/Header';

const Membership = () => {
    const navigate = useNavigate()
    const handleClick = async (type) => {
        const { data } = await axios.post(
          "https://storyful.herokuapp.com/payment/create-checkout-session",
          { type: type }
        );
        const url = data.url
        window.location = url
    }

  return (
    <div className="Membership">
      <Header />
      <div className="table centered">
        <div className="row">
          <div className="column">
            <ul className="price">
              <li className="header">
                <br />
                <br />
                Features
              </li>
              <li>Direct message up to 5 strangers per day</li>
              <li>Unlimited messenging per day</li>
              <li>Send email to notify offline users</li>
              <li>Get notified when a friend post stories nearby</li>
            </ul>
          </div>

          <div className="column">
            <ul className="price">
              <li className="header">
                Starter
                <br />
                <span className="dollar">0</span>
                <p>per user per year</p>
                <div className="button_cont" align="center">
                  <a
                    className="btn"
                    style={{ boxSizing: "border-box" }}
                    target="_blank"
                    rel="nofollow noopener"
                    onClick={() => {
                      navigate(-1);
                    }}
                  >
                    Go Starter
                  </a>
                </div>
              </li>
              <li>
                <FiCheckCircle color="orchid" size="2.1em" />
              </li>
              <li>
                <FiCheckCircle color="gainsboro" size="2.1em" />
              </li>
              <li>
                <FiCheckCircle color="gainsboro" size="2.1em" />
              </li>
              <li>
                <FiCheckCircle color="gainsboro" size="2.1em" />
              </li>
            </ul>
          </div>

          <div className="column">
            <ul className="price">
              <li className="header">
                Premium
                <br />
                <span className="dollar">25</span>
                <p>per user per year</p>
                <div className="button_cont" align="center">
                  <a
                    className="btn"
                    style={{ boxSizing: "border-box" }}
                    target="_blank"
                    rel="nofollow noopener"
                    onClick={() => {
                      handleClick("premium");
                    }}
                  >
                    Go Premium
                  </a>
                </div>
              </li>
              <li>
                <FiCheckCircle color="orchid" size="2.1em" />
              </li>
              <li>
                <FiCheckCircle color="orchid" size="2.1em" />
              </li>
              <li>
                <FiCheckCircle color="gainsboro" size="2.1em" />
              </li>
              <li>
                <FiCheckCircle color="gainsboro" size="2.1em" />
              </li>
            </ul>
          </div>

          <div className="column">
            <ul className="price">
              <li className="header">
                Elite
                <br />
                <span className="dollar">50</span>
                <p>per user per year</p>
                <div className="button_cont" align="center">
                  <a
                    className="btn"
                    style={{ boxSizing: "border-box" }}
                    target="_blank"
                    rel="nofollow noopener"
                    onClick={() => {
                      handleClick("elite");
                    }}
                  >
                    Go Elite
                  </a>
                </div>
              </li>
              <li>
                <FiCheckCircle color="orchid" size="2.1em" />
              </li>
              <li>
                <FiCheckCircle color="orchid" size="2.1em" />
              </li>
              <li>
                <FiCheckCircle color="orchid" size="2.1em" />
              </li>
              <li>
                <FiCheckCircle color="orchid" size="2.1em" />
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* <button onClick={handleClick}>Purchase Membership</button> */}
    </div>
  );
}

export default Membership