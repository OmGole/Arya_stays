import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createAmenity, deleteAmenity, editAmenity, getAllAmenity, getSingleAmenity } from '../Store/amenitySlice';

const Amenity = () => {
  const dispatch = useDispatch();
  const amenities = useSelector(state => state.amenity);

  const [icon,setIcon] = useState();
  const [type,setType] = useState("");
  const [title,setTitle] = useState("");
  const [description,setDescription] = useState();
  const [price,setPrice] = useState();

  const setFileToBase = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setIcon(reader.result);
    }
  }

  const handleIcon = (files) => {
    const file = files[0];
    setFileToBase(file);
    console.log(file);
  }

  const handleType = (e) => {
    e.preventDefault();
    setType(e.target.value);
  }

  const handleTitle = (e) => {
    e.preventDefault();
    setTitle(e.target.value);
  }

  const handleDescription = (e) => {
    e.preventDefault();
    setDescription(e.target.value);
  }

  const handlePrice = (e) => {
    e.preventDefault();
    const number = Number(e.target.value);
    setPrice(number);
  }

  const handleCreateAmenity = (e) => {
    e.preventDefault();
    const newAmenity = {icon,type,title,description,price}
    console.log(newAmenity);
    dispatch(createAmenity(newAmenity));
  }

  const handleGetAllAmity = (e) => {
    e.preventDefault();
    dispatch(getAllAmenity());
  }

  const handleGetSingleAmity = (e) => {
    e.preventDefault();
    dispatch(getSingleAmenity("6555c45b586948bc6481c6b3"));
  }

  const handleUpdateAmity = (e) => {
    e.preventDefault();
    const newAmenity = {};
    if(icon) newAmenity.icon = icon;
    if(type) newAmenity.type = type;
    if(title) newAmenity.title= title;
    if(description) newAmenity.description = description;
    if(price) newAmenity.price = price;
    const updatedAmenity = {id:"6555c45b586948bc6481c6b3", newAmenity};
    dispatch(editAmenity(updatedAmenity));
  }

  const handleDeleteAmity = (e) => {
    e.preventDefault();
    dispatch(deleteAmenity("6555c45b586948bc6481c6b3"));
  }



  useEffect(() => {
    console.log(amenities);
  }, [amenities]);



  return (
    <div>
      <div>
        <label>Icon: </label>
        <input type="file" accept="image/" onChange={(e) => handleIcon(e.target.files)}/>
      </div>
      <input type="text" className='border-2 rounded-xl py-1 px-3  w-full' placeholder='Type' value={type} onChange={handleType}/>
      <input type="text" className='border-2 rounded-xl py-1 px-3  w-full' placeholder='Title' value={title} onChange={handleTitle}/>
      <input type="text" className='border-2 rounded-xl py-1 px-3  w-full' placeholder='Description' value={description} onChange={handleDescription}/>
      <input type="number" className='border-2 rounded-xl py-1 px-3  w-full' placeholder='Price' value={price} onChange={handlePrice}/>

      <hr />
      <button onClick={handleCreateAmenity}>Create Amenity</button>    

      <hr />
      <button onClick={handleGetAllAmity}>Get All Amenity</button>    

      <hr />
      <button onClick={handleGetSingleAmity}>Get Single Amenity</button>    

      <hr />
      <button onClick={handleUpdateAmity}>Update Amenity</button>    

      <hr />
      <button onClick={handleDeleteAmity}>Delete Amenity</button>    

      {/* <hr />
      <button onClick={handleDeleteAmity}>Delete Amenity</button>     */}

      {/* <div>
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

export default Amenity