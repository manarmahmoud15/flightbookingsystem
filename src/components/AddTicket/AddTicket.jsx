import React, { useState, useContext, useEffect } from "react";
import { FlightContext } from "../../Context/FlightContext";
import { passengerContext } from "../../Context/PassengerIDContext";
import * as Yup from "yup";
import Img1 from "../../Assets/imgs/Airporrt.webp";
import "./AddTicket.css";
import { SearchFlightContext } from "../../Context/SearchFlightContext";

export default function AddTicket() {
  const basicPrice = 2000;
  const [price, setPrice] = useState(0);
  const [classs, setClasss] = useState("1");
  const [section, setSection] = useState("0");
<<<<<<< HEAD
  const [flightId, setFlightId] = useState("1");
  const {passengerId} = useContext(passengerContext)
=======
  const [flightId, setFlightId] = useState("2");
  const { passengerId } = useContext(passengerContext);
  const { AddTicket } = useContext(FlightContext);
  const { searchData, selectFlight } = useContext(SearchFlightContext);

>>>>>>> b034af6528377f12786db2e455a8b2d7c2429349
  useEffect(() => {
    switch (classs) {
      case "0":
        setPrice(basicPrice);
        break;

      case "1":
        setPrice(basicPrice * 1.5);
        break;

      default:
        break;
    }
  }, [classs]);

  const validationSchema = Yup.object({
    classs: Yup.string().required("Class is required"),
    section: Yup.string().required("Section is required"),
    passengerId: Yup.string().required("Passenger ID is required"),
    flightId: Yup.string().required("Flight ID is required"),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await AddTicket(
        Number(passengerId),
        Number(flightId),
        Number(price),
        Number(section),
        Number(classs)
      );
      console.log("Ticket added successfully!");
    } catch (error) {
      console.error("Failed to add ticket:", error.message);
    }
  };

  return (
    <div className="container Ticketform mt-3 mb-3">
      <div className="row align-items-center justify-content-center">
        <div className="col-4">
          <div className="img-container">
            <img src={Img1} alt="Airport" className="img-fluid no-margin" />
          </div>
        </div>
        <div className="col-7">
          <form onSubmit={handleSubmit}>
            <div class="row">
              <div class="col">
                <label htmlFor="inputState">From</label>
                <input
                  type="text"
                  id="from"
                  className="form-control"
                  value={searchData.source}
                  readOnly
                />
              </div>
              <div class="col">
                <label htmlFor="inputState">Destination</label>
                <input
                  type="text"
                  id="to"
                  className="form-control"
                  value={searchData.destination}
                  readOnly
                />
              </div>
            </div>
            <div class="row mt-2">
              <div class="col">
                <label htmlFor="inputState">Checkin Date</label>
                <input
                  type="text"
                  id="checkin"
                  className="form-control"
                  value={searchData.checkIn}
                  readOnly
                />
              </div>
              <div class="col">
                <label htmlFor="inputState">Checkout Date</label>
                <input
                  type="text"
                  id="checkout"
                  className="form-control"
                  value={searchData.checkOut}
                  readOnly
                />
              </div>
            </div>

            <div className="row">
              <div className="col">
                <label htmlFor="inputState">Class</label>
                <select
                  id="classSelect"
                  value={classs}
                  onChange={(e) => setClasss(e.target.value)}
                  className="form-control"
                >
                  <option value="0">Economy</option>
                  <option value="1">VIP</option>
                </select>
              </div>
              <div className="col">
                <label htmlFor="inputState">Section</label>
                <select
                  id="sectionSelect"
                  value={section}
                  onChange={(e) => setSection(e.target.value)}
                  className="form-control"
                >
                  <option value="0">Front</option>
                  <option value="1">Middle</option>
                  <option value="2">Back</option>
                  <option value="3">Window</option>
                </select>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <label htmlFor="inputState">Price</label>
                <input
                  type="text"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="form-control"
                  placeholder="Price"
                />
              </div>
              <div className="col">
                <label htmlFor="inputState">FlightId</label>
                <select
                  id="flightIdSelect"
                  value={flightId}
                  onChange={(e) => setFlightId(e.target.value)}
                  className="form-control"
                >
                  <option value="2">2</option>
                </select>
              </div>
            </div>
            <button type="submit" className="btn btn-primary">
              Book
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
