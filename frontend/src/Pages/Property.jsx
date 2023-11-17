import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllProperties } from '../Store/propertySlice';
import { createOrder, editOrder, deleteOrder, getPastOrders, getCurrentOrders } from '../Store/orderSlice';


const userId = "4eb6e7e7e9b7f4194e000001";
const propertyId = "654e3ff06aba79004485fd2c";
const Property = () => {
  const dispatch = useDispatch();
  const properties = useSelector(state => state.property);

  const [accomodation,setAccomodation] = useState("");
  const [status,setStatus] = useState();
  const [guest,setGuest] = useState({ adult: 0, children: 0});
  const [check_in,setCheck_in] = useState();
  const [check_in_formatted,setCheck_in_formatted] = useState();
  const [check_out,setCheck_out] = useState();
  const [check_out_formatted,setCheck_out_formatted] = useState();
  const [amenity,setAmenity] = useState({type:'',value:'',price:0});
  const [amenities,setAmenities] = useState([]);

  const handleCheckIn = (e) => {
    const date = new Date(e.target.value).toISOString();
    setCheck_in_formatted(date);
    setCheck_in(e.target.value);
  }
  
  const handleCheckOut = (e) => {
    const date = new Date(e.target.value).toISOString();
    setCheck_out_formatted(date);
    setCheck_out(e.target.value);
  }

  const handleAccomodation = (e) => {
    setAccomodation(e.target.value);
  }

  const handleGuest = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setGuest((prevData) => ({
      ...prevData,
      [name]: value
    }));
  }
  
  const handleAmenity = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setAmenity((prevData) => ({
      ...prevData,
      [name]: value
    }));
  }

  const handleAddAmenity = (e) => {
    e.preventDefault();
    setAmenities((preState => [...preState, amenity]));
    setAmenity({type: '',value: '', price: 0});
  }

  const handleStatus = (e) => {
    setStatus(e.target.value);
  }

  const handleCreateOrder = (e) => {
    e.preventDefault();
    const order = {
      userId,
      propertyId,
      accomodation,
      check_in: check_in_formatted,
      check_out: check_out_formatted,
      guest,
      amenities
    }
    console.log(order);
    dispatch(createOrder(order));
  }

  const handleUpdateOrder = (e) => {
    e.preventDefault();
    const updatedOrder = {
      id:"6550c9d1a9bbeda56b44b49f",
      newOrder: {status}
    }
    dispatch(editOrder(updatedOrder));
  }

  const handleDeleteOrder = (e) => {
    e.preventDefault();
    dispatch(deleteOrder("6550c9d1a9bbeda56b44b49f"));
  }

  const handlePastOrders = (e) => {
    e.preventDefault();
    const id = userId;
    dispatch(getPastOrders(id));
  
  }
  const handleCurrentOrders = (e) => {
    e.preventDefault();
    const id = userId;
    dispatch(getCurrentOrders(id));
  }

  useEffect(() => {
    dispatch(getAllProperties());
  }, []);

  useEffect(() => {
    console.log(properties)
  }, [properties]);

  return (
    <div>
      {/* <input type="date" className='border-2 rounded-xl py-1 px-3  w-full' placeholder='check_in' value={check_in} onChange={handleCheckIn}/>
      <input type="date" className='border-2 rounded-xl py-1 px-3  w-full' placeholder='check_out' value={check_out} onChange={handleCheckOut}/>
      <input type="text" className='border-2 rounded-xl py-1 px-3  w-full' placeholder='Accomodation' value={accomodation} onChange={handleAccomodation}/>
      <div>
        <input type="text" className='border-2 rounded-xl py-1 px-3  w-full' name ="type" placeholder='type' value={amenity.type} onChange={handleAmenity}/>

        <input type="text" className='border-2 rounded-xl py-1 px-3  w-full' name="value" placeholder='value' value={amenity.value} onChange={handleAmenity}/>

        <input type="number" className='border-2 rounded-xl py-1 px-3  w-full' name="price" placeholder='price' value={amenities.price} onChange={handleAmenity}/>

        <button onClick={handleAddAmenity}>Add</button>
      </div>
      <input type="number" name="adult" className='border-2 rounded-xl py-1 px-3  w-full' placeholder='Adult' value={guest.adult} onChange={handleGuest}/>
      <input type="number" name="children" className='border-2 rounded-xl py-1 px-3  w-full' placeholder='Children' value={guest.children} onChange={handleGuest}/>
      <button onClick={handleCreateOrder}>Create Order</button>    

      <div>
        Update
        <input type="text" className='border-2 rounded-xl py-1 px-3  w-full' name="value" placeholder='value' value={status} onChange={handleStatus}/>
        <button onClick={handleUpdateOrder}>Update Order</button>    
      </div>  

      <div>
        <button onClick={handleDeleteOrder}>Delete Order</button>    
      </div>
      <hr />
      <div>
        <button onClick={handlePastOrders}>Get Past Order</button>    
      </div>
      <hr />
      <div>
        <button onClick={handleCurrentOrders}>Get Current Order</button>    
      </div> */}
    </div>
  )
}

export default Property