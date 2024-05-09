import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";

export default function SignUp() {
  let navigate = useNavigate();
  const [Loading, setloading] = useState(false);
  const [errMsg, seterrMsg] = useState(null);
  let validationSchema = Yup.object({
    userName: Yup.string()
      .min(3, "min length is 3")
      .max(20, "max length is 20")
      .required("Name is Reqired"),
    email: Yup.string().required("Email is Reqired").email("Enter Valid Email"),
    phoneNumber: Yup.string()
      .required("Phone is Required")
      .matches(/^01[0125][0-9]{8}$/, "Enter Valid Phone Number"),
    password: Yup.string()
      .required("Password is Reqired")
      .matches(/^[A-Z][a-z0-9]{6,15}$/, "Enter Valid Password"),
      confirmPassword: Yup.string()
      .required("Confirm Password is reqired")
      .oneOf([Yup.ref("password") ], "Not Matched"),
      passportNum : Yup.string().required("passport Num is required") ,
      nationalId : Yup.string().required("national Id is required") ,

  });

  // function validate(val) {
  //   let errors = {};
  //   if (!val.Name) {
  //     errors.Name = "name is required";
  //   } else if (val.Name.length < 3) {
  //     errors.Name = "min length is 3 char";
  //   } else if (val.Name.length > 20) {
  //     errors.Name = "max length is 20 char";
  //   }
  //   if (!val.Phone) {
  //     errors.Phone = "Phone is required";
  //   } else if (!/^01[1250][0-9]{8}$/.test(val.Phone)) {
  //     errors.Phone = "Enter a Valid Phone Number";
  //   }

  //   if (!val.email) {
  //     errors.email = "email is Required";
  //   } else if (
  //     !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/i.test(val.email)
  //   ) {
  //     errors.email = "Enter a Valid Email";
  //   }
  //   if (!val.Password) {
  //     errors.Password = "Password is Required";
  //   } else if (!/^[A-Z][a-z0-9]{6,15}$/.test(val.Password)) {
  //     errors.Password = "Invalid Password ";
  //   }
  //   if (!val.ConfirmPassword)
  //   {
  //     errors.ConfirmPassword = "Confirm Password is required"
  //   }
  //   else if (val.ConfirmPassword !== val.Password)
  //   {
  //     errors.ConfirmPassword = 'Not Matched'
  //   }
  //   return errors;
  // }
  const formik = useFormik({
    initialValues: {
      userName: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
      passportNum : "" ,
      nationalId : ""
    },
    // validate ,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setloading(true);
      try {
        let response = await axios.post('http://localhost:5269/api/Account/register', values);
        let data = response.data;
        console.log(response.data);
        if (data.message === "Account Created Successfully and Confiramtion mail has been sent , and there is the Passenger ID => save it and send it when he wants to Add a ticket") {
          navigate("/signin");
        } else {
          seterrMsg("Registration failed, please try again.");
        }
      } catch (err) {
        seterrMsg(err.response?.data?.message || "An unexpected error occurred");
      } 
        setloading(false);  
      
    }
    
  });

  return (
    <div className="my-5">
      <h1 style={{ color: "hsl(199, 100%, 33%)" }} className="text-center">
        Register Form
      </h1>
      <form onSubmit={formik.handleSubmit}>
        <div className="row ">
          <div className="col-md-8 m-auto w-50 shadow p-4 bg-light">
            <div className="row gy-4">
              <div className="col-md-12">
                <label htmlFor="userName">Name:</label>
                <input
                  type="text"
                  id="username"
                  name="userName"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.userName}
                  className="form-control"
                />
                {formik.errors.userName && formik.touched.userName ? (
                  <p className="text-danger">{formik.errors.userName}</p>
                ) : (
                  " "
                )}
              </div>
              <div className="col-md-12">
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
              <div className="col-md-12">
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
              <div className="col-md-12">
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
              <div className="col-md-12">
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

              
              <div className="col-md-12 text-end my-2">
                <button
                  type="submit"
                  style={{ backgroundColor: "#0aad0a", color: "white" }}
                  className="btn"
                  disabled={!(formik.dirty && formik.isValid)}
                > 
                <Link to={"/signin"} style={{ textDecoration: 'none' }}>
                
                  Register
                  </Link>
                  {Loading ? (
                    <span>
                      <li className="fa-solid text-light mx-2 fa-spinner fa-spin"></li>
                    </span>
                  ) : (
                    ""
                  )}
                </button>
              </div>
              <p className="text-muted  d-inline">
                I have an account
                <Link
                  to={"/signin"}
                  className="fw-bold mx-3"
                  style={{ color: "hsl(199, 100%, 33%)" }}
                >
                  Log in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
