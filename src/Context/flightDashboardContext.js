import axios from "axios";
import { createContext} from "react";
export let flightDashboardContext = createContext();
export default function FlightDashboardContextProvider(props) {
  let header = {
    token: localStorage.getItem("userToken"),
  };

  function CancelFlight(id) {
    return axios.delete(
      `http://localhost:5269/api/Flight/${id}`,

      { headers: header }
    );
  }
  ////////////Update Flight////////
  function UpdateFlight(id) {
    return axios.put(
      `http://localhost:5269/api/Flight?id=${id}`,
      { headers: header }
    );
  }
  return (
    <flightDashboardContext.Provider value={{ CancelFlight, UpdateFlight }}>
      {props.children}
    </flightDashboardContext.Provider>
  );
}
