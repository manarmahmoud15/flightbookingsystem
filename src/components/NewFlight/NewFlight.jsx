import axios from 'axios';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import * as Yup from "yup"; 

function NewFlight(props) {
    const [Airports, setAirports] = useState([{Id:Yup.number , Name:Yup.string}]); 
    const [Planes, setPlanes] = useState([{Id:Yup.number , Name:Yup.string}]); 
    const [StartId, setStartId] = useState('');
    const [DestinationId, setDestinationId] = useState('');
    const [PlaneId, setPlaneId] = useState(''); 
    const [loading, setloading] = useState(false);
    const [errMsg, seterrMsg] = useState(null); 
   
    const validationSchema = Yup.object({
        DepartureTime: Yup.date()
          .required("Departure Time is required"),
          ArrivalTime: Yup.date() 
          .required("Arrival time is required")
          .min(Yup.ref('DepartureTime'), 'Arrival time must be after departure time'),
           Image: Yup.mixed()
           .required("Image is required"),
      StartId: Yup.string() 
          .required("Start airport is required"),
      DestinationId: Yup.string()
          .required("Destination airport is required")
          .notOneOf([Yup.ref('StartId')], 'Start airport and destination airport cannot be the same'),
          PlaneId: Yup.string()
          .required("Plane is required")
             // .test('not-equal', 'Start airport and destination airport cannot be the same', function(value) {
            //     const { startAirport } = this.parent; // Accessing the value of startAirport
            //     console.log(startAirport);
            //     return value === startAirport; // Return true if the destination airport is different from the start airport
            // })
  });

    
    const formik = useFormik({
      initialValues: {
        DepartureTime: "",
        ArrivalTime: "",
        Image: null,
        StartId: "",
        DestinationId: "",
        PlaneId : ""
      },
      // validate ,
      validationSchema: validationSchema,
      onSubmit: async (values) => {
        setloading(true);
        // try { 
            let saveImgResponse;
            const formData = new FormData();
            formData.append('image', values.Image);

            console.log(values.Image);
            saveImgResponse = await axios.post('http://localhost:5269/api/Flight/saveImage', formData, {
                headers: {
                  'Content-Type': 'multipart/form-data' // Specify content type as multipart/form-data
                }
              });
            //   console.log(saveImgResponse);
            //   console.log(saveImgResponse.data.isSuccess);
              if(saveImgResponse.data.isSuccess) 
                {
                    try
                    {
                        console.log("image saved >> in try");
                        console.log(saveImgResponse.data.data);
                        let imageURL = saveImgResponse.data.data;
                        console.log(saveImgResponse);
                        let response = await axios.post(`http://localhost:5269/api/Flight?DepartureTime=${values.DepartureTime}&ArrivalTime=${values.ArrivalTime}&DestinationId=${values.DestinationId}&StartId=${values.StartId}&imageURL=${imageURL}&PlaneId=${values.PlaneId}`, values); 
                       if(response.data.isSuccess)
                        {
                            alert("Flight added successfully");
                        }
                        let data = response.data;
                        console.log(response);
                        console.log(data)
                    }
                    catch(err){
                        seterrMsg(err.response?.data?.message || "An error occurred during adding.");
                    }
                    
                }
        //   let saveImgResponse = await axios.post(`http://localhost:5269/api/Flight/saveImage`, values.Image);  
         
        //   if (data.message === "Token Created Successfully") {
        //   //  navigate("/home");
        //     localStorage.setItem('userToken' , data.token)
        //   //  setUserToken(data.token)
        //   } 
        // } catch (err) {
            else
            {
                seterrMsg("An error occurred during saving image.");
            }
        // }
          setloading(false); 
        
      }
      
    });


    const addFlight = (e) => {
        // e.preventDefault(); 
        // if (!validateForm()) {
        //     return;
        // }
        if(formik.values.DestinationId ===
             formik.values.StartId 
            ||formik.values.ArrivalTime <= formik.values.DepartureTime)
            e.preventDefault();

        if( formik.values.StartId === 
            formik.values.DestinationId)
            { 
               // e.preventDefault(); 
                console.log("prevented");
                document.getElementById("allErrors").innerHTML = "<span className='text-danger'>start airport and destination airport cannot be the same</span>";
            } 
            else
            {
                document.getElementById("allErrors").innerHTML = "<span className='text-danger'></span>";
            }

            if( formik.values.ArrivalTime <= formik.values.DepartureTime)
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

    // const onFileSelected = (event) => {
    //     let reader = new FileReader();
    //     // this.selectedFile = event.target.files[0]; 
    //     reader.readAsDataURL(event.target.files[0]);
    //     reader.onload = () => {
    //       this.image = reader.result;
    //       }
    // } 


    const handleStartAirportChange = (event) => {
        setStartId(event.target.value);
        console.log(StartId);
    };

    const handleDestinationAirportChange = (event) => {
        setDestinationId(event.target.value);
        console.log(DestinationId);
    };

    // const [departureTime, setDepartureTime] = useState(''); 
    // const [arrivalTime, setArrivalTime] = useState('');  
    const [Image, setImage] = useState({});  
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
    console.log(Image);
    };
    }

