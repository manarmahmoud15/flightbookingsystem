import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Img from "../../Assets/imgs/FlightImmgs.webp";
import Img2 from "../../Assets/imgs/Flight3.jpg";
import * as Yup from "yup";
export default function ConfirmEmail() {
  const [loading, setLoading] = useState(false);
  const [errMsg, seterrMsg] = useState(null);
  const formik = useFormik({
    initialValues: {
      Code: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
    }),
    onSubmit: (values) => {
      setLoading(true);
      axios
        .post("http://localhost:5269/api/Account/confirm-email", values)
        .then((response) => {
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
        });
    },
  });
  return (
    <div className="container vh-100 d-flex justify-content-center align-items-center">
      <div className="row">
        <div className="col-lg-6 d-none d-lg-flex align-items-center">
          <img
            src={Img}
            alt="Confirm "
            className="w-100 vh-100"
            style={{ objectFit: "cover", objectPosition: "left" }}
          />
        </div>
        <div className="col-lg-6 col-md-12 d-flex align-items-center justify-content-center ">
          <div className="shadow p-5 bg-light">
            <h3
              style={{ color: "hsl(199, 100%, 33%)" }}
              className="text-center mb-4"
            >
              Confirm Email{" "}
              <i className="fa-solid fa-plane text-warning mx-3"
                    style={{ fontSize: "16px" }}
                  ></i>
            </h3>
            <form onSubmit={formik.handleSubmit}>
              <div className="form-group">
                <label htmlFor="Code">Code:</label>
                <input
                  type="text"
                  id="Code"
                  name="Code"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.Code}
                  className="form-control"
                />
                {formik.errors.Code && formik.touched.Code && (
                  <p className="text-danger">{formik.errors.Code}</p>
                )}
              </div>
              <div className="text-center">
                <button type="button" className="btn btn-primary mt-3">
                  <Link to={"/ConfirmationMessage"} style={{ textDecoration: 'none' }}>
                  
                  {loading ? (
                    <span className="fa-solid text-light mx-2 fa-spinner fa-spin"></span>
                  ) : (
                    "Confirm"
                  )}
                  </Link>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
