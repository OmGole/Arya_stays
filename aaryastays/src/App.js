import "./App.css";
import Home from "./Pages/Home";
import { Routes, Route } from "react-router-dom";
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
      <div className="text-center bg-[#B4E2EF] py-2 md:font-medium text-[10px] md:text-base">
        Book your comfortable rooms, before 48 hrs to 60 mins before the check
        In!
      </div>
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
      </Routes>
      {/* <Home /> */}
      <ToastContainer />
    </div>
  );
}

export default App;
