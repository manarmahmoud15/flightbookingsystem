import axios from "axios";
import { createContext,useState } from "react";
export let flightDashboardContext = createContext();
export default function FlightDashboardContextProvider(props) {
  let BaseUrl = `https://ecommerce.routemisr.com`;
  let header = {
    token: localStorage.getItem("userToken"),
  };

  ////////////Delete Flight////////
  function CancelFlight(id) {
    return axios.delete(
      `${BaseUrl}/api/v1/cart/${id}`,

      { headers: header }
    );
  }
  ////////////Update Flight////////
  function UpdateFlight(id, count) {
    return axios.put(
      `${BaseUrl}/api/v1/cart/${id}`,
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
