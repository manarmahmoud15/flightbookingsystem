import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export default function FlightCard(props) {
  const { flightDetails } = props;
  const navigate = useNavigate();
  const mostVisitedCardRef = useRef(null);
  console.log('img',flightDetails.imageURL)
  
  useEffect(() => {
    const mostVisitedCard = document.querySelectorAll('.mostVisitedCard');
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
            observer.unobserve(entity.target);
          }, 500 * Math.pow(2, index));
        }
      });
    }, options);

    mostVisitedCard.forEach(card => {
      observer.observe(card);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="mx-auto">
    <div>
      <div className="card mostVisitedCard" style={{ width: "18rem", opacity: 0 }} ref={mostVisitedCardRef}>
        <img className="card-img-top" src={`http://localhost:5269/Images//${flightDetails.imageURL}`} alt="Card cap" />
        <div className="card-body">
          <h5 className="card-title">From <span style={{ color: 'hsl(199, 100%, 33%)' }}> {flightDetails.sourceAirportName}</span></h5>
          <h5 className="card-title">
            <i className="fa-solid fa-location-dot text-info"></i> To <span style={{ color: 'hsl(199, 100%, 33%)' }}>{flightDetails.destinationAirportName}</span>
            <span style={{ position: 'absolute', right: '7%' }}>
              <strong>57$</strong>
            </span>
          </h5>
          <hr />
          <p className="card-text">
            Duration Time <span style={{ color: 'hsl(199, 100%, 33%)' }}>{flightDetails.duration}</span>
          </p>
          <hr />
          <button
            className="btn btn-primary"
            onClick={() => navigate(`/FlightDetails/${flightDetails.id}`)}
          >
           <i className="fa-solid fa-circle-info text-light"></i>  Details
          </button>
        </div>
      </div>

    </div>
    </div>
  );
}
