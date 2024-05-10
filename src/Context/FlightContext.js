import axios from "axios";
import { createContext, useState } from "react";

export let FlightContext = createContext()

export default function FlightContextProvider (props){
    let headers = { token: localStorage.getItem("userToken") };

    const [flight , setFlight] = useState(0); 
    function AddTicket (id ,secction ,price ,FlightClass ,flightID) {
        return axios.post (
            'http://localhost:5269/api/Ticket',
            {
                section : secction ,
                price :price ,
                class :FlightClass,
                passengerId : id ,
                flightId : flightID 
            } , 
            {
                headers:headers
            }
        )
    }
    return (
        <FlightContext.Provider value={{AddTicket }}>
            {props.children}
        </FlightContext.Provider>
    )
}