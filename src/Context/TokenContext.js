import { createContext, useState } from "react";

export let userContext = createContext();

export default function TokenContextProvider(props) {
    const [userToken, setUserToken] = useState(null);
    return (
        <userContext.Provider value={{userToken, setUserToken}}>
            {props.children}
        </userContext.Provider>
    );
}
