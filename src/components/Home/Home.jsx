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
  const data = useSelector((state) => state.data);
  let dispatch = useDispatch();
  const size = data.length;
  // console.log(data);
  const [adultCount, setAdultCount] = useState(0);
  const [childCount, setChildCount] = useState(0);
  const [flights, setFlights] = useState([]);
  const [selectedFlight, setSelectedFlight] = useState(null);

  const handleAdultIncrement = () => {
    setAdultCount(adultCount + 1);
    SetBookingData({
      ...BookingData,
      adults: adultCount + 1,
      children: childCount,
    });
  };

  const handleAdultDecrement = () => {
    if (adultCount > 0) {
      setAdultCount(adultCount - 1);
      SetBookingData({
        ...BookingData,
        adults: adultCount - 1,
        children: childCount,
      });
    }
  };

  const handleChildIncrement = () => {
    setChildCount(childCount + 1);
    SetBookingData({
      ...BookingData,
      adults: adultCount,
      children: childCount + 1,
    });
  };

  const handleChildDecrement = () => {
    if (childCount > 0) {
      setChildCount(childCount - 1);
      SetBookingData({
        ...BookingData,
        adults: adultCount,
        children: childCount - 1,
      });
    }
  };

  const [BookingData, SetBookingData] = useState({});
  // const handleChange = (e) => {
  //   SetBookingData({
  //     ...BookingData,
  //     [e.target.name]: e.target.value,
  //     adults: adultCount,
  //     children: childCount,
  //   });
  // };
  // const handleBook = (e) => {
  //   e.preventDefault();
  //   // console.log(e.target.value)
  //   if (Object.keys(BookingData).length === 6) {
  //     dispatch(makeBooking({ ...BookingData, id: size + 1 }));
  //   } else {
  //     alert("please select data properly !");
  //   }
  // };
  // console.log(BookingData);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5269/api/Flight");
        setFlights(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.error("Failed to fetch flights:", error);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    if (selectedFlight) {
      SetBookingData({
        ...BookingData,
        from: selectedFlight.sourceAirportName,
        to: selectedFlight.destinationAirportName,
        checkin: selectedFlight.departureTime.split("T")[0],
        checkOut: selectedFlight.arrivalTime.split("T")[0],
      });
    }
  }, [selectedFlight]);

  const handleFlightChange = (e) => {
    const flightId = e.target.value;
    const flight = flights.find(
      (f) => f.sourceAirportNum.toString() === flightId
    );
    setSelectedFlight(flight);
  };

  const handleChange = (e) => {
    SetBookingData({
      ...BookingData,
      [e.target.name]: e.target.value,
      adults: adultCount,
      children: childCount,
    });
  };

  const handleBook = (e) => {
    e.preventDefault();
    if (Object.keys(BookingData).length === 6) {
      dispatch(
        makeBooking({ ...BookingData, id: selectedFlight?.sourceAirportNum })
      );
    } else {
      alert("please select data properly !");
    }
  };

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
                      <h6>Destination Form</h6>
                      <div>
                        <select
                          required
                          // onChange={(e) => handleChange(e)}
                          onChange={handleFlightChange}
                          value={selectedFlight?.sourceAirportNum || ""}
                          name="from"
                          id="from"
                          style={{ border: "none" }}
                          className="my-1"
                        >
                          {flights.map((flight ,index) => (
                            <option
                              key={index}
                              value={flight.sourceAirportNum}
                            >
                              {flight.sourceAirportName}
                            </option>
                          ))}
                        </select>
                      </div>
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
                      <div>
                        <select
                          required
                          // onChange={(e) => handleChange(e)}
                          onChange={handleFlightChange}
                          value={selectedFlight?.destinationAirporNum || ""}
                          name="to"
                          id="to"
                          style={{ border: "none" }}
                          className="my-1"
                        >
                          {flights.map((flight ,index) => (
                            <option
                            key={index}
                              value={flight.destinationAirporNum}
                            >
                              {flight.destinationAirportName}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="searchInput flex">
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
                            {/* Separate row for children */}
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
                </div>

                <div className="searchInput flex">
                  <div className="singleInput flex">
                    <div className="iconDiv">
                      <IoCalendarNumber className="icon" />
                    </div>
                    <div className="texts">
                      <h4>Check In</h4>
                      <select
                        name="checkin"
                        value={BookingData.checkin}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select a Check-in Date</option>
                        {flights.map((flight, index) => (
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
                        name="checkin"
                        value={BookingData.checkOut}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select a Check-in Date</option>
                        {flights.map((flight, index) => (
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
