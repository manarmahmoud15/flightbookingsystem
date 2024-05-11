import React, { useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import AppNavbar from "../Navbar/Navbar";
import { userContext } from "../../Context/TokenContext";
import Footer from "../Footer/Footer";
import { passengerContext } from "../../Context/PassengerIDContext";
import axios from "axios";
export default function Layout() {
  let { userToken, UserToken } = useContext(userContext);

  const { setUserToken } = useContext(userContext);
  useEffect(() => {
    if (localStorage.getItem("userToken") !== null) {
      setUserToken(localStorage.getItem("userToken"));
    }
  }, []);
  const { setPassengerID } = useContext(passengerContext);
  useEffect(() => {
    if (localStorage.getItem("passengerId") !== null) {
      setPassengerID(localStorage.getItem("passengerId"));
      
    }
  }, []);
  // const [system,setSystem] = useState('');
  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       const { data } = await axios.get("http://localhost:5269/api/System");
  //       setSystem(data.data);
  //       console.log(data)
  //     } catch (error) {
  //       console.error("Failed to fetch flights:", error);
  //     }
  //   }
  //   fetchData();
  // }, []);
  return (
    <div>
      <AppNavbar />
      <div>
        <Outlet />
      </div>
      {userToken !== null ? <Footer /> : ""}
    </div>
  );
}
