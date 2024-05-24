import axios from "axios";
import { createContext, useContext, useState, useEffect } from "react";
import { passengerContext } from "./PassengerIDContext";

export let AddPassengerContext = createContext();

export default function AddPassengerContextProvider(props) {
    let headers = { token: localStorage.getItem("userToken") };
    let { passengerId, setPassengerID } = useContext(passengerContext);
    localStorage.getItem('passengerId', null);

    function AddPassenger(PassengerName, gender, age, isChild, passportNum, nationalId, flightId) {
        console.log('fun');
        console.log("Context:", { PassengerName, gender, age, isChild, passportNum, nationalId, flightId });
        
        axios.post(
            'http://localhost:5269/api/Passenger',
            {
                name: PassengerName,
                gender: gender,
                age: age,
                isChild: isChild,
                passportNum: passportNum,
                nationalId: nationalId,
                flightId: flightId,
            },
            {
                headers: headers
            }
        )
        .then(response => {
            console.log("New Passenger ID:", response.data.data);
            setPassengerID(response.data.data);
            localStorage.setItem('passengerId', response.data.data);
        })
        .catch(error => {
            console.error("Failed to add passenger:", error.message);
        });
    }

    useEffect(() => {
        console.log('Updated passengerId:', passengerId);
    }, [passengerId]);

    return (
        <AddPassengerContext.Provider value={{ AddPassenger }}>
            {props.children}
        </AddPassengerContext.Provider>
    );
}
