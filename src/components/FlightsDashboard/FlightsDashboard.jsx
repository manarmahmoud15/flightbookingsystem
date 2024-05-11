import React, { useContext, useEffect, useState } from "react";
import "./FlightsDashboard.module.css";
import axios from "axios";
import { flightDashboardContext } from "../../Context/flightDashboardContext";
export default function FlightsDashboard() {
  let { CancelFlight } = useContext(flightDashboardContext);
  const [Flights, setFlights] = useState([]);
  const [role ,setRole] = useState('')
  useEffect(() => {
    axios
      .get(`http://localhost:5269/api/Flight`)
      .then((res) => {
        if (res.data && Array.isArray(res.data.data)) {
          setFlights(res.data.data);
          console.log(res.data.data);
        } else {
          throw new Error("Invalid response data format");
        }
      })
      .catch((error) => console.log(error));
  }, []);
  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get("http://localhost:5269/api/Role");
        setRole(data.data);
        console.log(data.data)
      } catch (error) {
        console.error("Failed to fetch flights:", error);
      }
    }
    fetchData();
  }, []);
  ///Remove Flight///
  async function removeFlight(id) {
    let { data } = await CancelFlight(id);
    console.log(data.data);
    setFlights(data.data);
    console.log(data.data.data);
    setFlights(data.data.data);
  }
  return (
    
    <section className="intro shadow-3-strong">
      {
      role.name == "Admin" ?<div className="bg-image h-100">
      <div className="mask d-flex align-items-center h-100">
        <div className="container mt-3 mb-5 ">
          <div className="row justify-content-center">
            <div className="col-12">
              <div
                className="card shadow-3-strong"
                style={{ "background-color": " #f5f7fa" }}
              >
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table table-borderless mb-0">
                      <div
                        className="m-3"
                        style={{ backgroundColor: "blue !important" }}
                      ></div>
                      <thead>
                        <tr style={{ backgroundColor: "gray" }}>
                          <th scope="col">
                            <i
                              className="fa-solid fa-plane text-warning mx-3"
                              style={{ fontSize: "20px" }}
                            ></i>
                            Flight Name
                          </th>
                          <th scope="col">From(country)</th>
                          <th scope="col">To(Destination)</th>
                          <th scope="col">Duration</th>
                          <th scope="col">Status</th>
                          <th scope="col">Close</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Flights.map((flight) => (
                          <React.Fragment key={flight._id}>
                            <tr>
                              <td
                                className="fw-bold"
                                style={{ color: "hsl(199, 100%, 33%)" }}
                              >
                                <i
                                  className="fa-solid fa-plane text-warning mx-3"
                                  style={{ fontSize: "20px" }}
                                ></i>

                                {flight.sourceAirportName}
                                {flight.name}
                              </td>
                              <td>{flight.sourceAirportStateName}</td>
                              <td>{flight.destinationAirportStateName}</td>
                              <td>{flight.duration}</td>

                              <td>
                                {flight.isActive ? (
                                  <span
                                    className="badge badge-active p-1"
                                    style={{
                                      backgroundColor: "green",
                                      color: "white",
                                    }}
                                  >
                                    Active
                                  </span>
                                ) : (
                                  <span
                                    className="badge badge-inactive p-1"
                                    style={{
                                      backgroundColor: "red",
                                      color: "white",
                                    }}
                                  >
                                    Inactive
                                  </span>
                                )}
                              </td>
                              <td>
                                <button
                                  type="button"
                                  className="btn-danger btn-md px-2 py-1"
                                  style={{
                                    backgroundColor: "#ff3333",
                                    borderRadius: "9px",
                                    border: "none",
                                    color: "white",
                                  }}
                                  onClick={() => {
                                    removeFlight(flight.destinationAirportId);
                                  }}
                                >
                                  Cancel
                                </button>
                              </td>
                            </tr>
                          </React.Fragment>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div> 
    : <p>Sorry , You Are not Admin</p>
    }
      
    </section>
  );
}
