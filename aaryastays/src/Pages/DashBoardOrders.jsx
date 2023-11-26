import React, { useState, useEffect } from "react";
import DashBoardItems from "../Components/DashBoardOrderRow";
import { useSelector, useDispatch } from "react-redux";
import { allOrders } from "../Store/orderSlice";
import DashBoardOrderRow from "../Components/DashBoardOrderRow";

function DashBoardOrders() {
  const order = useSelector((state) => state.order);
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(allOrders());
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };


  return (
    <>
      <div className="md:container mx-auto pt-5 md:px-10 px-6 mb-5">
        <div>
          <div className="md:container mx-auto relative px-10">
            <div>
              <h2 className="text-center text-3xl mb-9">Order</h2>
            </div>
            <div>
            {/* <input type="text" className='w-full border-2 rounded-xl py-2 px-5 font-montserrat' value={search} onChange={handleSearch} placeholder="Search by Name or Id"/> */}
            </div>
            <div className="">
              <div className="md:flex hidden mb-5 text-center text-xl">
                <div className="basis-1/6">
                  <h3>Name</h3>
                </div>
                <div className="basis-1/6">
                  <h3>Accomodation</h3>
                </div>
                <div className="basis-1/4">
                  <h3>Property</h3>
                </div>
                <div className="basis-1/3">
                  <h3>Check-In</h3>
                </div>
                <div className="basis-1/6">
                  <h3>Check-Out</h3>
                </div>
                <div className="basis-1/6">
                  <h3></h3>
                </div>

              </div>
              <hr className="border border-black" />
            </div>
          </div>
        </div>
        {order &&
          order.allOrders.map((order) => <DashBoardOrderRow order={order} />)}
      </div>
    </>
  );
}

export default DashBoardOrders;
