import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { userContext } from "../../Context/TokenContext";
// import { jwtDecode } from 'jwt-decode';



export default function SignIn() {
  let {setUserToken} = useContext(userContext)
  let navigate = useNavigate();
  const [loading, setloading] = useState(false);
  const [errMsg, seterrMsg] = useState(null);
  let validationSchema = Yup.object({
    userName: Yup.string()
    .min(3, "min length is 3")
    .max(20, "max length is 20")
    .required("Name is Reqired"),
    password: Yup.string()
      .required("Password is Reqired")
      .matches(/^[A-Z][a-z0-9]{6,15}$/, "Enter Valid Password"),
  });
  const formik = useFormik({
    initialValues: {
      userName: "",
      password: "",
    },
    // validate ,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setloading(true);
      try {
        let response = await axios.post('http://localhost:5269/api/Account/login', values);
        let data = response.data;
        console.log(data)
        if (data.message === 'Token Created Successfully') {
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

 async function handleCallbackResponse (response){
// console.log("JWT token" + response.credential);
// console.log("hello");
// var decoded = jwtDecode(response.credential); 
// console.log(decoded);
var IdToken = response.credential;
// console.log(IdToken);
let res = await axios.post('http://localhost:5269/api/Account/googleLogin',null,{
  headers: {
    'Content-Type': 'application/json', // Set the Content-Type header to JSON
    'IdToken' : IdToken
  }
});
console.log(res);
if (res.data.isSuccess) { 
  navigate("/home");
  localStorage.setItem('userToken' , res.token)
  setUserToken(res.token)
}
else
{
  alert("Invalid gmail")
} 
  }

  useEffect(() => {
    window.google.accounts.id.initialize({
      client_id : "399127494108-4nfatoh6irn0hq0po8jv18qsr220dfmk.apps.googleusercontent.com",
      callback : handleCallbackResponse
    });
    window.google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      {theme : "outline" , size : "large"}
    );
    window.google.accounts.id.prompt();
  },[])

  return (
    <div className="my-5">
      <h1 style={{ color: "hsl(199, 100%, 33%)" }} className="text-center">
        Login Form
      </h1>
      <form onSubmit={formik.handleSubmit}>
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
    <div id="signInDiv"></div> 
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
