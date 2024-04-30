import React from "react";
import FooterVideo from "../../assets/Videos/myvideofooter.mp4";
import Video2 from "../../assets/Videos/Video2.mp4";
import { FiChevronRight, FiSend } from "react-icons/fi";
// import  "../Footer/Footer.module.scss"
import "../Footer/Footer.css";
import { MdOutlineTravelExplore } from "react-icons/md";
import {
  AiOutlineFacebook,
  AiOutlineInstagram,
  AiOutlineShoppingCart,
  AiOutlineTwitter,
  AiOutlineYoutube,
} from "react-icons/ai";

export default function Footer() {
  return (
    <section className="footer">
      <div className="videoDiv">
        <video
          className="w-100"
          src={Video2}
          loop
          autoPlay
          muted
          type="video/mp4"
        ></video>
      </div>
      <div className="secContent container">
        <div className="contactDiv flex">
          <div className="text">
            <small>KEEP IN TOUCH</small>
            <h2>Travel With Us</h2>
          </div>
          <div className="inputDiv flex">
            <input type="text" placeholder="Enter Email Address" />
            <button className="btn flex mt-3" type="submit">
              Send <FiSend className="icon" />
            </button>
          </div>
        </div>
        <div className="footerCard flex">
          <div className="footerIntro ps-3 flex">
            <div className="logoDiv">
              <a href="#" className=" logo flex">
                <MdOutlineTravelExplore className="icon" />
                Travel.
              </a>
            </div>
            <div className="footerParagraph">
              Make your journey Unforgettable, join us in Our Social media Platforms for more informations
            </div>
            <div className="footerSocial d-flex justify-content-center align-items-center">
              <AiOutlineTwitter className="icon me-3 " />
              <AiOutlineShoppingCart className="icon me-3 " />
              <AiOutlineInstagram className="icon me-2" />
              <AiOutlineYoutube className="icon" />
            </div>
          </div>
        
          <div className="footerLinks d-flex justify-content-space-between grid">
              {/* Group one */}
            <div className="LinkGroup">
              <span className="groupTitle">OUR AGENCY</span>
              <li className="footerList">
                <FiChevronRight className="icon" />
                Services
              </li>
              <li className="footerList">
                <FiChevronRight className="icon" />
                Insurance
              </li>
              <li className="footerList">
                <FiChevronRight className="icon" />
                Agency
              </li>
              <li className="footerList">
                <FiChevronRight className="icon" />
                Tourism
              </li>
              <li className="footerList">
                <FiChevronRight className="icon" />
                Payment
              </li>
            </div>
              {/* Group Two */}
            <div className="LinkGroup">
              <span className="groupTitle">PARTNERS</span>
              <li className="footerList">
                <FiChevronRight className="icon" />
               SkyLight
              </li>
              <li className="footerList">
                <FiChevronRight className="icon" />
                Renocars
              </li>
              <li className="footerList">
                <FiChevronRight className="icon" />
               Trivigo
              </li>
              <li className="footerList">
                <FiChevronRight className="icon" />
               Renconters
              </li>
              <li className="footerList">
                <FiChevronRight className="icon" />
               TripleAdvisors
              </li>
            </div>
            {/* Group Three */}
            <div className="LinkGroup">
              <span className="groupTitle">LAST FLIGHTS</span>
              <li className="footerList">
                <FiChevronRight className="icon" />
               London
              </li>
              <li className="footerList">
                <FiChevronRight className="icon" />
                Egypt
              </li>
              <li className="footerList">
                <FiChevronRight className="icon" />
              South Korea
              </li>
              <li className="footerList">
                <FiChevronRight className="icon" />
              Indonesia
              </li>
              <li className="footerList">
                <FiChevronRight className="icon" />
            Portugal
              </li>
            </div>
          </div>
      
        </div>
      </div>
    </section>
  );
}
