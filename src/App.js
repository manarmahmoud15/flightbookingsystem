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
import FlightsDashboard from "./components/FlightsDashboard/FlightsDashboard";
import FlightDashboardContextProvider from "./Context/flightDashboardContext";
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
    ],
  },
  { path: "*", element: <NotFound /> },

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