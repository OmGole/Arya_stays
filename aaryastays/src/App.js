import "./App.css";
import Home from "./Pages/Home";
import { Routes, Route } from "react-router-dom";
import Profile from "./Pages/Profile";
import Individual from "./Pages/Individual";
import Orders from "./Pages/Orders";
import Booking from "./Pages/Booking";
function App() {
  return (
    <div className="App">
      <div className="text-center bg-[#B4E2EF] py-2 md:font-medium text-xs md:text-base">
        Book your comfortable rooms, before 48 hrs to 60 mins before the check
        In!
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/property/:id" element={<Individual />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/booking" element={<Booking />} />
      </Routes>
      {/* <Home /> */}
    </div>
  );
}

export default App;
