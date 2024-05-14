import React, { useContext, useState } from "react";
import Img from "../../Assets/imgs/Toronto-amico.png";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AddPassengerContext } from "../../Context/AddPassengerContext";
import { Link } from "react-router-dom";
export default function AddPassenger() {
  const [flightId, setFlightId] = useState("");
  const { AddPassenger } = useContext(AddPassengerContext);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    age: Yup.number().required("Age is required"),
    passportNum: Yup.string().required("Passport Number is required"),
    nationalId: Yup.string().required("National Id is required"),
    gender: Yup.string().required("Gender is required"),
    isChild: Yup.string().required("Child/Adult selection is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      age: "",
      passportNum: "",
      nationalId: "",
      gender: "0",
      isChild: false,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        await AddPassenger(
          values.name,
          Number(values.gender),
          Number(values.age),
          values.isChild,
          values.passportNum,
          values.nationalId,
          Number(flightId)
        );
      } catch (error) {
        console.error("Failed to add passenger:", error.message);
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
                            {...formik.getFieldProps("name")}
                          />
                          {formik.touched.name && formik.errors.name ? (
                            <div>{formik.errors.name}</div>
                          ) : null}
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
                            {...formik.getFieldProps("age")}
                          />
                          {formik.touched.age && formik.errors.age ? (
                            <div>{formik.errors.age}</div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                    <div className="row mb-4">
                      <div className="col">
                        <div className="form-outline">
                          <label htmlFor="gender" className="control-label">
                            Gender
                          </label>
                          <select
                            id="gender"
                            name="gender"
                            className="form-control"
                            {...formik.getFieldProps("gender")}
                          >
                            <option value="0">Female</option>
                            <option value="1">Male</option>
                          </select>
                          {formik.touched.gender && formik.errors.gender ? (
                            <div>{formik.errors.gender}</div>
                          ) : null}
                        </div>
                      </div>
                      <div className="col">
                        <div className="form-outline">
                          <label htmlFor="isChild" className="control-label">
                            Child
                          </label>
                          <select
                            id="isChild"
                            name="isChild"
                            className="form-control"
                            {...formik.getFieldProps("isChild")}
                          >
                            <option value="true">Child</option>
                            <option value="false">Adult</option>
                          </select>
                          {formik.touched.isChild && formik.errors.isChild ? (
                            <div>{formik.errors.isChild}</div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                    <div className="row mb-4">
                      <div className="col">
                        <div className="form-outline">
                          <label
                            htmlFor="passportNum"
                            className="control-label"
                          >
                            Passport Number
                          </label>
                          <input
                            id="passportNum"
                            name="passportNum"
                            type="text"
                            className="form-control"
                            {...formik.getFieldProps("passportNum")}
                          />
                          {formik.touched.passportNum &&
                          formik.errors.passportNum ? (
                            <div>{formik.errors.passportNum}</div>
                          ) : null}
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
                            {...formik.getFieldProps("nationalId")}
                          />
                          {formik.touched.nationalId &&
                          formik.errors.nationalId ? (
                            <div>{formik.errors.nationalId}</div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                    <div className="row mb-4">
                      <div className="col">
                        <div className="form-outline">
                          <label htmlFor="flightId" className="control-label">
                            Flight Id
                          </label>
                          <input
                            id="flightId"
                            name="flightId"
                            type="text"
                            className="form-control"
                            value={flightId}
                            onChange={(e) => setFlightId(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                      <button type="submit" className="btn btn-primary">
                        <Link to={`/addticket/${flightId}` }>Add Passenger</Link>
                      </button>
                    </div>
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
