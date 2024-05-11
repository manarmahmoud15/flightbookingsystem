import { createContext, useState } from "react";

export let SearchFlightContext= createContext();
export default function SearchDataContextProvider(props){
    const [searchData, setSearchData] = useState({
        source: "",
        destination: "",
        checkIn: "",
        checkOut: "",
      });
      const selectFlight = (flightData) => {
        setSearchData(flightData);
      };
    
      const updateSearchData = (newData) => {
        setSearchData((prevData) => ({
          ...prevData,
          ...newData,
        }));
      };

return <SearchFlightContext.Provider value={{ searchData, updateSearchData , selectFlight ,setSearchData}}>
{props.children}
</SearchFlightContext.Provider>
}
