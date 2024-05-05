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
<<<<<<< HEAD
import FlightsDashboard from "./components/FlightsDashboard/FlightsDashboard";
import FlightDashboardContextProvider from "./Context/flightDashboardContext";
=======
<<<<<<< HEAD
import { Provider } from "react-redux";
import store from "./redux/store";
=======
import About from "./components/About/About";
>>>>>>> 001070033b49f9c6a27f6e9bd522aec227541c18

>>>>>>> a77586d72cbdde1626b66736aa2888b9388d4019
const router = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      { path: "", element:<ProtectedRoute><Home /></ProtectedRoute>  },
      { path: "home", element: <ProtectedRoute><Home /></ProtectedRoute>  },
      { path: "MostVisited", element:<ProtectedRoute> <MostVisited/> </ProtectedRoute>  },
      { path: "product", element:<ProtectedRoute><Details /> </ProtectedRoute> },
      { path: "signin", element: <SignIn /> },
      { path: "signup", element: <SignUp /> },
      { path: "flightdashboard", element:<ProtectedRoute><FlightsDashboard/></ProtectedRoute>  },
      { path: "FlightDetails", element: <FlightDetails /> },
      { path: "about", element: <About /> },
    ],
  },
  { path: "*", element: <NotFound /> },

]);

function App() {
  return (
<<<<<<< HEAD
    <div>
      <FlightDashboardContextProvider>
        <TokenContextProvider>
          <RouterProvider router={router}></RouterProvider>
        </TokenContextProvider>
      </FlightDashboardContextProvider>
    </div>
=======
    <TokenContextProvider >

      <RouterProvider router={router}></RouterProvider>
    </TokenContextProvider>
>>>>>>> a77586d72cbdde1626b66736aa2888b9388d4019
  );
}

export default App;