// validation 
const validateForm = () => {
    const errors = {};
    let isValid = true;

    // Validate selected start airport
    // if (!StartId) {
    //     errors.StartId = "Please select a start airport.";
    //     isValid = false;
    // }

    // Validate selected destination airport
    // if (!DestinationId) {
    //     errors.DestinationId = "Please select a destination airport.";
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
    if (!Image) { 
        errors.Image = "Please select an image.";
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
        <div className='container'>
            <h2 className='text-center text-primary'>New flight</h2>
            <form onSubmit={formik.handleSubmit} encType='multipart/form-data'> 
                <div id='allErrors'></div>

                <div className="form-group m-2">
                    <label htmlFor="StartId" className="d-block">Select start airport:</label>
                    <select 
                        id="StartId" 
                        name='StartId' 
                        onChange={formik.handleChange} 
                        onBlur={formik.handleBlur}
                      //  value={formik.values.startAirport} 
                        className="form-control"
                    >
                        <option value="" label="Select start airport" />
                        {Airports.map((item, index) => (
                            <option key={item.id} value={item.id}>{item.name}</option>
                        ))}
                    </select>
                    {formik.errors.startAirport && formik.touched.startAirport && <p className="text-danger">{formik.errors.startAirport}</p>}
                </div>

                <div className="form-group m-2">
                    <label htmlFor="DestinationId" className="d-block">Select destination airport:</label>
                    <select 
                        id="DestinationId" 
                        name='DestinationId' 
                        onChange={formik.handleChange} 
                        onBlur={formik.handleBlur}
                        value={formik.values.destinationAirport} 
                        className="form-control"
                    >
                        <option value="" label="Select destination airport" />
                        {Airports.map((item) => (
                            <option key={item.id} value={item.id}>{item.name}</option>
                        ))}
                    </select>
                    {formik.errors.destinationAirport && formik.touched.destinationAirport && <p className="text-danger">{formik.errors.destinationAirport}</p>}
                </div>


                <div className="form-group m-2">
                    <label htmlFor="PlaneId" className="d-block">Select Plane:</label>
                    <select 
                        id="PlaneId" 
                        name='PlaneId' 
                        onChange={formik.handleChange} 
                        onBlur={formik.handleBlur}
                        value={formik.values.PlaneId} 
                        className="form-control"
                    >
                        <option value="" label="Select Plane" />
                        {Planes.map((item) => (
                            <option key={item.id} value={item.id}>{item.name}</option>
                        ))}
                    </select>
                    {formik.errors.PlaneId && formik.touched.PlaneId && <p className="text-danger">{formik.errors.PlaneId}</p>}
                </div>

                <div className="form-group m-2">
                    <label htmlFor="departureTime" className='d-block'>Departure time : </label>
                    <input 
                        className='d-block' 
                        id='DepartureTime'
                        name='DepartureTime' 
                        type='datetime-local'
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.DepartureTime}
                    />
                    {formik.errors.DepartureTime && formik.touched.DepartureTime && <p className="text-danger">{formik.errors.DepartureTime}</p>}
                </div>

                <div className="form-group m-2">
                    <label htmlFor="arrivalTime" className='d-block'>Arrival time : </label>
                    <input 
                        className='d-block' 
                        id='ArrivalTime' 
                        name='ArrivalTime'
                        type='datetime-local' 
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.arrivalTime} 
                    />
                    {formik.errors.arrivalTime && formik.touched.arrivalTime && <p className="text-danger">{formik.errors.arrivalTime}</p>}
                </div>

                <div className="form-group m-2">
                    <label htmlFor="Image" className='d-block'>Image : </label>
                    <input 
                        className='d-block' 
                        id='Image' 
                        name='Image'
                        type='file' 
                        onBlur={formik.handleBlur}
                        onChange={(event) => {
                            formik.setFieldValue("Image", event.currentTarget.files[0]);
                        }}
                    />
                    {formik.errors.Image && formik.touched.Image && <p className="text-danger">{formik.errors.Image}</p>}
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