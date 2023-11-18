import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createSlide, deleteSlide, editSlide, getAllSlides, getSingleSlide } from '../Store/slideSlice';
import { createImage, deleteImage, editImage, getAllImages, getImageById } from '../Store/imageSlice';

const productId = "655860b944bdfab5ced86d9a";

const Image = () => {
  const dispatch = useDispatch();
  const slides = useSelector(state => state.image);

  const [image,setImage] = useState();
  const [images,setImages] = useState();
  const [type,setType] = useState();

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };


  const handleImages = async (files) => {
    let base64s = [];
    for(let i=0;i<files.length;i++) {
      const base64 = await convertBase64(files[i]);
      base64s.push(base64);
    }
    setImages(base64s);
  }

  const handleImage = async (files) => {
    const base64 = await convertBase64(files[0]);
    setImage(base64);
  }

  const handleType = (e) => {
    e.preventDefault();
    setType(e.target.value);
  }

  const handleCreateImage = (e) => {
    e.preventDefault();
    const newImage = {productId, type, image}
    console.log(newImage);
    dispatch(createImage(newImage));
  }

  const handleGetAllImages = (e) => {
    e.preventDefault();
    dispatch(getAllImages());
  }

  const handleGetSingleImage = (e) => {
    e.preventDefault();
    dispatch(getImageById("6558599f111c683abef867d5"));
  }

  const handleUpdateImage = (e) => {
    e.preventDefault();
    const newImage = {};
    if(image) {
      newImage.image = image;
    } 

    const updatedImage = {id:"6558599f111c683abef867d5", newImage};
    console.log(updatedImage);
    dispatch(editImage(updatedImage));
  }

  const handleDeleteImage = (e) => {
    e.preventDefault();
    dispatch(deleteImage("6558599f111c683abef867d5"));
  }

  useEffect(() => {
    console.log(slides);
  }, [slides]);



  return (
    <div>
      <div>
        <label>Image: </label>
        <input type="file" accept="image/" onChange={(e) => handleImage(e.target.files)}/>
        <input type="text" className='border-2 rounded-xl py-1 px-3 w-full' name ="type" placeholder='type' value={type} onChange={handleType}/>
      </div>

      <hr />
      <button onClick={handleCreateImage}>Create Image</button>    

      <hr />
      <button onClick={handleGetAllImages}>Get All Images</button>    

      <hr />
      <button onClick={handleGetSingleImage}>Get Single Image</button>    

      <hr />
      <button onClick={handleUpdateImage}>Update Image</button>    

      <hr />
      <button onClick={handleDeleteImage}>Delete Image</button>    

    </div>
  )
}

export default Image;