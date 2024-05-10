import React, { useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";
import AppNavbar from "../Navbar/Navbar";
import { userContext } from "../../Context/TokenContext";
import Footer from "../Footer/Footer";
export default function Layout() {
  let { userToken, UserToken } = useContext(userContext);

  const { setUserToken } = useContext(userContext);
  useEffect(() => {
    if (localStorage.getItem("userToken") !== null) {
      setUserToken(localStorage.getItem("userToken"));
    }
  }, []);
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
