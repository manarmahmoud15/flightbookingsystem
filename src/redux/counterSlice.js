import { createSlice } from "@reduxjs/toolkit";

let counterSlice = createSlice ({
    name:'counter',
    initialState:{
        name:'from'
    },
    reducers:{
        changeName: ()=> {
            console.log('hello')
        }
    }
})
export default counterSlice.reducer