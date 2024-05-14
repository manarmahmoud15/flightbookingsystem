import React, { useContext, useEffect, useState } from "react";
import Img from "../../Assets/imgs/Tablet login.gif";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { userContext } from "../../Context/TokenContext";

export default function SignIn() {
  let { setUserToken } = useContext(userContext);
  let navigate = useNavigate();
  const [loading, setloading] = useState(false);
  const [errMsg, seterrMsg] = useState(null);

  let validationSchema = Yup.object({
    userName: Yup.string()
      .min(3, "Minimum length is 3")
      .max(20, "Maximum length is 20")
      .required("Username is required"),
    password: Yup.string()
      .required("Password is required")
      .matches(
        /^[A-Z][a-z0-9]{6,15}$/,
        "Password must start with an uppercase letter and have 6-15 characters"
      ),
  });

  const formik = useFormik({
    initialValues: {
      userName: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setloading(true);
      try {
        let response = await axios.post(
          "http://localhost:5269/api/Account/login",
          values
        );
        let data = response.data;
        console.log(data);
        if (data.message === "Token Created Successfully") {
          navigate("/home");
          localStorage.setItem("userToken", data.token);
          setUserToken(data.token);
        }
      } catch (err) {
        seterrMsg(
          err.response?.data?.message || "An error occurred during login."
        );
      }
      setloading(false);
    },
  });

  useEffect(() => {
    window.google.accounts.id.initialize({
      client_id: "399127494108-4nfatoh6irn0hq0po8jv18qsr220dfmk.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });
    window.google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "large",
    });
    window.google.accounts.id.prompt();
  }, []);


  async function handleCallbackResponse(response) {
    var IdToken = response.credential;
    let res = await axios.post(
      "http://localhost:5269/api/Account/googleLogin",
      null,
      {
        headers: {
          "Content-Type": "application/json",
          IdToken: IdToken,
        },
      }
    );
    console.log(res);
    if (res.data.isSuccess) {
      navigate("/home");
      localStorage.setItem("userToken", res.token);
      setUserToken(res.token);
    } else {
      alert("Invalid Gmail");
    }
  }

  return (
    <div className="my-5">
      <h1 style={{ color: "hsl(199, 100%, 33%)" }} className="text-center">
        Login Form
      </h1>
      <form onSubmit={formik.handleSubmit} encType={'multipart/form-data'}>
        <div className="row ">
          <div className="col-md-8 m-auto w-50 shadow p-4 bg-light">
            <div className="row gy-4">
              <div className="col-md-12">
                <label htmlFor="userName">userName:</label>
                <input
                  type="text"
                  id="userName"
                  name="userName"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.userName}
                  className="form-control"
                />
                {formik.errors.userName && formik.touched.userName ? (
                  <p className="text-danger">{formik.errors.userName}</p>
                ) : (
                  ""
                )}
              </div>


  return (
    <div className="container-fluid">
      <div className="row justify-content-center align-items-center">
      <div className="col-md-12">
                <h1 className="text-center" style={{ color: "hsl(199, 100%, 33%)" }}>
                  Login Form
                </h1>
              </div>
        <div className="col-md-6 d-flex flex-column justify-content-center">
          
          <form onSubmit={formik.handleSubmit}>
            <div className="row">
             
              <div className="col-md-8 m-auto shadow p-4 bg-light">
                <div className="row gy-4">
                  <div className="col-md-12">
                    <label htmlFor="userName">Username:</label>
                    <input
                      type="text"
                      id="userName"
                      name="userName"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.userName}
                      className="form-control"
                    />
                    {formik.errors.userName && formik.touched.userName ? (
                      <p className="text-danger">{formik.errors.userName}</p>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="col-md-12">
                    <label htmlFor="password">Password:</label>
                    <input
                      type="password"
                      id="password"
                      name="password"
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
                  {errMsg !== null ? <p className="text-danger">{errMsg}</p> : ""}
                  <div className="col-md-12 text-end my-2">
                    <button
                      type="submit"
                      className="btn"
                      style={{ backgroundColor: "#0aad0a", color: "white" }}
                      disabled={!(formik.dirty && formik.isValid)}
                    >
                      Log in
                      {loading ? (
                        <span>
                          <li className="fa-solid text-light mx-2 fa-spinner fa-spin"></li>
                        </span>
                      ) : (
                        ""
                      )}
                    </button>
                  </div>
                  <div id="signInDiv"></div>
                  <p className="text-muted d-inline">
                    I don't have an account
                    <Link
                      to={"/signup"}
                      className="fw-bold mx-3"
                      style={{ color: "hsl(199, 100%, 33%)" }}
                    >
                      Register
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className="col-md-6">
          <img src={Img} className="img-fluid" alt="Login" style={{ maxHeight: "100%", width: "auto" }} />
        </div>
      </div>
    </div>
  );
}
