import "./App.css";
import User from "./Pages/User";
import Home from "./Pages/Home";
import EditUser from "./Pages/EditUser";
import Order from "./Pages/Order";
import Amenity from "./Pages/Amenity";

function App() {
  return (
    <div className="App">
      {/* <div className="text-center bg-[#B4E2EF] py-2 md:font-medium text-xs md:text-base">
        Book your comfortable rooms, before 48 hrs to 60 mins before the check
        In!
      </div> */}
      {/* <Home /> */}
      {/* <User /> */}
      {/* <EditUser/> */}
      {/* <Order/> */}
      <Amenity />
    </div>
  );
}

export default App;
