// import React, { useContext } from "react";
import { useContext } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import {
  FaShoppingCart,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";
import { userContext } from "../../Context/TokenContext";
import { useNavigate } from "react-router-dom";
// import { counterContext } from "../../Context/counter";

export default function AppNavbar() {
  let { userToken,setUserToken } = useContext(userContext);
  // let {counter} = useContext(counterContext);

  let navigate = useNavigate()
  function logOut ()
  {
    localStorage.removeItem('userToken')
    setUserToken(null)
    navigate('/signin')
  }
  return (
    <Navbar bg="primary" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="#home">
          <FaShoppingCart style={{ color: "#0aad0a" }} />
          <span className="fw-bold"> Travel </span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {userToken !== null ? (
            <Nav className="me-auto">
              <Nav.Link href="home">Home </Nav.Link>
              <Nav.Link href="MostVisited">MostVisited</Nav.Link>

            </Nav>
          ) : (
            ""
          )}
          {userToken === null ? (
            <Nav className="ms-auto">
              <Nav.Link href="signup">Register</Nav.Link>
              <Nav.Link href="signin">Log in</Nav.Link>
            </Nav>
          ) : (
            ""
          )}

          <Nav className="ml-auto">
            {userToken !== null ? (
              <>
                <Nav.Link href="https://www.facebook.com">
                  <FaFacebook color="white" />
                </Nav.Link>
                <Nav.Link href="https://www.twitter.com">
                  <FaTwitter color="white" />
                </Nav.Link>
                <Nav.Link href="https://www.instagram.com">
                  <FaInstagram color="white" />
                </Nav.Link>
                <Nav.Link href="https://www.linkedin.com">
                  <FaLinkedin color="white" />
                </Nav.Link>
                <Nav.Link  onClick={()=>logOut()}>Log Out</Nav.Link>
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
