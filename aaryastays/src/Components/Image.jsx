import React, { useEffect, useState } from 'react';
import { BiTrash } from "react-icons/bi";
import { FaRegEdit } from "react-icons/fa";
import api from '../api/api';
import { deleteImage, editImage } from '../Store/imageSlice';
import { useDispatch } from 'react-redux';

const Image = ({ id, file,type, propertyId }) => {
  const dispatch = useDispatch();
  const [image,setImage] = useState();

  const getImage = async () => {
    const response = await api.get(`api/v1/image/${id}`);
    setImage(response.data);
  }

  useEffect(() => {
    if(id) {
      getImage();
    }
  },[id])


  const handleImageEdit = (e) => {
    e.preventDefault();
    if(!file) {
      alert("Please Upload file");
      return;
    }
    const updatedImage = { id }
    const newImage = {image:file};
    updatedImage.newImage = newImage;
    console.log(updatedImage)
    dispatch(editImage(updatedImage));
  }


  const handleImageDelete = (e) => {
    e.preventDefault();
    const propertyDetails = { propertyId, type}
    const data = {id, propertyDetails};
    console.log(data)
    dispatch(deleteImage(data));
  }


  return (
    <div class="w-80 bg-white p-3 drop-shadow-2xl">
            <img
              class="h-52 w-full object-cover"
              src={image?.url}
            />
            <ul class="mt-3 flex flex-wrap justify-around">
              <li class="">
                <button onClick={handleImageEdit}>
                  <FaRegEdit className="block mx-auto bg-green-500 text-white p-3 text-5xl rounded-xl hover:bg-green-600 hover:cursor-pointer mb-5" />
                </button>
              </li>
              <li class="">
                <button onClick={handleImageDelete}>
                  <BiTrash className="block mx-auto bg-red-500 text-white p-3 text-5xl rounded-xl hover:bg-red-600 hover:cursor-pointer" />
                </button>
              </li>
            </ul>
    </div>
  )
}

export default Image