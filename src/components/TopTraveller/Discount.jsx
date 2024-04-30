
import React from 'react'
import '../TopTraveller/Discount.css'
import img1 from "../../Assets/imgs/Aswan.jpeg";
import img2 from "../../Assets/imgs/Egyp.jpeg";
import img3 from "../../Assets/imgs/London.jpeg";
import img4 from "../../Assets/imgs/Turky.jpeg";
import img5 from "../../Assets/imgs/uk.jpeg";
import img6 from "../../Assets/imgs/Dubai.webp";
import img7 from "../../Assets/imgs/Swizerland.jpeg";
import img8 from "../../Assets/imgs/Germany.jpeg"
export default function Discount() {
    return (
<>
      <h1 className='d-flex justify-content-center ' style={{color:"hsl(199,100%,33%)"}}>TOURISM TRIPS DISCOUNTS</h1>
      <div className='cardContainer'>
      <figure className='me-3'>
      <img src={img2} alt="Mountains"/>
      <figcaption>Egypt</figcaption>
  </figure>
  <figure className='me-3'>
      <img src={img1} alt="Mountains"/>
      <figcaption>Aswan</figcaption>
  </figure>
  <figure className='me-3' >
      <img src={img4} alt="Mountains"/>
      <figcaption>Turky</figcaption>
  </figure>
  <figure className='me-3' >
      <img src={img8} alt="Mountains"/>
      <figcaption>Germany</figcaption>
  </figure>
  <figure className='me-3'>
      <img src={img6} alt="Mountains"/>
      <figcaption>Dubai</figcaption>
  </figure>
  <figure  className='me-3'>
      <img src={img7} alt="Mountains"/>
      <figcaption>SwizerLand</figcaption>
  </figure>
</div>
</>
    )

  }
