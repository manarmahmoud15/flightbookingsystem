import React from 'react';
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { userContext } from "../../Context/TokenContext";

export default function AddTicket() {
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState(null);
  const [SuccessMsg,  setSuccessMsg] = useState(null);
 
  let { setUserToken } = useContext(userContext);
  let navigate = useNavigate();

  const initialValues = {
    
    Class: "0",
    Price: 30000 ,
    Section:"front",
    PassengerId:8,
    FlightId:1
  };

  const validationSchema = Yup.object({
   
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      setLoading(true);
      // const response = await axios.post('http://localhost:5269/api/Ticket', values);
      // console.log(response.data);
      // setSuccessMsg(response.data.message); // Set success message state
    } catch (error) {
      setErrMsg(error.message);
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <div className='container'>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
          

            <div className="form-row">
              <div className="form-group col-md-4">
                <label htmlFor="class">Class</label>
                <Field as="select" name="Class" className="form-control">
                  <option value="0">0</option>
                  <option value="1">1</option>
                </Field>
              </div>
              <div className="form-group col-md-4">
                <label htmlFor="price">Price</label>
                <Field as="select" name="Price" className="form-control">
                  <option value="30000">30000</option>
                  <option value="20000">20000</option>
                </Field>
              </div>
              <div className="form-group col-md-4">
                <label htmlFor="price">Section</label>
                <Field as="select" name="Section" className="form-control">
                  <option value="0">Front</option>
                  <option value="1">Middle</option>
                  <option value="2">Back</option>
                  <option value="3">Window</option>

                </Field>
              </div>
              <div className="form-group col-md-4">
                <label htmlFor="passengerid">PassengerId</label>
                <Field as="select" name="PassengerId" className="form-control">
                  <option value="8">8</option>
                </Field>
              </div>
              <div className="form-group col-md-4">
                <label htmlFor="flightid">FlightId</label>
                <Field as="select" name="FlightId" className="form-control">
                  <option value="1">1</option>
                </Field>
              </div>
           
            </div>

            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Book"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
