import "./App.css";
import Home from "./Pages/Home";
import { Routes, Route, Router } from "react-router-dom";
import Profile from "./Pages/Profile";
import Individual from "./Pages/Individual";
import Orders from "./Pages/Orders";
import Booking from "./Pages/Booking";
import DashBoardOrders from "./Pages/DashBoardOrders";
import DashBoardCards from "./Pages/DashBoardCards";
import DashBoardSingleOrder from "./Pages/DashBoardSingleOrder";
import DashBoardAmenities from "./Pages/DashBoardAmenities";
import DashBoardProperties from "./Pages/DashBoardProperties";
import DashBoardSingleProperty from "./Pages/DashBoardSingleProperty";
import DashBoardAddProperty from "./Pages/DashBoardAddProperty";
import DashBoardEditProperty from "./Pages/DashBoardEditProperty";
import { ToastContainer } from "react-toastify";

import IndividualOrder from "./Pages/IndividualOrder";
import Gallery from "./Pages/Gallery";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/property/:id" element={<Individual />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/booking" element={<Booking />} />

        {/* Orders */}
        <Route path="/dashboard/order" element={<DashBoardOrders />} />
        <Route path="/dashboard/order/:id" element={<DashBoardSingleOrder />} />

        {/* Amenities */}
        <Route path="/dashboard/amenity" element={<DashBoardAmenities />} />
        <Route path="/dashboard/card" element={<DashBoardCards />} />
        <Route path="/dashboard/property" element={<DashBoardProperties />} />
        <Route
          path="/dashboard/property/add"
          element={<DashBoardAddProperty />}
        />
        <Route
          path="/dashboard/property/:id"
          element={<DashBoardEditProperty />}
        />
        <Route path="/booking/:validity/:id" element={<IndividualOrder />} />
        <Route path="/gallery/:id" element={<Gallery />} />

        {/* Orders */}
        <Route path="/dashboard/order" element={<DashBoardOrders />} />
        <Route path="/dashboard/order/:id" element={<DashBoardSingleOrder />} />

        {/* Amenities */}
        <Route path="/dashboard/amenity" element={<DashBoardAmenities />} />
        <Route path="/dashboard/card" element={<DashBoardCards />} />
        {/* <Route element={<PrivateRoute role="admin" />}> */}
        <Route path="dashboard/property" element={<DashBoardProperties />} />
        {/* </Route> */}

        <Route
          path="/dashboard/property/add"
          element={<DashBoardAddProperty />}
        />
        <Route
          path="/dashboard/property/:id"
          element={<DashBoardEditProperty />}
        />
      </Routes>
      {/* <Home /> */}
      <ToastContainer />
    </div>
  );
}

export default App;
