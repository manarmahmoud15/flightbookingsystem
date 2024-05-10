import React, { useEffect, useState } from "react";
import video from "../../Assets/Videos/205873.mp4";
import { GrLocation } from "react-icons/gr";
import { IoCalendarNumber } from "react-icons/io5";
import { RiAccountPinCircleLine } from "react-icons/ri";
import Discount from "../TopTraveller/Discount";
import MostVisited from "../MostVisited/MostVisited";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { MdOutlineFamilyRestroom } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
// import { object } from "yup";
import { makeBooking } from "../../redux/actions";
import ShowFlight from "../ShowFlight/ShowFlight";
import axios from "axios";

export default function Home() {
  const dispatch = useDispatch();
  const [flights, setFlights] = useState([]);
  const [selectedSource, setSelectedSource] = useState("");
  const [selectedDestination, setSelectedDestination] = useState("");
  const [selectedCheckIn, setSelectedCheckIn] = useState("");
  const [selectedCheckOut, setSelectedCheckOut] = useState("");
  // const [adultCount, setAdultCount] = useState(0);
  // const [childCount, setChildCount] = useState(0);
  const [bookingData, setBookingData] = useState({});

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get("http://localhost:5269/api/Flight");
        setFlights(data.data);
      } catch (error) {
        console.error("Failed to fetch flights:", error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    // console.log("Selected values:", { selectedSource, selectedDestination, selectedCheckIn, selectedCheckOut });
    if (selectedSource && selectedDestination && selectedCheckIn && selectedCheckOut) {
      const checkInDate = new Date(selectedCheckIn).toDateString();
      const checkOutDate = new Date(selectedCheckOut).toDateString();
      const selectedFlight = flights.find(flight =>
        flight.sourceAirportNum.toString() === selectedSource &&
        flight.destinationAirportNum.toString() === selectedDestination &&
        new Date(flight.departureTime).toDateString() === checkInDate &&
        new Date(flight.arrivalTime).toDateString() === checkOutDate
      );
  
      if (selectedFlight) {
        setBookingData({
          from: selectedFlight.sourceAirportName,
          to: selectedFlight.destinationAirportName,
          checkin: selectedFlight.departureTime.split("T")[0],
          checkout: selectedFlight.arrivalTime.split("T")[0],
        });
      } else {
        console.log("No matching flight found");
        setBookingData({});
      }
    } else {
      setBookingData({});
    }
  }, [selectedSource, selectedDestination, selectedCheckIn, selectedCheckOut, flights]);
  

  // const handleIncrement = (type) => {
  //   if (type === "adult") {
  //     setAdultCount(adultCount + 1);
  //   } else {
  //     setChildCount(childCount + 1);
  //   }
  // };

  // const handleDecrement = (type) => {
  //   if (type === "adult" && adultCount > 0) {
  //     setAdultCount(adultCount - 1);
  //   } else if (type === "child" && childCount > 0) {
  //     setChildCount(childCount - 1);
  //   }
  // };

  const handleBook = (e) => {
    e.preventDefault();
    if (Object.keys(bookingData).length === 4) {
      dispatch(makeBooking({ ...bookingData, id: new Date().getTime() }));
    } else {
      alert("Please select all fields properly!");
      console.log(bookingData)
    }
  };
  const sourceChange = (e) => {
    e.preventDefault ();
    setSelectedSource(e.target.value);
  setSelectedDestination(""); 
  setSelectedCheckIn(""); 
  setSelectedCheckOut(""); 
  };
  const destinationChange = (e) => {
    setSelectedDestination(e.target.value); 
    setSelectedCheckIn(""); 
    setSelectedCheckOut(""); 
  }
  const checkInChange = (e) => {
    setSelectedCheckIn(e.target.value); 
  }
  const checkOutChange = (e) => {
    setSelectedCheckOut(e.target.value); 
  }
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
          <form className="search container section">
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
                      <h6>Destination From</h6>
                      <select
                        required
                        onChange={(e) => sourceChange(e)}
                        
                        value={selectedSource}
                        name="from"
                        id="from"
                        style={{ border: "none" }}
                        className="my-1"
                      >
                        <option value="">Select Source Airport</option>
                        {flights.map((flight) => (
                          <option
                            key={flight.sourceAirportNum}
                            value={flight.sourceAirportNum}
                          >
                            {flight.sourceAirportName}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="searchInput flex">
                  <div className="singleInput flex">
                    <div className="iconDiv">
                      <GrLocation className="icon" />
                    </div>
                    <div className="texts">
                      <h6>Destination To</h6>
                      <select
                        required
                        onChange={(e) => destinationChange(e)}
                        value={selectedDestination}
                        name="to"
                        id="to"
                        style={{ border: "none" }}
                        className="my-1"
                        disabled={!selectedSource}
                      >
                        <option value="">Select Destination Airport</option>
                        {flights
                          .filter(
                            (flight) =>
                              flight.sourceAirportNum.toString() ===
                              selectedSource
                          )
                          .map((flight) => (
                            <option
                              key={flight.destinationAirportNum}
                              value={flight.destinationAirportNum}
                            >
                              {flight.destinationAirportName}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>
                </div>
                {/* <div className="searchInput flex">
                  <div className="singleInput flex">
                    <div className="iconDiv">
                      <MdOutlineFamilyRestroom className="icon" />
                    </div>
                    <div className="texts">
                      <h4>Travels</h4>
                      <Popup
                        trigger={
                          <button
                            onChange={(e) => handleChange(e)}
                            type="button"
                            name="travels"
                            id="travels"
                            style={{
                              border: "none",
                              backgroundColor: "white",
                            }}
                          >
                            Adults : {adultCount} , Child :{childCount}
                          </button>
                        }
                        position="bottom center"
                        className="w-100"
                      >
                        <div className="flex-column">
                          <div className="flex-row my-3 mx-3">
                            <p>Adults</p>
                            <div className="counter-buttons">
                              <button
                                className="btn btn-outline-success text-light"
                                onClick={handleAdultIncrement}
                                onChange={(e) => handleChange(e)}
                              >
                                +
                              </button>
                              <span className="mx-2">{adultCount}</span>
                              <button
                                className="btn btn-outline-success text-light"
                                onClick={handleAdultDecrement}
                                onChange={(e) => handleChange(e)}
                              >
                                -
                              </button>
                            </div>
                          </div>
                          <hr />
                          <div className="flex-row mx-3">
                            {" "}
                           
                            <p>Childs</p>
                            <div className="counter-buttons">
                              <button
                                className="btn btn-outline-success text-light"
                                onClick={handleChildIncrement}
                                onChange={(e) => handleChange(e)}
                              >
                                +
                              </button>
                              <span className="mx-2">{childCount}</span>
                              <button
                                className="btn btn-outline-success text-light"
                                onClick={handleChildDecrement}
                                onChange={(e) => handleChange(e)}
                              >
                                -
                              </button>
                            </div>
                          </div>
                        </div>
                      </Popup>
                    </div>
                  </div>
                </div> */}

                <div className="searchInput flex">
                  <div className="singleInput flex">
                    <div className="iconDiv">
                      <IoCalendarNumber className="icon" />
                    </div>
                    <div className="texts">
                      <h4>Check In</h4>
                      <select
                        name="checkin"
                        id="checkin"
                        onChange={(e) => checkInChange(e)}
                        value={selectedCheckIn}
                        style={{ border: "none" }}
                        className="my-1"
                        disabled={!selectedDestination}
                        required
                      >
                        <option value="">Select a Check-in Date</option>
                        {flights
                          .filter(
                            (flight) =>
                              flight.destinationAirportNum.toString() ===
                                selectedDestination &&
                              flight.sourceAirportNum.toString() === selectedSource
                          )
                          .map((flight, index) => (
                            <option
                              key={index}
                              value={flight.departureTime.split("T")[0]}
                            >
                              {new Date(
                                flight.departureTime
                              ).toLocaleDateString()}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="searchInput flex">
                  <div className="singleInput flex">
                    <div className="iconDiv">
                      <IoCalendarNumber
                        className="icon"
                        style={{ color: "grey" }}
                      />
                    </div>
                    <div className="texts">
                      <h4>Check Out</h4>
                      <select
                        name="checkout"
                        onChange={(e) => checkOutChange(e)}
                        value={selectedCheckOut}
                        style={{ border: "none" }}
                        className="my-1"
                        disabled={!selectedDestination}
                        required
                      >
                        <option value="">Select a Check-in Date</option>
                        {flights
                          .filter(
                            (flight) =>
                              flight.destinationAirportNum.toString() ===
                              selectedDestination &&
                              flight.sourceAirportNum.toString() === selectedSource
                          )
                          .map((flight, index) => (
                            <option
                              key={index}
                              value={flight.arrivalTime.split("T")[0]}
                            >
                              {new Date(
                                flight.departureTime
                              ).toLocaleDateString()}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              ;
              <button
                className="btn btnBlock "
                onClick={(e) => handleBook(e)}
                type="submit"
                style={{ borderRadius: "50px", color: "white" }}
              >
                Search Flight
              </button>
            </div>
          </form>
        </div>
      </section>
      <ShowFlight />
      <MostVisited />
      <Discount />
    </>
  );
}
