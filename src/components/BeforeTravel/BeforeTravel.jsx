import React from "react";
import "./BeforeTravel.css";
import img1 from "../../Assets/imgs/Stranded traveler-bro.png";
import img2 from "../../Assets/imgs/Hotel Booking-rafiki.png";
import img3 from "../../Assets/imgs/Toronto-amico.png";
export default function BeforeTravel() {
  return (
    <div className="mt-3 mb-3 beforetravel container-fluid d-flex flex-column justify-content-center align-items-center">
      <div>
        <h1>Before Travel</h1>
        <p style={{ fontSize: '20px' }}>Know our Services to have a better travel</p>
      </div>
      <div className="d-flex mx-auto justify-content-space-between">
        <div className="Image ms-5 me-5">
          <div className="rounded-image">
            <img alt="img" src={img1} />
          </div>
          <p style={{ fontSize: '20px' }} className="ms-4 mt-2">Badgges</p>
        </div>

        <div className="Image me-5">
          <div className="rounded-image">
            <img alt="img" src={img2} />
          </div>
          <p style={{ fontSize: '20px' }} className="ms-4 mt-2">Hotels</p>
        </div>

        <div className="Image me-5">
          <div className="rounded-image">
            <img alt="img" src={img3} />
          </div>
          <p style={{ fontSize: '20px' }} className="ms-4 mt-2">FamilyDiscount</p>
        </div>
      </div>
    </div>
  );
}

