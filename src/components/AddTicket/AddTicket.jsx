import React, { useState, useContext, useEffect } from "react";
import { FlightContext } from "../../Context/FlightContext";
import { passengerContext } from "../../Context/PassengerIDContext";
import * as Yup from "yup";
import Img1 from "../../Assets/imgs/Flight Booking-cuate.png";
import "./AddTicket.css";
import {  useParams } from "react-router-dom";
import axios from "axios";
import Ticket from "../Ticket/Ticket";
import { ticketContext } from "../../Context/TicketContext";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import photo from "../../Assets/imgs/Aircraft-rafiki.png";
export default function AddTicket() {
  const param = useParams();
  console.log("id", param);
  const basicPrice = 2000;
  const [price, setPrice] = useState(0);
  const [classs, setClasss] = useState("1");
  const [section, setSection] = useState("0");
  const [flightId, setFlightId] = useState("");
  const { passengerId } = useContext(passengerContext);
  const { AddTicket } = useContext(FlightContext);
  const [flightDetails, setFlightDetails] = useState({});
  const [isTicketBooked, setIsTicketBooked] = useState(false);
  const { SetTicketData } = useContext(ticketContext);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
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


 // console.log("id", passengerId);
  const handleSubmit = async (e) => {
    setIsTicketBooked(true);
    e.preventDefault();
    try {
      SetTicketData(
        await AddTicket(
          Number(passengerId),
          Number(param.id),
          Number(price),
          Number(section),
          Number(classs)
        )
      );
      console.log("Ticket added successfully!");
    } catch (error) {
      console.error("Failed to add ticket:", error.message);
    }
  };
  useEffect(() => {
    axios
      .get(`http://localhost:5269/api/Flight/${param.id}`, {
        param: {
          page: 1,
        },
      })
      .then((res) => setFlightDetails(res.data))
      .catch((error) => console.log(error));
  }, []);
  //console.log(flightDetails.data);
  console.log("Data passed to Ticket:", {
    flightDetails,
    price,
    classs,
    section,
    flightId,
  });

  return (
    <>
      <div className="container Ticketform mt-3 mb-3">
        {isTicketBooked ? (
          <>
            <Ticket
              TicketData={{ flightDetails, price, classs, section, flightId }}
            />
          </>
        ) : (
          <div className="container Ticketform mt-3 mb-3">
            <div className="row align-items-center justify-content-center">
              <div className="col-4">
                <div className="img-container">
                  <img
                    src={Img1}
                    alt="Airport"
                    className="img-fluid no-margin"
                  />
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
                        value={flightDetails?.data?.sourceAirportName}
                        readOnly
                      />
                    </div>
                    <div class="col">
                      <label htmlFor="inputState">Destination</label>
                      <input
                        type="text"
                        id="to"
                        className="form-control"
                        value={flightDetails?.data?.destinationAirportName}
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
                        value={flightDetails?.data?.departureTime.split("T")[0]}
                        readOnly
                      />
                    </div>
                    <div class="col">
                      <label htmlFor="inputState">Checkout Date</label>
                      <input
                        type="text"
                        id="checkout"
                        className="form-control"
                        value={flightDetails?.data?.arrivalTime.split("T")[0]}
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
                      <input
                        type="text"
                        id="flightIdSelect"
                        className="form-control"
                        value={flightDetails?.data?.id}
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="row my-3">
                    <div className="col">
                      <button 
                    onClick={handleSubmit}
                    type="submit"
                    className="btn btn-primary"
                  >
                    Book
                  </button>
                  </div>
                    <div className="col">
                  <Button variant="primary" onClick={handleShow}>
                    Cancel
                  </Button>

                  <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton></Modal.Header>
                    <Modal.Body>
                      <img src={photo} style={{ height: "250px" }} />
                      <p style={{ textAlign: "center" }}>Booked Cancel</p>{" "}
                    </Modal.Body>

                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleClose}>
                        Close
                      </Button>
                    </Modal.Footer>
                  </Modal>
                  </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>

    </>
  );
}
