import React, { useEffect, useState } from 'react'
import { Carousel } from 'flowbite-react';

import DummyImgSqr from '../Resources/DummyImgSqr.png'

import Meals from '../Resources/Meals.png'
import Parking from '../Resources/Parking.png'
import Wifi from '../Resources/Wi-Fi.png'
import Chef from '../Resources/Chef.png'
import FullProperty from '../Resources/fullproperty.png'
import PrivateRoom from '../Resources/privateroom.png'
import DormRoom from '../Resources/Dormroom.png'
import { Link } from 'react-router-dom';

import { useDispatch } from 'react-redux'
import api from '../api/api';
import { useSelector } from 'react-redux'
import { getImageById } from '../Store/imageSlice';
import { HashLink } from 'react-router-hash-link';

export default function HomeCard1({property}) {


  const [slideImage,setSlideImage] = useState([])
  const [essentialAmenities, setEssentialAmenities] = useState([]);
  const [extraAmenities, setExtraAmenities] = useState([]);
  
  console.log(property)
  useEffect(() => {
    getSlideImage();
    getAmenities();
  },[property]);

  const getSlideImage = async()=>{
    try{
      console.log("hello2")
      const new_slide_images = await Promise.all(property.currentLocation_images.map(async (id,index) => {
        if(index!=2){
            const result = await api.get(`/api/v1/image/${id}`);
            return result.data.url;
        }
      }));
      console.log(new_slide_images)
      setSlideImage(new_slide_images)

    }catch(err){
      console.log(err)
    }
  }

  const getAmenities = async()=>{
    try{
      // console.log("hello")
      const new_amenities = await Promise.all(property.amenities.map(async (id,index) => {
        
            const result = await api.get(`/api/v1/amenity/${id}`);
            return result.data;
        }
      ));
      console.log(new_amenities)
      // setAmenities(new_amenities)
      const essential = new_amenities.filter(amenity => amenity.type === 'essential');
      const extra = new_amenities.filter(amenity => amenity.type === 'extra');
      setEssentialAmenities(essential);
      setExtraAmenities(extra);

    }catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    console.log(slideImage)
  },[slideImage])
  return (
    <div className='flex  md:flex-row  flex-col-reverse custom-align-home mt-20 pb-2   '>
        <div className='md:w-2/3 md:pl-10 pl-1  pt-2 '>
          <Link to={`/property/${property._id}`}><h1 className='font-medium md:text-3xl text-xl'>{property.title}</h1></Link>
          <span className='text-lg text-[#8E8E8E]'><i className='fa  fa-map-marker text-[#6ACDE9] text-xl'></i> {property.location}</span>
          <div className=' mt-2 md:flex hidden'>
            {essentialAmenities?.map((item,index)=>{
              if(index < 3){
                return (<div className='bg-[#E0F4FA] rounded-full mr-1 px-4 py-1 flex items-center'><img src={item.icon.url} className='w-[1.2rem] mx-1' alt='meal'></img>{item.title}</div>)
              }
              })}
              <HashLink smooth to={`/property/${property._id}#amenites`}><div className='bg-[#E0F4FA] rounded-full mr-1 px-4 py-1 flex items-center'>More</div></HashLink>
            
          </div>
          <h1 className='text-[#F79489] font-medium text-xl mt-2 md:block hidden'>Room types</h1>
          <div className='flex my-1'>
            {property.roomType.map((item,index)=>{
              return(
                (item == 'full-property' && <div className='flex mr-1 pr-2 items-center text-sm'><img src={FullProperty} alt='full' className='mr-1'></img> Full Property</div>) ||
                (item == 'private-rooms' && <div className='flex mx-1 px-2 items-center  text-sm'><img src={PrivateRoom} alt='private' className='mr-1'></img> Private Room</div>) ||
                (item == 'dorm-beds' && <div className='flex mx-1 px-2 items-center  text-sm'><img src={DormRoom} alt='dorm' className='mr-1'></img> Dorm Room</div>))
            })}
              {/* <div className='flex mr-1 pr-2 items-center text-sm'><img src={FullProperty} alt='full' className='mr-1'></img> Full Property</div>
              <div className='flex mx-1 px-2 items-center  text-sm'><img src={PrivateRoom} alt='private' className='mr-1'></img> Private Room</div>
              <div className='flex mx-1 px-2 items-center  text-sm'><img src={DormRoom} alt='dorm' className='mr-1'></img> Dorm Room</div> */}
          </div>
          <p className='md:pr-10 text-justify px-2 text-sm md:text-medium md:block hidden'>{property.room_description.substring(0,310)}</p>
          <div className='mt-2'><b className=''>Starting from</b><span className='py-1 px-2 ml-2 border-2 rounded-lg border-green-500 text-green-500 font-medium'>Rs {property.price}/-</span></div>
        </div>
        <div className=' rounded p-2 img-border md:aspect-auto aspect-square bg-slate-100 w-80'>
          <Carousel>
            {slideImage?.map((item)=>{
              return(<img src={item}  alt="..." />)
            })}
            {/* <img src="https://flowbite.com/docs/images/carousel/carousel-5.svg"  alt="..." />
            <img src={DummyImgSqr} className='' alt="..." />
            <img src={DummyImgSqr}  alt="..." />
            <img src={DummyImgSqr}  alt="..." /> */}
            <img src={DummyImgSqr} alt="..." />
          </Carousel>
            {/* <img src={DummyImgSqr} className='md:w-80 w-100'/> */}
        </div>  
      </div>
  )
}
