import { createContext, useState } from "react";

export let passengerContext = createContext()
export default function PassengerContextProvider (props){
    const [passengerId , setPassengerID] = useState('')
    return (
        <passengerContext.Provider value={{passengerId , setPassengerID}}>
            {props.children}
        </passengerContext.Provider>

    )
}