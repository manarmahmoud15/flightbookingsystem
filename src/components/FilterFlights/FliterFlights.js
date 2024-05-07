// import axios from "axios";
// import { useEffect, useState } from "react";

// let FilterFlight = () => {
//     const [flights, setFlights] = useState([]);

//     useEffect(() => {
//         const fetchData = async () => {
//           try {
//             const response = await axios.get("http://localhost:5269/api/Flight");
//             setFlights(response.data.data);
//           } catch (error) {
//             console.error("Failed to fetch flights:", error);
//           }
//         };
//         fetchData();
//   }, []);
//     return (
//         <div>
//             <select name="from">
//                 {flights.map((flight) => {
//                     <option>{flight.sourceAirportName}</option>
//                 })}
                
//             </select>
//         </div>
//     )
// }
