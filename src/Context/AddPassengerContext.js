import axios from "axios";
import { createContext, useContext, useState } from "react";
import { passengerContext } from "./PassengerIDContext";

export let AddPassengerContext = createContext()

export default function AddPassengerContextProvider (props){
    let headers = { token: localStorage.getItem("userToken") };
    // let{passengerId,setPassengerID} =useContext(passengerContext)

    // const [flight , setFlight] = useState(0); 4
    localStorage.getItem('passengerId' ,null)


    function AddPassenger (PassengerName ,gender ,age ,isChild,passportNum ,nationalId ,flightId ) {
        console.log("Context:", {PassengerName ,gender ,age ,isChild,passportNum ,nationalId ,flightId });
         axios.post (

            'http://localhost:5269/api/Passenger',
            {
                name : PassengerName ,
                gender :gender ,
                age :age,
                isChild : isChild ,
                passportNum : passportNum ,
                nationalId : nationalId ,
                flightId : flightId , 
            } , 
            {
                headers:headers
            }
        )
        .then(response => {

           console.log("New Passenger ID:", response.data.data);
            // setPassengerID(response.data.data)
            localStorage.setItem('passengerId' , response.data.data)
            // console.log('d' ,passengerId)

        })
        .catch(error => {
            console.error("Failed to add passenger:", error.message);
        });
    }
    return (
        <AddPassengerContext.Provider value={{AddPassenger }}>
            {props.children}
        </AddPassengerContext.Provider>
    )
}