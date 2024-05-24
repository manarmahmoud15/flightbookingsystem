
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
          console.log(saveImgResponse);
          let response = await axios.put(
            `http://localhost:5269/api/Flight/?id=${values.id}`,
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
      } else {
        seterrMsg("An error occurred during saving image.");
      }


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
    <div className="container">
      <h2 className="text-center text-primary">Edit flight</h2>
      <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
        <div id="allErrors"></div>

        <div className="form-group m-2">
          <label htmlFor="StartId" className="d-block">
            Select start airport:
          </label>
          <select
            id="StartId"
            name="StartId"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="form-control"
          >
            <option value="" label="Select start airport" />
            {Airports.map((item, index) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
          {formik.errors.startAirport && formik.touched.startAirport && (
            <p className="text-danger">{formik.errors.startAirport}</p>
          )}
        </div>



        <div className="form-group m-2">
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
            <p className="text-danger">{formik.errors.PlaneId}</p>
          )}
        </div>

        <div className="form-group m-2">
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
          {formik.errors.DepartureTime && formik.touched.DepartureTime && (
            <p className="text-danger">{formik.errors.DepartureTime}</p>
          )}
        </div>

        <div className="form-group m-2">
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
          {formik.errors.arrivalTime && formik.touched.arrivalTime && (
            <p className="text-danger">{formik.errors.arrivalTime}</p>
          )}
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
  );
}
export default NewFlight;
