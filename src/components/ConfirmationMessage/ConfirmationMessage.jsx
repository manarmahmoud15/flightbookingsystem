import React from "react";
import Img1 from "../../Assets/imgs/Welcome_Email.png";
import { Link } from "react-router-dom"
export default function ConfirmationMessage() {
  return (
    <>
      <div
        className="container d-flex"
        style={{
          marginTop: "100px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "calc(100vh - 100px)",
        }}
      >
        <div
          className="row"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div className="col-lg-6 col-md-12 d-flex align-items-center justify-content-center ">
            <div className="shadow p-5 bg-light">
              <h3
                style={{ color: "hsl(199, 100%, 33%)" }}
                className="text-center mb-4"
              >
                Email Confirmed Successfully{" "}
                <i
                  className="fa-solid fa-plane text-warning mx-3"
                  style={{ fontSize: "20px" }}
                ></i>
              </h3>
              <div className=" mb-lg-5 px-4 d-flex align-items-center justify-content-center">
                <a href="https://mail.google.com/mail/u/0/#inbox">
                  <img width="103" height="89" alt="message" src={Img1} />
                </a>
              </div>
              <div className="text-center">
              <Link
                  to={"/signin"}
                  className="fw-bold mx-3"
                  style={{ color: "hsl(199, 100%, 33%)" }}
                >
                <button className="btn btn-primary">
                  Go Log In
                  <i className="fa-solid fa-plane text-warning mx-3" style={{ fontSize: "16px" }}></i>
                </button>
              </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
