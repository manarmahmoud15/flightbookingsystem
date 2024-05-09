import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import SignIn from "./components/SignIn/SignIn";
import SignUp from "./components/SignUp/SignUp";
import NotFound from "./components/NotFound/NotFound";
import TokenContextProvider from "./Context/TokenContext";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import MostVisited from './components/MostVisited/MostVisited'
import Details from './components/Details/Details'
import FlightDetails from "./components/FlightDetails/FlightDetails";
import About from "./components/About/About";
// import { Provider } from "react-redux";
// import store from "./redux/store";

import FlightsDashboard from "./components/FlightsDashboard/FlightsDashboard";
import FlightDashboardContextProvider from "./Context/flightDashboardContext";
import { Provider } from "react-redux";
import store from "./redux/store";
import ConfirmEmail from './components/ConfirmEmail/ConfirmEmail'
import ConfirmationMessage from "./components/ConfirmationMessage/ConfirmationMessage";
import Ticket from './components/Ticket/Ticket'


const router = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      { path: "", element:<ProtectedRoute><Home /></ProtectedRoute>},
      { path: "home", element: <ProtectedRoute><Home /></ProtectedRoute> },
      { path: "MostVisited", element:<ProtectedRoute> <MostVisited/> </ProtectedRoute>},
      { path: "product", element:<ProtectedRoute><Details /> </ProtectedRoute>},
      // { path: "ticket", element:<ProtectedRoute><Ticket/></ProtectedRoute> },
      { path: "signin", element: <SignIn /> },
      { path: "signup", element: <SignUp /> },
      // {path:"ConfirmEmail", element:<ConfirmEmail/>},
      { path: "flightdashboard", element:<ProtectedRoute><FlightsDashboard/></ProtectedRoute>  },
      { path: "FlightDetails", element: <FlightDetails /> },
      { path: "about", element: <About/> },
    ],
  },
  { path: "*", element: <NotFound /> },
  {path:"ConfirmEmail", element:<ConfirmEmail/>},
  {path:"ConfirmationMessage", element:<ConfirmationMessage/>},
  { path: "ticket", element:<ProtectedRoute><Ticket/></ProtectedRoute> }
]);

function App() {
  return (
    <div>
      <FlightDashboardContextProvider>
        <TokenContextProvider>
          <RouterProvider router={router}></RouterProvider>
        </TokenContextProvider>
      </FlightDashboardContextProvider>
    </div>


  );
}

export default App;