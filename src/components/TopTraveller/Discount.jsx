import React from "react";
import "../TopTraveller/Discount.css";
import img1 from "../../Assets/imgs/Aswan.jpeg";
import img2 from "../../Assets/imgs/Egyp.jpeg";
import img4 from "../../Assets/imgs/Turky.jpeg";
import img6 from "../../Assets/imgs/Dubai.webp";
import img7 from "../../Assets/imgs/Swizerland.jpeg";
import img8 from "../../Assets/imgs/Germany.jpeg";
export default function Discount() {
  return (
    <div className="my-5">
      <h1
        className="d-flex justify-content-center "
        style={{ color: "hsl(199,100%,33%)" }}
      >
        TOURISM TRIPS DISCOUNTS
      </h1>
      <div className="cardContainer">
        <figure className="cardPosition me-3 col-3">
          <img src={img2} alt="Mountains" />
          <figcaption>Egypt</figcaption>
          <span className="badge">20% OFF</span>
        </figure>
       <figure className="cardPosition me-3 col-3">
          <img src={img1} alt="Mountains" />
          <figcaption>Aswan</figcaption>
          <span className="badge">10% OFF</span>
        </figure>
      <figure className="cardPosition me-3 col-3">
          <img src={img4} alt="Mountains" />
          <figcaption>Turky</figcaption>
          <span className="badge">25% OFF</span>
        </figure>
         <figure className="cardPosition me-3 col-3">
          <img src={img8} alt="Mountains" />
          <figcaption>Germany</figcaption>
          <span className="badge">11% OFF</span>
        </figure>
        <figure className="cardPosition me-3 col-3">
          <img src={img6} alt="Mountains" />
          <figcaption>Dubai</figcaption>
          <span className="badge">5% OFF</span>
        </figure>
      <figure className="cardPosition me-3 col-3">
          <img src={img7} alt="Mountains" />
          <figcaption>SwizerLand</figcaption>
          <span className="badge">30% OFF</span>
        </figure>
      </div>
    </div>
  );
}
