import React, { useEffect, useState } from 'react';
import { Modal } from 'flowbite-react';
import { createAmenity, editAmenity } from '../Store/amenitySlice';
import { useDispatch } from 'react-redux';

const AddAmenityModal = ({openModal,setOpenModal}) => {
  const [title,setTitle] = useState();
  const [price,setPrice] = useState();
  const [type,setType] = useState("essential");
  const [description,setDescription] = useState();
  const [icon,setIcon] = useState();
  const dispatch = useDispatch();

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

  const handleTitle = (e) => {
    setTitle(e.target.value);
  }

  const handleDescription = (e) => {
    setDescription(e.target.value);
  }

  const handlePrice = (e) => {
    setPrice(e.target.value);
  }

  const handleCreateAmenity = (e) => {
    e.preventDefault();
    if(!icon || !type || !title || !description || !price) {
      alert("Fill the missing details");
      return;
    }
    const newAmenity = {icon,type,title,description,price}
    console.log(newAmenity);
    dispatch(createAmenity(newAmenity));
    setOpenModal(false);
  }

  useEffect(() => {
    setTitle("");
    setType("essential");
    setPrice();
    setDescription("");
    setIcon();
  },[openModal])

  return (
    <Modal dismissible show={openModal} onClose={() => setOpenModal(false)} popup>
    <Modal.Header></Modal.Header>
    <Modal.Body>
    <div className="bg-white px-8 py-5 rounded mx-auto box-border">
      <h2 className='text-3xl mb-3 text-center font-poppins'>Add Amenity</h2>
      <form action="" className='font-montserrat text-sm'>
        <div className='mb-3'>
          <input type="text" className='border-2 rounded-xl py-1 px-3  w-full' placeholder='Title' value={title} onChange={handleTitle}/>
        </div>
        <div className='mb-3'>
          <label htmlFor="" className=' text-gray-400 pl-2'>Type: </label>
          <select value={type} onChange={(e) => setType(e.target.value)} className='border-2 py-1 px-2 '>
            <option value="essential">Essential</option>
            <option value="extra">Extra</option>
          </select>
        </div>
        <div className='mb-3'>
          <input type="number" onChange={handlePrice} value = {price}className='border-2 rounded-xl py-1 px-3  w-full' placeholder='Price (if essential enter 1)'/>
        </div>
        <div className='mb-3 flex'>
          <label htmlFor="" className=' text-gray-400 mr-2 text-lg'>Icon: </label>
          <input type="file" accept="image/" onChange={(e) => handleIcon(e.target.files)}/>
        </div>
        <div className='mb-3'>
          <textarea name="" id="" cols="" rows="3" className='border-2 rounded-xl py-1 px-3 w-full' placeholder='Description' onChange={handleDescription} value = {description}></textarea>
        </div>
        <button className='block w-full bg-[#F79489] text-white py-2 px-5 rounded-full hover:bg-white hover:text-[#F79489] border-2 border-[#F79489] transition duration-200 box-border text-l mb-3 font-poppins' onClick={handleCreateAmenity}>Add</button>
      </form>
    </div>
    </Modal.Body>
  </Modal>
  )
}

export default AddAmenityModal