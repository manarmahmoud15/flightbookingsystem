import { createContext, useState } from "react";

export let ticketContext = createContext ()
export default function TicketContextProvider (props){
    const [ticketData , SetTicketData] = useState (null)
    return (
        <ticketContext.Provider value={{ticketData , SetTicketData}}>
            {props.children}
        </ticketContext.Provider>
    )
} 