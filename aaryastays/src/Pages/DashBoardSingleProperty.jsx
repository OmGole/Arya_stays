import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import {  useNavigate, useParams } from 'react-router-dom';
import { deleteOrder, editOrder } from '../Store/orderSlice';
import api from "../api/api";

const DashBoardSingleProperty = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [property, setProperty] = useState();


  const getProperty = async () => {
    const response = await api.get(`api/v1/property/${id}`);
    setProperty(response.data);
  };

  useEffect(()=>{
    getProperty();
  },[]);



  return (
    <div className='h-screen'>
      {/*  */}
      
    </div>
  )
}

export default DashBoardSingleProperty;