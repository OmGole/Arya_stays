import React, { useState, useEffect } from "react";
import DashBoardItems from "../Components/DashBoardOrderRow";
import { useSelector, useDispatch } from "react-redux";
import { allOrders } from "../Store/orderSlice";
import DashBoardOrderRow from "../Components/DashBoardOrderRow";
import { getAllAmenity } from "../Store/amenitySlice";
import DashBoardAmenityRow from "../Components/DashBoardAmenityRow";
import AddAmenityModal from "../Components/AddAmenityModal";

function DashBoardAmenities() {
  const amenitites = useSelector((state) => state.amenity);
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [openModal,setOpenModal] = useState();

  useEffect(() => {
    dispatch(getAllAmenity());
  }, []);



  return (
    <>
      <div className="md:container mx-auto pt-5 md:px-10 px-6 mb-5">
        <div>
          <div className="md:container mx-auto relative">
            <div>
              <h2 className="text-center text-3xl mb-9">Amenities</h2>
            </div>
            <div>
            <button className='block w-full bg-[#F79489] text-white py-1 px-5 rounded-xl hover:bg-white hover:text-[#F79489] border-2 border-secondary transition duration-200 box-border text-l mb-5 font-poppins' onClick={() => setOpenModal(true)}>Add Amenity</button>
            {/* <input type="text" className='w-full border-2 rounded-xl py-2 px-5 font-montserrat' value={search} onChange={handleSearch} placeholder="Search by Name or Id"/> */}
            </div>
            <div className="">
              <div className="md:flex hidden mb-5 text-center text-xl">
                <div className="basis-1/8">
                  <h3>Icon</h3>
                </div>
                <div className="basis-1/6">
                  <h3>Title / Type</h3>
                </div>
                <div className="basis-1/6">
                  <h3>Price</h3>
                </div>
                <div className="basis-1/3">
                  <h3>Description</h3>
                </div>
                <div className="basis-1/5">
                  <h3></h3>
                </div>

              </div>
              <hr className="border border-black" />
            </div>
          </div>
        </div>
        {amenitites &&
          amenitites.allAmenities.map((amenity) => <DashBoardAmenityRow amenity = {amenity} />)}
          <AddAmenityModal openModal={openModal} setOpenModal={setOpenModal}/>
      </div>
    </>
  );
}

export default DashBoardAmenities;
