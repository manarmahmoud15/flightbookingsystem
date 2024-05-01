import React from 'react'

export default function FlightCard(props) {
const {flightDetails} = props;
const mostVisitedCard = document.querySelectorAll('.mostVisitedCard')
const options = {
    root: null,
    rootMargin: '0px', 
    threshold: 0.5
  };
  
  const observer = new IntersectionObserver((entities, observer) => {
    entities.forEach((entity, index) => {
      if (entity.isIntersecting) {
        setTimeout(() => {
          entity.target.style.opacity = 1;
       //   localStorage.setItem(`opacityCard${index}` , '1');
        }, 500 * Math.pow(2, index));
      observer.unobserve(entity.target);
      }
    });
  }, options);
  
  mostVisitedCard.forEach(card => {
    observer.observe(card);      
  });
//   mostVisitedCard.forEach((card, index) => {
//     const opacity = localStorage.getItem(`opacityCard${index}`);
//     if( opacity === '1')
//     {
//         card.style.opacity = 1;
//         observer.unobserve(card);   // saeed: comment , decomment "work"
//     }
//     else
//     {
//         observer.observe(card);      
//     }
//   });

  return (
    <div>
      <div className="card mostVisitedCard" style={{ width: "18rem" }}>
  <img className="card-img-top" src={flightDetails.image} alt="Card cap" /> 
  <div className="card-body">
    <h3 className="card-title">{flightDetails.country}</h3>

    <h5 className="card-title">
         <i class="fa-solid fa-location-dot text-info"></i> {flightDetails.city}
         <span style={{position: 'absolute', right : '7%'}}> 
         <strong>{flightDetails.price}$ </strong> </span>
    </h5>

    <hr></hr>
    <p className="card-text">
     {flightDetails.description}
    </p>
    <hr></hr>
    <a href="sd" className="btn btn-info">
    <i class="fa-solid fa-circle-info text-light"></i>  Details 
    </a>
  </div>
</div>
    </div>
  )
}