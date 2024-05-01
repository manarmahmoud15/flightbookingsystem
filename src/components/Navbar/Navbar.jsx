// import React, { useContext } from "react";
import { useContext } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { MdOutlineTravelExplore } from "react-icons/md";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { userContext } from "../../Context/TokenContext";
import { Link, useNavigate } from "react-router-dom";
// import { counterContext } from "../../Context/counter";

export default function AppNavbar() {
  let { userToken, setUserToken } = useContext(userContext);
  // let {counter} = useContext(counterContext);

  let navigate = useNavigate();
  function logOut() {
    localStorage.removeItem("userToken");
    setUserToken(null);
    navigate("/signin");
  }
  return (
    <Navbar style={{ backgroundColor: "white", color: "black" }} expand="lg">
      <Container>
        <Navbar.Brand href="#home">
          <a style={{textDecoration: 'none'}} className="fw-bold logo flex">
            {" "}
            <h1>
              <MdOutlineTravelExplore className="icon" />
              Travel
            </h1>{" "}
          </a>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {userToken !== null ? (
            <Nav className="me-auto">
              <Link to="home" className="nav-link">Home </Link>
              <Link to="MostVisited" className="nav-link">MostVisited</Link>
              <Link to="#" className="nav-link">About</Link>
              <Link to="#" className="nav-link">Offers</Link>
              <Link to="#" className="nav-link">Seats</Link>
              <Link to="#" className="nav-link">Destination</Link>
              <Link to="discount" className="nav-link">Discounts</Link>


            </Nav>
          ) : (
            ""
          )}
          {userToken === null ? (
            <Nav className="ms-auto">
              <Link to="signup"  className="btn log text-white" >Register</Link>
              <Link to="signin" className="btn log ms-3 text-white">Log in</Link>
            </Nav>
          ) : (
            ""
          )}

          <Nav className="ml-auto">
            {userToken !== null ? (
              <>
                <Link to="https://www.facebook.com">
                  <FaFacebook color="white" />
                </Link>
                <Link to="https://www.twitter.com">
                  <FaTwitter color="white" />
                </Link>
                <Link to="https://www.instagram.com">
                  <FaInstagram color="white" />
                </Link>
                <Link to="https://www.linkedin.com">
                  <FaLinkedin color="white" />
                </Link>
                <Link onClick={() => logOut()} className="btn log text-white">Log Out</Link>
              </>
            ) : (
              ""
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
