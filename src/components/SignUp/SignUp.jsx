import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";
import { useFormik } from "formik";
import { passengerContext } from "../../Context/PassengerIDContext";
import signupImg from "../../Assets/imgs/Sign up.gif";
import { Modal, Button } from 'react-bootstrap';
export default function SignUp() {
  let navigate = useNavigate();
  const [errMsg, setErrMsg] = useState(null);
  let { setPassengerID } = useContext(passengerContext);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  let validationSchema = Yup.object({
    userName: Yup.string().min(3, "Minimum length is 3").max(20, "Maximum length is 20").required("Name is required"),
    email: Yup.string().required("Email is required").email("Enter a valid email"),
    phoneNumber: Yup.string().required("Phone is required").matches(/^01[0125][0-9]{8}$/, "Enter a valid phone number"),
    password: Yup.string().required("Password is required").matches(/^[A-Z][a-z0-9]{6,15}$/, "Enter a valid password"),
    confirmPassword: Yup.string().required("Confirm Password is required").oneOf([Yup.ref("password")], "Passwords must match"),
    passportNum: Yup.string().required("Passport Number is required"),
    nationalId: Yup.string().required("National ID is required"),
  });

  async function register(values) {
    setLoading(true);
    try {
      let response = await axios.post("http://localhost:5269/api/Account/register", values);
      let data = response.data;
      console.log(data);
      if (data.isSuccess) {
        localStorage.setItem("passengerId", data.data);
        navigate("/signin");
      } else {
        if (data.message === "Couldn't create Account due to these errors") {
          setErrMsg("Username already exists, please choose a different one.");
        } else {
          setErrMsg("Registration failed, please try again.");
        }
      }
    } catch (err) {
      console.error(err);
      setErrMsg(err.response?.data?.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  }

  let formik = useFormik({
    initialValues: {
      userName: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
      passportNum: "",
      nationalId: "",
    },
    validationSchema: validationSchema,
    onSubmit: register,
  });
  const handleRegisterClick = (e) => {
    e.preventDefault();
    setShowModal(true); // Show the modal immediately when the button is clicked
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const handleFormSubmit = () => {
    formik.handleSubmit();
    setShowModal(false);
    window.open("https://mail.google.com/mail/u/0/?hl=ar#inbox", "_blank");
  };

  return (
    <div className="container">
      <div className="row justify-content-center align-items-center shadow pe-2">
      <h1 style={{ color: "hsl(199, 100%, 33%)" }} className="text-center">
              Register Form
            </h1>
        <div className="col-md-6">
          <img src={signupImg} alt="Sign Up" className="img-fluid" />
        </div>
        <div className="col-md-6">
          <div>
  
            <form onSubmit={formik.handleSubmit}>
              <div className="row">
                <div className="col-md-12">
                  <label htmlFor="userName">Name:</label>
                  <input
                    type="text"
                    id="userName"
                    name="userName"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.userName}
                    className="form-control"
                  />
                  {formik.errors.userName && formik.touched.userName ? (
                    <p className="text-danger">{formik.errors.userName}</p>
                  ) : (
                    ""
                  )}
                </div>
                <div className="col-md-6">
                <label htmlFor="userEmail">Email:</label>
                <input
                  type="email"
                  id="userEmail"
                  name="email"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  className="form-control"
                />
                {formik.errors.email && formik.touched.email ? (
                  <p className="text-danger">{formik.errors.email}</p>
                ) : (
                  ""
                )}
              </div>
              <div className="col-md-6">
                <label htmlFor="userPhone">Phone:</label>
                <input
                  type="tel"
                  id="userPhone"
                  name="phoneNumber"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.phoneNumber}
                  className="form-control"
                />
                {formik.errors.phoneNumber && formik.touched.phoneNumber ? (
                  <p className="text-danger">{formik.errors.phoneNumber}</p>
                ) : (
                  ""
                )}
              </div>
              <div className="col-md-6">
                <label htmlFor="userpassportNum">passportNum:</label>
                <input
                  type="tel"
                  id="userpassportNum"
                  name="passportNum"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.passportNum}
                  className="form-control"
                />
                {formik.errors.passportNum && formik.touched.passportNum ? (
                  <p className="text-danger">{formik.errors.passportNum}</p>
                ) : (
                  ""
                )}
              </div>
              <div className="col-md-6">
                <label htmlFor="usernationalId">National Id:</label>
                <input
                  type="tel"
                  id="usernationalId"
                  name="nationalId"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.nationalId}
                  className="form-control"
                />
                {formik.errors.nationalId && formik.touched.nationalId ? (
                  <p className="text-danger">{formik.errors.nationalId}</p>
                ) : (
                  ""
                )}
              </div>
              <div className="col-md-12">
                <label htmlFor="userPassword">Password:</label>
                <input
                  type="password"
                  id="userPassword"
                  name="password"
                  // autoComplete="current-password"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  className="form-control"
                />
                {formik.errors.password && formik.touched.password ? (
                  <p className="text-danger">{formik.errors.password}</p>
                ) : (
                  ""
                )}
              </div>
              <div className="col-md-12">
                <label htmlFor="userConfirmPassword">Confirm Password:</label>
                <input
                  type="password"
                  id="userConfirmPassword"
                  name="confirmPassword"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.confirmPassword}
                  className="form-control"
                />
                {formik.errors.confirmPassword &&
                formik.touched.confirmPassword ? (
                  <p className="text-danger">{formik.errors.confirmPassword}</p>
                ) : (
                  ""
                )}
              </div>
              {errMsg !== null ? <p className="text-danger">{errMsg} </p> : ""}
              </div>
              {/* Other form fields go here */}
              <div className="col-md-12 text-end my-2">
             
                <button
                  type="submit"
                  style={{ backgroundColor: "#0aad0a", color: "white" }}
                  className="btn"
                  disabled={!(formik.dirty && formik.isValid)}
                  onClick={handleRegisterClick}                >
                  Register
            
                  {loading ? (
                    <span>
                      <li className="fa-solid text-light mx-2 fa-spinner fa-spin"></li>
                    </span>
                  ) : (
                    ""
                  )}
                </button>
              </div>
              <p className="text-muted d-inline">
                I have an account
                <Link to={"/signin"} className="fw-bold mx-3" style={{ color: "hsl(199, 100%, 33%)" }}>
                  Log in
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Registration Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          please go to gmail to confirm mail
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleFormSubmit} >
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
