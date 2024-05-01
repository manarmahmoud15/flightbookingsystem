import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { userContext } from "../../Context/TokenContext";

export default function SignIn() {
  let {setUserToken} = useContext(userContext)
  let navigate = useNavigate();
  const [loading, setloading] = useState(false);
  const [errMsg, seterrMsg] = useState(null);
  let validationSchema = Yup.object({
    email: Yup.string().required("Email is Reqired").email("Enter Valid Email"),
    password: Yup.string()
      .required("Password is Reqired")
      .matches(/^[A-Z][a-z0-9]{6,15}$/, "Enter Valid Password"),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    // validate ,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setloading(true);
      try {
        let response = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', values);
        let data = response.data;
        if (data.message === 'success') {
          navigate("/home");
          localStorage.setItem('userToken' , data.token)
          setUserToken(data.token)
        } 
      } catch (err) {
        seterrMsg(err.response?.data?.message || "An error occurred during login.");
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
                <label htmlFor="useremail">Email:</label>
                <input
                  type="email"
                  id="useremail"
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
                <label htmlFor="userpassword">Password:</label>
                <input
                  type="password"
                  id="userpassword"
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

              {errMsg !== null ? <p className="text-danger">{errMsg} </p> : ""}
              <div className="col-md-12 text-end my-2">
                <button
                  type="submit"
                  style={{ backgroundColor: "#0aad0a", color: "white" }}
                  className="btn"
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
              <p className="text-muted  d-inline">
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
  );
}
