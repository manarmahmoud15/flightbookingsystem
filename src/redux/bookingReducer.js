import { Booking, Delete } from "./actionTypes";

const initialState = {
    data : []
}
const bookingReducer = (state = initialState , action) => {
    switch(action.type){
        case Booking :
            const newData =[...state.data];
            newData.push(action.payload);
            return {data : newData}  ;
        case Delete :
            const FilteredData = state.data.filter((flight) => flight.id !== action.payload)
            return {data : FilteredData}  ;
        default:
           return state;

    }

}
export default bookingReducer