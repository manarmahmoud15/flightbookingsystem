import React from "react";
import Img from "../../Assets/imgs/Toronto-amico.png";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function AddPassenger() {
  const param = useParams();
  console.log("id", param.id);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    age: Yup.number().required("Age is required"),
    passportNum: Yup.string().required("Passport Number is required"),
    nationalId: Yup.string().required("National Id is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      gender: "1",
      age: "",
      isChild: "1",
      passportNum: "",
      nationalId: "",
      flightid:""
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting, setFieldError }) => {
      try {
        setSubmitting(true);
        let response = await axios.post(
          `http://localhost:5269/api/Passenger`,
          values
        );
        console.log("Response:", response.data);
        // Clear form after successful submission
        formik.resetForm();
      } catch (err) {
        console.error("Error:", err);
        setFieldError(
          "errMsg",
          err.response?.data?.message || "An error occurred during Booking."
        );
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="container shadow h-100">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-lg-12 col-xl-11 px-4">
          <div className="card text-black">
            <div className="card-body p-md-3">
              <div className="row justify-content-center">
                <div className="col-md-10 col-lg-9 col-xl-5 order-2 order-lg-1">
                  <form onSubmit={formik.handleSubmit}>
                    <div className="row mb-4">
                      <div className="col">
                        <div className="form-outline">
                          <label htmlFor="name" className="control-label">
                            Name
                          </label>
                          <input
                            id="name"
                            name="name"
                            type="text"
                            className="form-control"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.name}
                          />
                          {formik.touched.name && formik.errors.name && (
                            <p className="text-danger">{formik.errors.name}</p>
                          )}
                        </div>
                      </div>
                      <div className="col">
                        <div className="form-outline">
                          <label htmlFor="age" className="control-label">
                            Age
                          </label>
                          <input
                            id="age"
                            name="age"
                            type="number"
                            className="form-control"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.age}
                          />
                          {formik.touched.age && formik.errors.age && (
                            <p className="text-danger">{formik.errors.age}</p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="row mb-4">
                      <div className="col">
                        <div className="form-outline">
                          <label htmlFor="FirstName" className="control-label">
                            {" "}
                            Gender
                          </label>
                          <select
                            id="classSelect"
                            name="gender"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.gender}

                            className="form-control"
                          >
                            <option value="0">Female</option>
                            <option value="1">Male</option>
                          </select>
                        </div>
                      </div>
                      <div className="col">
                        <div className="form-outline">
                          <label htmlFor="LastName" className="control-label">
                            Adlut/Child
                          </label>
                          <select
                            id="classSelect"
                              
                               name="isChild"
                               onBlur={formik.handleBlur}
                               onChange={formik.handleChange}
                               value={formik.values.isChild}

                            className="form-control"
                          >
                            <option value="0">child</option>
                            <option value="1">Adult</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="row mb-4">
                      <div className="col">
                        <div className="form-outline">
                          <label htmlFor="passportNum" className="control-label">
                            Passport Number
                          </label>
                          <input
                            id="passportNum"
                            name="passportNum"
                            type="text"
                            className="form-control"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.passportNum}
                          />
                          {formik.touched.passportNum && formik.errors.passportNum && (
                            <p className="text-danger">{formik.errors.passportNum}</p>
                          )}
                        </div>
                      </div>
                      <div className="col">
                        <div className="form-outline">
                          <label htmlFor="nationalId" className="control-label">
                            National Id
                          </label>
                          <input
                            id="nationalId"
                            name="nationalId"
                            type="text"
                            className="form-control"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.nationalId}
                          />
                          {formik.touched.nationalId && formik.errors.nationalId && (
                            <p className="text-danger">{formik.errors.nationalId}</p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="row mb-4">
                      <div className="col">
                        <div className="form-outline">
                          <label htmlFor="Flightid" className="control-label">
                        Flight Id
                          </label>
                          <input
                            id="FlightId"
                            name="flightid"
                            type="text"
                            className="form-control"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.flightid}
                          />
                          {/* {formik.touched.passportNum && formik.errors.passportNum && (
                            <p className="text-danger">{formik.errors.passportNum}</p>
                          )} */}
                        </div>
                      </div>
                    
                    </div>
                    <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                      <button
                        type="submit"
                        className="btn"
                        disabled={formik.isSubmitting}
                      >
                        {formik.isSubmitting ? "Submitting..." : "Submit"}
                      </button>
                    </div>
                    {formik.errors.errMsg && (
                      <div className="text-danger">{formik.errors.errMsg}</div>
                    )}
                  </form>
                </div>
                <div className="col-md-10 col-lg-3 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                  <img src={Img} className="img-fluid" alt="Sign Up" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
