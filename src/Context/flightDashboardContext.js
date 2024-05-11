import axios from "axios";
import { createContext,useState } from "react";
export let flightDashboardContext = createContext();
export default function FlightDashboardContextProvider(props) {
  let header = {
    token: localStorage.getItem("userToken"),
  };

  ////////////Delete Flight////////
  function CancelFlight(id) {
    return axios.delete(
      `http://localhost:5269/api/Flight/${id}`,

      { headers: header }
    );
  }
  ////////////Update Flight////////
  function UpdateFlight(id, count) {
    return axios.put(
      `http://localhost:5269/api/Flight?id=${id}`,
      {
        count: count,
      },
      { headers: header }
    );
  }
  return (
    <flightDashboardContext.Provider value={{ CancelFlight, UpdateFlight }}>
      {props.children}
    </flightDashboardContext.Provider>
  );
}
