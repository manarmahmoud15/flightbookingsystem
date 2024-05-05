// // app/store.js
// import { configureStore } from '@reduxjs/toolkit';
// import counterSlice from './counterSlice';
import { createStore } from "redux";
import bookingReducer from "./bookingReducer";

// export let store = configureStore({
//   reducer: {
//     counter: counterSlice
//   }
// });

// export default store;

const store = createStore(bookingReducer)
export default store