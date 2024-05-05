import { Booking, Delete } from "./actionTypes"

export const makeBooking = (data) => {
    return {
        type : Booking ,
        payload : data ,
    }
}
export const deleteBooking = (id) => {
    return {
        type :Delete ,
        payload : id,
    }
}