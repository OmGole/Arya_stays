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
import { useSelector } from 'react-redux'
import { getImageById } from '../Store/imageSlice';

export default function HomeCard1({property}) {

  const dispatch = useDispatch();
  // const image = useSelector(state => state.image.imageById);

  const [slideImage,setSlideImage] = useState([])
  

  useEffect(() => {
    const uniqueImages = new Set();
    property.currentLocation_images.forEach((id)=>{
      dispatch(getImageById(id)).then((data)=>{
        uniqueImages.add(data.payload.url);
        setSlideImage(prev=>[...prev,data.payload.url])
      })
    })
    const uniqueImageArray = [...uniqueImages];
    // console.log(uniqueImageArray)
  setSlideImage(uniqueImageArray);
  },[dispatch]);

  useEffect(()=>{
    console.log(slideImage)
  },[slideImage])
  return (
    <div className='flex  md:flex-row  flex-col-reverse custom-align-home mt-20 pb-2   '>
        <div className='md:w-2/3 md:pl-10 pl-1  pt-2 '>
          <Link to={`/property/${property._id}`}><h1 className='font-medium md:text-3xl text-xl'>{property.title}</h1></Link>
          <span className='text-lg text-[#8E8E8E]'><i className='fa  fa-map-marker text-[#6ACDE9] text-xl'></i> {property.location}</span>
          <div className=' mt-2 md:flex hidden'>
            <div className='bg-[#E0F4FA] rounded-full mr-1 px-4 py-1 flex items-center'><img className='' src={Meals} alt='meal'></img> Meals</div>
            <div className='bg-[#E0F4FA] rounded-full mx-1 px-4 py-1 flex items-center'><img src={Parking} alt='parking'></img> Parking</div>
            <div className='bg-[#E0F4FA] rounded-full mx-1 px-4 py-1 flex items-center'><img src={Wifi} alt='wifi'></img> Wifi</div>
            <div className='bg-[#E0F4FA] rounded-full mx-1 px-4 py-2 flex items-center'><img src={Chef} alt='chef'></img> Chef</div>
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
