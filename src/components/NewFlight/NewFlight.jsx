import axios from 'axios';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import * as Yup from "yup"; 

function NewFlight(props) {
    const [Airports, setAirports] = useState([]);
    const [selectedStartAirport, setSelectedStartAirport] = useState('');
    const [selectedDestinationAirport, setSelectedDestinationAirport] = useState('');
    const [loading, setloading] = useState(false);
    const [errMsg, seterrMsg] = useState(null); 
   
    const validationSchema = Yup.object({
      departureTime: Yup.date()
          .required("Departure Time is required"),
      arrivalTime: Yup.date() 
          .required("Arrival time is required")
          .min(Yup.ref('departureTime'), 'Arrival time must be after departure time'),
      image: Yup.mixed()
          .required("Image is required"),
      startAirport: Yup.string() 
          .required("Start airport is required"),
      destinationAirport: Yup.string()
          .required("Destination airport is required")
          .notOneOf([Yup.ref('startAirport')], 'Start airport and destination airport cannot be the same'),
             // .test('not-equal', 'Start airport and destination airport cannot be the same', function(value) {
            //     const { startAirport } = this.parent; // Accessing the value of startAirport
            //     console.log(startAirport);
            //     return value === startAirport; // Return true if the destination airport is different from the start airport
            // })
  });

    
    const formik = useFormik({
      initialValues: {
        departureTime: "",
        arrivalTime: "",
        image: null,
        startAirport: "",
        destinationAirport: ""
      },
      // validate ,
      validationSchema: validationSchema,
      onSubmit: async (values) => {
        setloading(true);
        try {
            console.log(values);
          let response = await axios.post('http://localhost:5269/api/Flight', values);
          let data = response.data;
          console.log(response);
          console.log(data)
        //   if (data.message === "Token Created Successfully") {
        //   //  navigate("/home");
        //     localStorage.setItem('userToken' , data.token)
        //   //  setUserToken(data.token)
        //   } 
        } catch (err) {
          seterrMsg(err.response?.data?.message || "An error occurred during adding.");
        }
          setloading(false); 
        
      }
      
    });


    const addFlight = (e) => {
        // e.preventDefault(); 
        // if (!validateForm()) {
        //     return;
        // }
        if(formik.values.selectedDestinationAirport ===
             formik.values.selectedStartAirport 
            ||formik.values.arrivalTime <= formik.values.departureTime)
            e.preventDefault();

        if( formik.values.selectedStartAirport === 
            formik.values.selectedDestinationAirport)
            { 
               // e.preventDefault(); 
                console.log("prevented");
                document.getElementById("allErrors").innerHTML = "<span className='text-danger'>start airport and destination airport cannot be the same</span>";
            } 
            else
            {
                document.getElementById("allErrors").innerHTML = "<span className='text-danger'></span>";
            }

            if( formik.values.arrivalTime <= formik.values.departureTime)
                {
                   // e.preventDefault(); 
                    console.log("prevented2");  
                    document.getElementById("allErrors").innerHTML = "<span className='text-danger'>Arrival time must be after departure time</span>";
                } 
            else
            {
                document.getElementById("allErrors").innerHTML = "<span className=\"text-danger\"></span>";
            }
        // Perform any necessary validation
        
        // Call the addFlight function with necessary data
        // addFlight({
          
        // });
    };

    const handleStartAirportChange = (event) => {
        setSelectedStartAirport(event.target.value);
        console.log(selectedStartAirport);
    };

    const handleDestinationAirportChange = (event) => {
        setSelectedDestinationAirport(event.target.value);
        console.log(selectedDestinationAirport);
    };

    // const [departureTime, setDepartureTime] = useState(''); 
    // const [arrivalTime, setArrivalTime] = useState('');  
    const [image, setImage] = useState({});  
    const [errors, setErrors] = useState({}); // State to manage validation errors


    // const handleDepartureTimeChange = (event) => {
    //     setDepartureTime(event.target.value);
    //     console.log(departureTime);
    // };

    // const handleArrivalTimeChange = (event) => {
    //     setArrivalTime(event.target.value);
    //     console.log(image);
    // };
    

    const handleImageChange = (event) => {
        let reader = new FileReader();
  setImage(event.target.files[0]); 
  reader.readAsDataURL(event.target.files[0]);
  reader.onload = () => {
    setImage(reader.result);
    console.log(image);
    };
    }

// validation 
const validateForm = () => {
    const errors = {};
    let isValid = true;

    // Validate selected start airport
    // if (!selectedStartAirport) {
    //     errors.selectedStartAirport = "Please select a start airport.";
    //     isValid = false;
    // }

    // Validate selected destination airport
    // if (!selectedDestinationAirport) {
    //     errors.selectedDestinationAirport = "Please select a destination airport.";
    //     isValid = false;
    // }

    // Validate departure time
    // if (!departureTime) {
    //     errors.departureTime = "Please enter the departure time.";
    //     isValid = false;
    // }

    // Validate arrival time
    // if (!arrivalTime) {
    //     errors.arrivalTime = "Please enter the arrival time.";
    //     isValid = false;
    // }

    // Validate image
    if (!image) { 
        errors.image = "Please select an image.";
        isValid = false;
    }

    setErrors(errors); // Update errors state
    return isValid;
};

// const addFlight = (e) => {
//     e.preventDefault(); // Prevent default form submission

//     // Validate form
//     if (!validateForm()) {
//         return;
//     }




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
          .get(`http://localhost:5269/api/plane`)
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

      return (
        <div className='container'>
            <h2 className='text-center text-primary'>New flight</h2>
            <form onSubmit={formik.handleSubmit} encType='multipart/form-data'> 
                <div id='allErrors'></div>

                <div className="form-group m-2">
                    <label htmlFor="startAirport" className="d-block">Select start airport:</label>
                    <select 
                        id="startAirport" 
                        name='startAirport' 
                        onChange={formik.handleChange} 
                        onBlur={formik.handleBlur}
                        value={formik.values.startAirport} 
                        className="form-control"
                    >
                        <option value="" label="Select start airport" />
                        {Airports.map((item) => (
                            <option key={item.id} value={item.name}>{item.name}</option>
                        ))}
                    </select>
                    {formik.errors.startAirport && formik.touched.startAirport && <p className="text-danger">{formik.errors.startAirport}</p>}
                </div>

                <div className="form-group m-2">
                    <label htmlFor="destinationAirport" className="d-block">Select destination airport:</label>
                    <select 
                        id="destinationAirport" 
                        name='destinationAirport' 
                        onChange={formik.handleChange} 
                        onBlur={formik.handleBlur}
                        value={formik.values.destinationAirport} 
                        className="form-control"
                    >
                        <option value="" label="Select destination airport" />
                        {Airports.map((item) => (
                            <option key={item.id} value={item.name}>{item.name}</option>
                        ))}
                    </select>
                    {formik.errors.destinationAirport && formik.touched.destinationAirport && <p className="text-danger">{formik.errors.destinationAirport}</p>}
                </div>

                <div className="form-group m-2">
                    <label htmlFor="departureTime" className='d-block'>Departure time : </label>
                    <input 
                        className='d-block' 
                        id='departureTime'
                        name='departureTime'
                        type='datetime-local'
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.departureTime}
                    />
                    {formik.errors.departureTime && formik.touched.departureTime && <p className="text-danger">{formik.errors.departureTime}</p>}
                </div>

                <div className="form-group m-2">
                    <label htmlFor="arrivalTime" className='d-block'>Arrival time : </label>
                    <input 
                        className='d-block' 
                        id='arrivalTime' 
                        name='arrivalTime'
                        type='datetime-local' 
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.arrivalTime} 
                    />
                    {formik.errors.arrivalTime && formik.touched.arrivalTime && <p className="text-danger">{formik.errors.arrivalTime}</p>}
                </div>

                <div className="form-group m-2">
                    <label htmlFor="image" className='d-block'>Image : </label>
                    <input 
                        className='d-block' 
                        id='image' 
                        name='image'
                        type='file' 
                        onBlur={formik.handleBlur}
                        onChange={(event) => {
                            formik.setFieldValue("image", event.currentTarget.files[0]);
                        }}
                    />
                    {formik.errors.image && formik.touched.image && <p className="text-danger">{formik.errors.image}</p>}
                </div>

                {errMsg !== null && <p className="text-danger">{errMsg}</p>}
                <button type="submit" className="btn btn-primary m-2"
                  disabled={!(formik.dirty && formik.isValid)}
                  >
                    {loading ? 'Loading...' : 'Add'}
                </button>
            </form>
        </div>
    );

}
export default NewFlight;
