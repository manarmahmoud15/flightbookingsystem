import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import SignIn from "./components/SignIn/SignIn";
import SignUp from "./components/SignUp/SignUp";
import NotFound from "./components/NotFound/NotFound";
import TokenContextProvider from "./Context/TokenContext";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import MostVisited from "./components/MostVisited/MostVisited";
import FlightDetails from "./components/FlightDetails/FlightDetails";
import About from "./components/About/About";
import AddTicket from "./components/AddTicket/AddTicket";
import FlightsDashboard from "./components/FlightsDashboard/FlightsDashboard";
import FlightDashboardContextProvider from "./Context/flightDashboardContext";
import ConfirmEmail from "./components/ConfirmEmail/ConfirmEmail";
import ConfirmationMessage from "./components/ConfirmationMessage/ConfirmationMessage";
import Ticket from "./components/Ticket/Ticket";
import ShowAllFlight from "./components/ShowAllFlight/showAllFlight";
import ForgetPassword from "./components/forgetPassword/forgetPassword";
import FlightContextProvider from "./Context/FlightContext";
import PassengerContextProvider from "./Context/PassengerIDContext";
import SearchDataContextProvider from "./Context/SearchFlightContext";
import TicketContextProvider from "./Context/TicketContext";
import NewFlight from "./components/NewFlight/NewFlight";
import AddPassengerContextProvider from "./Context/AddPassengerContext";
import Thanks from "./components/Thanks/Thanks"
import BeforeTravel from "./components/BeforeTravel/BeforeTravel";
import EditFlight from './components/EditFlight/EditFlight'
import AddNewPassenger from "./components/AddPassenger/AddPassenger";

const router = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        path: "",
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "home",
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "MostVisited",
        element: (
          <ProtectedRoute>
            {" "}
            <MostVisited />{" "}
          </ProtectedRoute>
        ),
      },
      {
        path: "addpassenger",
        element: (
          <ProtectedRoute> 
            {" "}
            <AddNewPassenger />{" "}
          </ProtectedRoute>
        ),
      },
      {
        path: "edit",
        element: (
          <ProtectedRoute>
            <EditFlight/>
          </ProtectedRoute>
        ),
      },
      {
        path: "NewFlight",
        element: (
          <ProtectedRoute>
            <NewFlight />
          </ProtectedRoute>
        ),
      },
      { path: "signin", element: <SignIn /> },
      { path: "signup", element: <SignUp /> },
      {
        path: "flightdashboard",
        element: (
          <ProtectedRoute>
            <FlightsDashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "FlightDetails/:id",
        element: (
          <ProtectedRoute>
            <FlightDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "about",
        element: (
          <ProtectedRoute>
            <About />
          </ProtectedRoute>
        ),
      },
      {
        path: "ticket",
        element: (
          <ProtectedRoute>
            <Ticket />
          </ProtectedRoute>
        ),
      },
      {
        path: "ShowAllFlight",
        element: (
          <ProtectedRoute>
            <ShowAllFlight />
          </ProtectedRoute>
        ),
      },
      {
        path: "addticket/:id",
        element: (
          <ProtectedRoute>
            <AddTicket />
          </ProtectedRoute>
        ),
      },
      {
        path: "thank",
        element: (
          <ProtectedRoute>
            <Thanks/>
          </ProtectedRoute>
        ),
      },
      {
        path: "beforetravel",
        element: (
          <ProtectedRoute>
            <BeforeTravel/>
          </ProtectedRoute>
        ),
      },


    ],
  },
  { path: "*", element: <NotFound /> },
  { path: "ConfirmEmail", element: <ConfirmEmail /> },
  { path: "ConfirmationMessage", element: <ConfirmationMessage /> },
  { path: "changePassword", element: <ForgetPassword /> },
  { path: "NewFlight", element: <NewFlight /> },
]);

function App() {
  return (
    <div>
      <FlightDashboardContextProvider>
        <TokenContextProvider>
          <SearchDataContextProvider>
            <PassengerContextProvider>
              <TicketContextProvider>
                <FlightContextProvider>
                  <AddPassengerContextProvider>
                    <RouterProvider router={router}></RouterProvider>
                  </AddPassengerContextProvider>
                </FlightContextProvider>
              </TicketContextProvider>
            </PassengerContextProvider>
          </SearchDataContextProvider>
        </TokenContextProvider>
      </FlightDashboardContextProvider>
    </div>
  );
}

export default App;
