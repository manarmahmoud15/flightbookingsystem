import React, { useContext } from "react";
import "./Ticket.css";
import { passengerContext } from "../../Context/PassengerIDContext";

export default function  Ticket(props) {
  const ticketData = props.TicketData?.flightDetails?.data;
  console.log(ticketData)
  const {passengerId} = useContext(passengerContext)

  return (
    <div className="container ticket my-5">
      <div className="row">
        <div className="col-1 left d-flex justify-content-between">
          <div className="text my-5">
            <h1 className="my-5">BOARDING</h1>
          </div>
        </div>
        <div className="col-7 center">
          <div className="text">
            <h1>
              <i
                className="fa-solid fa-plane text-warning mx-3"
                style={{ fontSize: "25px" }}
              ></i>{" "}
              {ticketData?.sourceAirportStateName}
            </h1>
          </div>
          <div className="ticket-info d-flex justify-content-between mx-auto">
            <div className="ticket-info-text float-start ">
              <h5>ID of Passenger:</h5>
              <p>{passengerId}</p>
              <h5>From:</h5>
              <p>{ticketData?.sourceAirportStateName}</p>
              <h5>To:</h5>
              <p>{ticketData?.destinationAirportStateName}</p>
            </div>
            <div className="barcode float-end me-2">
              <h5 className="px-3 py-2" style={{backgroundColor:'#669bbc', color:'white'}}>Boarding Till</h5>
              <h1>{ticketData?.duration}</h1>
              <img
                style={{ maxWidth: "100px" }}
                src="https://external-preview.redd.it/cg8k976AV52mDvDb5jDVJABPrSZ3tpi1aXhPjgcDTbw.png?auto=webp&s=1c205ba303c1fa0370b813ea83b9e1bddb7215eb"
                alt="QR code"
              />
            </div>
          </div>

          <hr style={{ fontWeight: "24px" }}></hr>
          <div className="d-flex justify-content-between mx-auto">
            <h5>departure Time</h5>
            <h5>arrival Time</h5>
            <h5>Flight</h5>
            {/* <h5 className="me-2">Seat</h5> */}
          </div>
          <div className="d-flex justify-content-between mx-auto">
            <p>{ticketData?.departureTime.split("T")[0]}</p>
            <p>{ticketData?.arrivalTime.split("T")[0]}</p>
            <p>{ticketData?.id}</p>
            {/* <p className="me-2">08 B</p> */}
          </div>
          <hr></hr>
        </div>
        <div className="col-4 right">
          <div className="text">
            <h2>
            {ticketData?.sourceAirportStateName}

              <i
                className="fa-solid fa-plane text-warning mx-3"
                style={{ fontSize: "20px" }}
              ></i>
            </h2>
          </div>
          <div className="ticket-info d-flex justify-content-between mx-auto">
            <div className="ticket-info-text float-start ms-2 ">
              <h5>ID of Passenger:</h5>
              <p>{passengerId}</p>
              <h5>From:</h5>
              <p>{ticketData?.sourceAirportStateName}</p>
              <h5>To:</h5>
              <p>{ticketData?.destinationAirportStateName}</p>
            </div>
          </div>
          <div className="ticket-info d-flex justify-content-between mx-auto ms-2">
            <div>
              <h5>departure Time</h5>
              <p>{ticketData?.departureTime.split("T")[0]}</p>
            </div>
            <div className="divider">
              <h1>/</h1>
            </div>
            <div>
              <h5>arrival Time</h5>
              <p>{ticketData?.arrivalTime.split("T")[0]}</p>
            </div>
            <div className="divider">
              <h1>/</h1>
            </div>
            <div>
              <h5>Flight</h5>
              <p>{ticketData?.id}</p>
            </div>
          </div>

          <div className="botom mt-2">
            <div className="barcode float-start ms-2 ">
              <h5 className="px-4 py-2" style={{backgroundColor:'#669bbc', color:'white'}} >Boarding Till</h5>
              <h2>{ticketData?.duration}</h2>
            </div>
            {/* <div className="barcode seat-info float-end p-2 ms-2">
              <h5>Seat</h5>
              <p>08 B</p>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}