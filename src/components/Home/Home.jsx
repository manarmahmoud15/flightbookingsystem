import React from "react";
import video from "../../Assets/Videos/205873.mp4";
import { GrLocation } from "react-icons/gr";
import { HiFilter } from "react-icons/hi";
import { FaFacebook, FaInstagram, FaTripadvisor } from "react-icons/fa";
import { FaListUl } from "react-icons/fa6";
import { TbApps } from "react-icons/tb";
import { IoCalendarNumber } from "react-icons/io5";
import { RiAccountPinCircleLine } from "react-icons/ri";
import Discount from "../TopTraveller/Discount";
import MostVisited from "../MostVisited/MostVisited";

export default function Home() {
  return (
     <>
      <section className="home">
      <div className="overlay"></div>
      <video
        src={video}
        muted
        autoPlay
        loop
        type="video/mp4"
        role="presentation"
      ></video>
      <div className="HomeContent container">
        <div className="textDiv">
          <span className="smalltext">Our Packages</span>
          <h1 className="homeTitle">Search Your Holidays</h1>
        </div>
        {/* <div className="cardDiv d-flex ">
          <div className="destinationInput">
            <label htmlFor='city'>Search Your destination:</label>
            <div className="input flex">
              <input id="city" type='text' placeholder='Enter name here ...'/>
              <GrLocation className='icon'/>
            </div>
          </div>
          <div className="dateInput">
            <label htmlFor='date'>Select Your date:</label>
            <div className="input flex">
              <input id="date" type='date' placeholder='Enter name here ...'/>
            </div>
          </div>
          <div className="priceInput">
            <div className='d-flex'>
            <label htmlFor='price' className='mx-3'>Max Price:</label>
            <div className="label_total mx-5 flex">
              <h3 className="total ">$5000</h3>
            </div>
              </div>
           
            <div className="input flex">
              <input id="price" type="range" max={5000} min={1000} />
            </div>
          </div>
          <div className="searchOptions flex">
            <HiFilter className='icon'/>
            <span>More Filters</span>
          </div>
        </div>
        <div className="homeFooterIcons flex">
          <div className="rightIcons">
          <FaInstagram className="icon" />
          <FaFacebook className="icon" /> 
          <FaTripadvisor className="icon" />
          </div>
          <div className="leftIcons">
          <FaListUl className="icon" />
          <TbApps />

          </div>
        </div> */}

        <div className="search container section">
          <div className="sectioncontainer ">
            <div className="btnBox">
            <div className="btns">
              <div className="singleBtn">
                <span>Economy</span>
              </div>
              <div className="singleBtn">
                <span>Business Class</span>
              </div>
              <div className="singleBtn">
                <span>First Class</span>
              </div>
            </div>
            </div>
            
            <div className="flex">
              <div className="searchInput flex">
                <div className="singleInput flex">
                  <div className="iconDiv">
                    <GrLocation className="icon" />
                  </div>
                  <div className="texts">
                    <h4>Location</h4>
                    <input type="text" placeholder="where do you want to go?" />
                  </div>
                </div>
              </div>

              <div className="searchInput flex">
                <div className="singleInput flex">
                  <div className="iconDiv">
                    <RiAccountPinCircleLine className="icon" />
                  </div>
                  <div className="texts">
                    <h4>Travels</h4>
                    <input type="text" placeholder="Add guests" />
                  </div>
                </div>
              </div>

              <div className="searchInput flex">
                <div className="singleInput flex">
                  <div className="iconDiv">
                    <IoCalendarNumber className="icon"  style={{color:'grey'}}/>
                  </div>
                  <div className="texts">
                    <h4>Check In</h4>
                    <input type="date" placeholder="Add date"style={{color:'grey'}} />
                  </div>
                </div>
              </div>

              <div className="searchInput flex">
                <div className="singleInput flex">
                  <div className="iconDiv">
                    <IoCalendarNumber className="icon"style={{color:'grey'}} />
                  </div>
                  <div className="texts">
                    <h4>Check Out</h4>
                    <input type="date" placeholder="Add date" style={{color:'grey'}} />
                  </div>
                </div>
              </div>

            </div>
            <button className="btn btnBlock" style={{borderRadius: "50px" , color:'white'}}>Search Flight</button>


          </div>
        </div>
      </div>
      
    </section>
    <MostVisited/>
    <Discount/> 
     </>
   
  );
}
