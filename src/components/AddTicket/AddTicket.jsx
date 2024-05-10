import React from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage, useFormik } from "formik";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { userContext } from "../../Context/TokenContext";
import { FlightContext } from "../../Context/FlightContext";
import { passengerContext } from "../../Context/PassengerIDContext";

export default function AddTicket() {
  const basicPrice = 2000;
  const [price, setPrice] = useState(0);
  const[classs , setClasss] = useState('1')
  const [section, setSection] = useState("0");
  const [flightId, setFlightId] = useState("2");
  const {passengerId} = useContext(passengerContext)
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

  const { AddTicket } = useContext(FlightContext);

  const validationSchema = Yup.object({
    classs: Yup.string().required("Class is required"),
    section: Yup.string().required("Section is required"),
    passengerId: Yup.string().required("Passenger ID is required"),
    flightId: Yup.string().required("Flight ID is required"),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await AddTicket(Number(passengerId), Number(flightId), Number(price), Number(section), Number(classs));
      console.log("Ticket added successfully!");
    } catch (error) {
      console.error("Failed to add ticket:", error.message);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group col-md-4">
            <label htmlFor="class">Class</label>
            <select
              name="Class"
              value={classs}
              onChange={(e) => setClasss(e.target.value)}
              className="form-control"
            >
              <option value="0">Economy</option>
              <option value="1">VIP</option>
            </select>
          </div>
          <div className="form-group col-md-4">
            <label htmlFor="price">Price</label>
            <input
              name="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="form-control"
              type="text"
              disabled
            />
          </div>
          <div className="form-group col-md-4">
            <label htmlFor="section">Section</label>
            <select
              name="Section"
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
          <div className="form-group col-md-4">
            <label htmlFor="flightid">FlightId</label>
            <select
              name="FlightId"
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
  );
}
