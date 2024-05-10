import React, { useEffect, useState } from "react";
import { number } from "yup";

export default function FlightDetails() {

const basicPrice = 2000;  // will be calculated based on flight duration 
const [childrenNumber, setChildrenNumber] = useState(0);
const [childrenClass, setChildrenClass] = useState("economy");
const [childrenPrice, setChildrenPrice] = useState(0);


// const [childrenPrice, setChildrenPrice] = useState(0);
const childrenNumberChanged = (e) => {
setChildrenNumber( e.target.value)
console.log(childrenNumber);
}

const [adultNumber, setAdultNumber] = useState(0);
const [adultClass, setAdultClass] = useState("economy");
const [adultPrice, setAdultPrice] = useState(0);

const adultNumberChanged = (e) => {
setAdultNumber(e.target.value)
}

const childrenClassChanged = (e) => {
 // if(e.target.value == "economy")
  setChildrenClass(e.target.value)
// else
// setChildrenPrice(childrenPrice * 1.5)
}

const adultClassChanged = (e) => {
  // if(e.target.value == "economy")
   setAdultClass(e.target.value)
 // else
 // setChildrenPrice(childrenPrice * 1.5)
 }

 const totalPrice = adultPrice + childrenPrice;
 const totalNumber = (Number) (adultNumber) + (Number)(childrenNumber);
const [classes, setClasses] = useState(["economy" , "VIP"]);


useEffect(() => {
 // let newChildrenPrice = 0;
  // Calculate childrenPrice whenever childrenNumber changes
  switch(childrenClass)
  {
    case "economy" :
    setChildrenPrice(basicPrice * childrenNumber * 0.8);
    break;

    case "VIP" : 
    setChildrenPrice(basicPrice * childrenNumber * 0.8 * 1.5);
    break;

    default : 
    alert("Invalid Inputs");
    break;
  };

  switch(adultClass)
  {
    case "economy" :
    setAdultPrice(basicPrice * adultNumber);
    break;

    case "VIP" : 
    setAdultPrice(basicPrice * adultNumber * 1.5);
    break;

    default : 
    alert("Invalid Inputs");
    break;
  };

}, [childrenNumber, childrenClass, adultClass, adultNumber]);


  return (
    <div
      style={{ backgroundColor: "#f8f9fa", width: "100%", minHeight: "100vh" }}
      className="p-4 d-flex align-items-center justify-content-center"
    >
      <div className="card bg-light container shadow mx-auto">
        <div className="row m-4 align-items-center">
          <div className="col-md-1 text-center">
            <i className="fa-solid fa-plane-departure" style={{ fontSize: "30px" }}></i>
          </div>

          <div className="col-md-2">
            <strong style={{ fontSize: "20px" }}>American Airlines</strong>
          </div>

          <div className="col-md-2 text-center">
            <i className="fa-solid fa-plane text-warning" style={{ fontSize: "30px" }}></i>
            <br></br> <small>11-02-2024</small>
          </div>

          <div className="col-md-3">
            <strong style={{ fontSize: "18px" }}>01:05</strong>
            <i className="fa-solid fa-arrow-right px-2" style={{ fontSize: "25px" }}></i>
            <strong style={{ fontSize: "18px" }}>11:09</strong>
            <br></br> DAC &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; JDK
          </div>

          <div className="col-md-2">
            <p style={{ fontWeight: "lighter" }} className="d-inline">
              6H 55min
            </p>
            <br></br> <span style={{ fontWeight: "bold" }}>No stop</span>
          </div>

          <div className="col-md-2 border">
            <div className="p-2"> {totalPrice} $</div>
            <div className="p-2">
              3 seat <span className="fw-light">available</span>
            </div>
            <button className="btn btn-danger w-100 m-2">Book Now</button>
          </div>
          <hr></hr>
        </div>

        <div className="row">
          <div className="col-md-8">
            <div className="container border">
              <div className="row p-2">
                <div className="col-md-3 fw-light fs-5">Departure</div>
                <div className="col-md-3 fs-5">31h 25min</div>
                <div className="col-md-3 fs-5"> Return</div>
                <div className="col-md-3 fs-5">31h 25min</div>
              </div>
              <div className="row p-1">
                <div className="col-md-6">
                  DAC
                  <i className="fa-solid fa-plane text-warning mx-3" style={{ fontSize: "20px" }}></i>
                  JFK
                </div>

                <div className="col-md-6">
                  JFK
                  <i className="fa-solid fa-plane text-warning mx-3" style={{ fontSize: "20px" }}></i>
                  DAC
                </div>
              </div>
              <hr></hr>
              <div className="row">
                <div className="col-md-1 text-center">
                  <i className="fa-solid fa-plane-departure"></i>
                  <br></br>
                  <span className="vl m-2"></span>
                  <br></br>
                  <i
                    className="fa-solid fa-plane text-warning mx-1"
                    style={{ fontSize: "13px", transform: "rotate(90deg)" }}
                  ></i>
                  {/* <br></br> */}
                
                </div>
                <div className="col-md-4">
                  <strong style={{ fontSize: "22px" }}>01:05</strong>{" "}
                  <span className="fw-light p-2">11-02-2024</span>
                <i className="fa-solid fa-arrow-right px-4" style={{ fontSize: "25px" }}></i>
                  <br></br>6 hr 55 min
                </div>
                <div className="col-3">
                <strong style={{ fontSize: "22px" }}>11:09</strong>{" "}
                <span className="fw-light p-2">11-02-2024</span>
                </div>
              </div>

              <div className="row p-1">
                <div className="col-1">
                <span className="vl mx-3"></span>
                  <br></br>
                  <i className="fa-solid fa-location-dot p-2"></i>
                </div>
                
               <div className="col">
American airlines hg475
<p> Zia international airport TH, Dhake (Bangladesh) </p>
<div className="bg-warning w-100 p-2 row">
  <span className="col-2 col-md-2 fw-bolder" style={{fontSize: "16px"}}>Destination</span>
  <span className=" col-4 col-md-10">John Kennedy International Airport</span>
</div>

              </div>
            
              </div>
           
            </div>
          </div>
          <div className="col-md-4 bg-warning">
       <h4 className="text-center p-2"> Fare summary </h4>
       <hr></hr>

       <div className="row m-2">
        <div className="col-6 fw-light">
        Fare summary
        </div>
        <div className="col-3 fw-light">
         Class
        </div>
        <div className="col-3 fw-light">
         Base fare 
        </div>
       </div>

       <div className="row m-2">
        <div className="col-6 fw-light">
        <strong> Child </strong> <input onChange={childrenNumberChanged} type="number" placeholder="0" className="w-25 mx-2"/>
        </div>
        <div className="col-3 fw-light">
        <select onChange={childrenClassChanged}> 
        {classes.map((classItem, index) => (
             <option key={index}>{classItem}</option>
         ))}
         </select>
  
        </div>
        <div className="col-3 fw-light">
        {childrenPrice} $
        </div>
       </div>

       <div className="row m-2">
        <div className="col-6 fw-light">
        <strong> Adult </strong> <input onChange={adultNumberChanged} type="number" placeholder="0" className="w-25 mx-2"/>
        </div>
        <div className="col-3 fw-light">
        <select onChange={adultClassChanged}> 
        {classes.map((classItem, index) => (
             <option key={index}>{classItem}</option>
         ))}
         </select>        </div>
        <div className="col-3 fw-light">
        {adultPrice} $
        </div>
       </div>
<hr></hr>

<div className="row mx-2">
<strong className="col-2 d-inline">Total</strong>
<strong className="d-inline offset-4 col-3" style={{fontSize : "18px"}}>
  {totalPrice} $</strong>
</div>

<div className="row fw-light mx-3">
{totalNumber} Traveller
</div>


          </div>
        </div>
      </div>
    </div>
  );
}
