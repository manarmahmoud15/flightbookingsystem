import React from 'react'
import data from '../../data.json'
import FlightCard from '../FlightCard/FlightCard';

export default function MostVisited() {
 // const mostVisitedCards = document.querySelectorAll('.mostVisitedCard');
const mostVisitedFlights = data.mostVisitedFlights;


  return (
<div className="container d-flex row row-cols-1 row-cols-md-3 g-4 m-5">

{mostVisitedFlights.map((flight) => {
return(
<FlightCard flightDetails = {flight}/>
)
})}

</div>
  )
}
