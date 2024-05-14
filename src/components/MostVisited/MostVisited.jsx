import React, { useEffect, useState } from 'react'
import FlightCard from '../FlightCard/FlightCard';
import axios from 'axios';

export default function MostVisited() {
  const [mostVisitedFlights, setMostVisited] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("http://localhost:5269/api/Flight");
        setMostVisited(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.error("Failed to fetch flights:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="container d-flex row row-cols-1 row-cols-md-3 g-4 m-5">
      {mostVisitedFlights.map((flight) => (
        <FlightCard key={flight.id} flightDetails={flight} />
      ))}
    </div>
  );
}
