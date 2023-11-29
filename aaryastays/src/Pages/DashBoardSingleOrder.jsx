import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import {  useNavigate, useParams } from 'react-router-dom';
import { deleteOrder, editOrder } from '../Store/orderSlice';
import api from "../api/api";

const DashBoardSingleOrder = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [amenitiesPrice,setAmenitiesPrice] = useState();
  const [property, setProperty] = useState();
  const [order, setOrder] = useState();
  const [user, setUser] = useState();
  const [formattedAmenities, setFormattedAmenities] = useState();

  const formatDate = (isoDateString) => {
    const dateObject = new Date(isoDateString);
  
    const formattedDateString = dateObject.toLocaleDateString('en-IN',{weekday:"long", year:"numeric", month:"short", day:"numeric"});
  
    return formattedDateString;
  }

  const handleAccept = () => {
    const updatedOrder = {id: order._id};
    const newOrder = {status:"accepted"};
    updatedOrder.newOrder = newOrder;
    dispatch(editOrder(updatedOrder)).then((res) => setOrder(res.payload));
    // whatsapp
  }
  
  const handleReject = () => {
    dispatch(deleteOrder(order._id));
    // whatsapp
    navigate("/dashboard/order");
  }

  const getUser = async () => {
    const response = await api.get(`api/v1/user/${order.userId}`);
    setUser(response.data);
  };

  const getProperty = async () => {
    const response = await api.get(`api/v1/property/${order.propertyId}`);
    setProperty(response.data);
  };

  const getOrder = async () => {
    const response = await api.get(`api/v1/order/${id}`);
    console.log(response.data[0]);
    setOrder(response.data[0]);
  }

  const getFormatedAmenities = async () => {
    const amenities = await Promise.all(
      order.amenities.map(async (amenity) => {
        const response = await api.get(`/api/v1/amenity/${amenity.id}`);
        console.log(response.data);
        const formatedAmenity =  { title: response.data.title, price: amenity.price, qty: amenity.qty};
        return formatedAmenity;
      })
    );
    setFormattedAmenities(amenities);
  }

  useEffect(()=>{
    getOrder();
  },[]);

  useEffect(() => {
    if(order) {
      getUser();
      getProperty();
      getFormatedAmenities();

      const totalSum = order.amenities.reduce((accumulator, amenity) => {
        return accumulator + (amenity.price * amenity.qty);
      }, 0);
      setAmenitiesPrice(totalSum);
    }
  },[order])


  return (
    <div className='h-screen'>
      <div className='sm:container h-full mx-auto flex flex-col justify-center content-center items-center'>
        <div className='md:w-1/3 w-3/4 md:py-3 px-5 shadow-2xl border-2 border-black rounded-xl'>
          <h2 className='text-3xl font-poppins text-center mb-5'>Order Details</h2>
          <div className='mb-1 text-lg'>
            <h2>Customer Name : {user?.name}</h2>
          </div>
          <div className='mb-1 text-lg'>
            <h2>Property : {property?.title}</h2>
          </div>
          <div className='mb-1 text-lg'>
            <h2>Accomodation : {order?.accomodation}</h2>
          </div>
          <div className='mb-1 text-lg'>
            <h2>Guests : {`${order?.guest?.adult} adults and ${order?.guest?.children} children`}</h2>
          </div>
          <div className='mb-1 text-lg'>
            <h2>Price : ₹{property?.price}</h2>
          </div>
          <div className='mb-1 text-lg'>
            <h2>Amenities : {formattedAmenities?.map(amenity => `${amenity.title}, Price: ₹${amenity.price}, qty: ${amenity.qty}`)}</h2>
          </div>
          <div className='mb-1 text-lg'>
            <h2>Amenities Price : ₹{amenitiesPrice}</h2>
          </div>
          <div className='mb-1 text-lg'>
            <h2>Check In : {formatDate(order?.check_in)}</h2>
          </div>
          <div className='mb-1 text-lg'>
            <h2>Check Out : {formatDate(order?.check_out)}</h2>
          </div>
          <div className='mb-1 text-lg'>
            <h2>Phone : {user?.phone}</h2>
          </div>
          <div className=' text-lg'>
            <h2>Email: {user?.email}</h2>
          </div>
          <div className=' text-lg'>
            <h2>Status: {order?.status}</h2>
          </div>
        </div>
        <div>
      <div className='flex mt-5 w-full'>
      <button 
          className="block bg-[#F79489] text-white py-1 px-5 rounded-full ml-9 hover:bg-white hover:text-[#F79489] border-2 border-[#F79489] transition duration-200 box-border" onClick={handleAccept}
        >
          Accept
        </button>
        <button
          className="block bg-black text-white py-1 px-5 rounded-full ml-9 hover:bg-white hover:text-black border-2 border-black transition duration-200 box-border" onClick={handleReject} >
          Reject
        </button>
        {/* <Link
          className="block bg-[#F79489] text-white py-1 px-5 rounded-full ml-9 hover:bg-white hover:text-[#F79489] border-2 border-[#F79489] transition duration-200 box-border" to="/dashboard/order" state = {{order,property, user}}
        >
          View More
        </Link> */}
      </div>
      </div>
      </div>
      
    </div>
  )
}

export default DashBoardSingleOrder