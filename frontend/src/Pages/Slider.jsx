import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createSlide, deleteSlide, editSlide, getAllSlides, getSingleSlide } from '../Store/slideSlice';

const Slider = () => {
  const dispatch = useDispatch();
  const slides = useSelector(state => state.slide);

  const [images,setImages] = useState([]);
  const [description,setDescription] = useState();

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

  const handleDescription = (e) => {
    e.preventDefault();
    setDescription(e.target.value);
  }

  const handleCreateSlide = (e) => {
    e.preventDefault();
    const newSlide = {images,description}
    console.log(newSlide);
    dispatch(createSlide(newSlide));
  }

  const handleGetAllSlides = (e) => {
    e.preventDefault();
    dispatch(getAllSlides());
  }

  const handleGetSingleSlide = (e) => {
    e.preventDefault();
    dispatch(getSingleSlide("6557755fea3ba64f3b6f8c85"));
  }

  const handleUpdateSlide = (e) => {
    e.preventDefault();
    const newSlide = {};
    if(images) {
      newSlide.image = images[0];
      newSlide.public_id = "slide/fk7pldfnksi9fcvwvyh3";
    } 
    if(description) newSlide.description = description;
    const updatedSlide = {id:"6557755fea3ba64f3b6f8c85", newSlide};
    console.log(updatedSlide);
    dispatch(editSlide(updatedSlide));
  }

  const handleDeleteSlide = (e) => {
    e.preventDefault();
    dispatch(deleteSlide("6557755fea3ba64f3b6f8c85"));
  }

  useEffect(() => {
    console.log(slides);
  }, [slides]);



  return (
    <div>
      <div>
        <label>Image: </label>
        <input type="file" accept="image/" multiple onChange={(e) => handleImages(e.target.files)}/>
      </div>
      <input type="text" className='border-2 rounded-xl py-1 px-3  w-full' placeholder='Description' value={description} onChange={handleDescription}/>

      <hr />
      <button onClick={handleCreateSlide}>Create Slide</button>    

      <hr />
      <button onClick={handleGetAllSlides}>Get All Slides</button>    

      <hr />
      <button onClick={handleGetSingleSlide}>Get Single Slide</button>    

      <hr />
      <button onClick={handleUpdateSlide}>Update Sldie</button>    

      <hr />
      <button onClick={handleDeleteSlide}>Delete Slide</button>    

    </div>
  )
}

export default Slider;