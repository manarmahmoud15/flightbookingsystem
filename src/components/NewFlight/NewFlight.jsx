import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import Img from "../../Assets/imgs/Flying around the world-amico.png";

function NewFlight(props) {
  const [Airports, setAirports] = useState([
    { Id: Yup.number, Name: Yup.string },
  ]);
  const [Planes, setPlanes] = useState([{ Id: Yup.number, Name: Yup.string }]);
  const [loading, setloading] = useState(false);
  const [errMsg, seterrMsg] = useState(null);

  const validationSchema = Yup.object({
    DepartureTime: Yup.date().required("Departure Time is required"),
    ArrivalTime: Yup.date()
      .required("Arrival time is required")
      .min(
        Yup.ref("DepartureTime"),
        "Arrival time must be after departure time"
      ),
    imageURL: Yup.mixed().required("Image is required"),
    StartId: Yup.string().required("Start airport is required"),
    DestinationId: Yup.string()
      .required("Destination airport is required")
      .notOneOf(
        [Yup.ref("StartId")],
        "Start airport and destination airport cannot be the same"
      ),
    PlaneId: Yup.string().required("Plane is required"),

  });

  const formik = useFormik({
    initialValues: {
      DepartureTime: "",
      ArrivalTime: "",
      imageURL: null,
      StartId: "",
      DestinationId: "",
      PlaneId: "",
    },
    // validate ,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setloading(true);

      let saveImgResponse;
      const formData = new FormData();
      formData.append("imageURL", values.imageURL);

      console.log(values.imageURL);
      saveImgResponse = await axios.post(
        "http://localhost:5269/api/Flight/saveImage",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (saveImgResponse.data.isSuccess) {
        try {
          console.log("image saved >> in try");
          console.log(saveImgResponse.data.data);
          let imageURL = saveImgResponse.data.data;
          console.log(saveImgResponse);
          let response = await axios.post(
            `http://localhost:5269/api/Flight?DepartureTime=${values.DepartureTime}&ArrivalTime=${values.ArrivalTime}&DestinationId=${values.DestinationId}&StartId=${values.StartId}&imageURL=${imageURL}&PlaneId=${values.PlaneId}`,
            values
          );
          if (response.data.isSuccess) {
            alert("Flight added successfully");
          }
          let data = response.data;
          console.log(response);
          console.log(data);
        } catch (err) {
          seterrMsg(
            err.response?.data?.message || "An error occurred during adding."
          );
        }
      }
      else {
        seterrMsg("An error occurred during saving image.");
      }
      
      setloading(false);
    },
  });

  
  useEffect(() => {
    axios
      .get(`http://localhost:5269/api/Airport`)
      .then((res) => {
        if (res.data && Array.isArray(res.data.data)) {
          setAirports(res.data.data);
          console.log(res.data.data);
        } else {
          throw new Error("Invalid response data format");
        }
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:5269/api/plane/freePlanes`)
      .then((res) => {
        console.log(res);
        if (res.data && Array.isArray(res.data.data)) {
          console.log("hh");
          setPlanes(res.data.data);
          console.log(Planes);
        } else {
          throw new Error("error happened");
        }
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="container shadow h-100 mt-3 mb-3">
      <h2 className="text-center text-primary">New flight</h2>
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-lg-12 col-xl-11 px-4">
          <div className="card text-black">
            <div className="card-body p-md-3">
              <div className="row justify-content-center">
                <div className="col-md-10 col-lg-9 col-xl-5 order-2 order-lg-1">
                  <form
                    onSubmit={formik.handleSubmit}
                    encType="multipart/form-data"
                  >
                    <div id="allErrors"></div>

                    <div className="row mb-4">
                      <div className="col">
                        <div className="form-outline">
                          <label htmlFor="StartId" className="control-label" >
                            Select start airport:
                          </label>
                          <select
                            id="StartId"
                            name="StartId"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            //  value={formik.values.startAirport}
                            className="form-control"
                          >
                            <option value="" label="Select start airport" />
                            {Airports.map((item, index) => (
                              <option key={item.id} value={item.id}>
                                {item.name}
                              </option>
                            ))}
                          </select>
                          {formik.errors.startAirport &&
                            formik.touched.startAirport && (
                              <p className="text-danger">
                                {formik.errors.startAirport}
                              </p>
                            )}
                        </div>
                      </div>

                    <div className="col">
                      <div className="form-outline">
                        <label htmlFor="DestinationId" className="control-label">
                          Select destination airport:
                        </label>
                        <select
                          id="DestinationId"
                          name="DestinationId"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.destinationAirport}
                          className="form-control"
                        >
                          <option value="" label="Select destination airport" />
                          {Airports.map((item) => (
                            <option key={item.id} value={item.id}>
                              {item.name}
                            </option>
                          ))}
                        </select>
                        {formik.errors.destinationAirport &&
                          formik.touched.destinationAirport && (
                            <p className="text-danger">
                              {formik.errors.destinationAirport}
                            </p>
                          )}
                      </div>
                    </div>
                    </div>
                    <div className="row mb-4">
                      <div className="col">
                        <div className="form-outline">
                          <label htmlFor="PlaneId" className="d-block">
                            Select Plane:
                          </label>
                          <select
                            id="PlaneId"
                            name="PlaneId"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.PlaneId}
                            className="form-control"
                          >
                            <option value="" label="Select Plane" />
                            {Planes.map((item) => (
                              <option key={item.id} value={item.id}>
                                {item.name}
                              </option>
                            ))}
                          </select>
                          {formik.errors.PlaneId && formik.touched.PlaneId && (
                            <p className="text-danger">
                              {formik.errors.PlaneId}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="row mb-4">
                      <div className="col">
                        <div className="form-outline">
                          <label htmlFor="departureTime" className="d-block">
                            Departure time :{" "}
                          </label>
                          <input
                            className="d-block"
                            id="DepartureTime"
                            name="DepartureTime"
                            type="datetime-local"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.DepartureTime}
                          />
                          {formik.errors.DepartureTime &&
                            formik.touched.DepartureTime && (
                              <p className="text-danger">
                                {formik.errors.DepartureTime}
                              </p>
                            )}
                        </div>
                      </div>
                    </div>
                    <div className="row mb-4">
                      <div className="col">
                        <div className="form-outline">
                          <label htmlFor="arrivalTime" className="d-block">
                            Arrival time :{" "}
                          </label>
                          <input
                            className="d-block"
                            id="ArrivalTime"
                            name="ArrivalTime"
                            type="datetime-local"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.arrivalTime}
                          />
                          {formik.errors.arrivalTime &&
                            formik.touched.arrivalTime && (
                              <p className="text-danger">
                                {formik.errors.arrivalTime}
                              </p>
                            )}
                        </div>
                      </div>
                    </div>

                    <div className="row mb-4">
                      <div className="col">
                        <div className="form-outline">
                          <label htmlFor="imageURL" className="d-block">
                            Image :{" "}
                          </label>
                          <input
                            className="d-block"
                            id="imageURL"
                            name="imageURL"
                            type="file"
                            onBlur={formik.handleBlur}
                            onChange={(event) => {
                              formik.setFieldValue(
                                "imageURL",
                                event.currentTarget.files[0]
                              );
                            }}
                          />
                          {formik.errors.imageURL &&
                            formik.touched.imageURL && (
                              <p className="text-danger">
                                {formik.errors.imageURL}
                              </p>
                            )}
                        </div>
                      </div>
                    </div>

                    {errMsg !== null && <p className="text-danger">{errMsg}</p>}
                    <button
                      type="submit"
                      className="btn btn-primary m-2"
                      disabled={!(formik.dirty && formik.isValid)}
                    >
                      {loading ? "Loading..." : "Add"}
                    </button>
                  </form>
                </div>
                <div className="col-md-9 col-lg-3 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                  <img src={Img} className="img-fluid" alt="Flight" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default NewFlight;
