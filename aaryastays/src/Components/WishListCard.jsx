import React, { useEffect, useState } from 'react'
import api from '../api/api'
import { Carousel } from 'flowbite-react'
import FullProperty from '../Resources/fullproperty.png'
import PrivateRoom from '../Resources/privateroom.png'
import DormRoom from '../Resources/Dormroom.png'
import { Link } from 'react-router-dom'

export default function WishListCard({property}) {

  const [slideImage,setSlideImage] = useState([])
  const [essentialAmenities, setEssentialAmenities] = useState([]);
  const [extraAmenities, setExtraAmenities] = useState([]);
    useEffect(()=>{
        // console.log(property)
        getSlideImage();
        getAmenities();
    },[])

    useEffect(() => {
      const imgElement = document.querySelector('[data-testid="carousel-item"] img');
  
      if (imgElement) {
        imgElement.classList.remove('absolute', 'top-1/2', 'left-1/2', 'block', 'w-full', '-translate-x-1/2', '-translate-y-1/2');
      }
    }, [slideImage]);

    const getSlideImage = async()=>{
      try{
        const new_slide_images = await Promise.all(property.currentLocation_images.map(async (id,index) => {
            try{
              const result = await api.get(`/api/v1/image/${id}`);
              return result.data.url;
            }catch(err){}
        }));
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
        // setAmenities(new_amenities)
        const essential = new_amenities.filter(amenity => amenity.type === 'essential');
        const extra = new_amenities.filter(amenity => amenity.type === 'extra');
        setEssentialAmenities(essential);
        setExtraAmenities(extra);
  
      }catch(err){
        console.log(err)
      }
    }
  return (
    <div className="flex flex-col  bg-white  md:flex-row md:p-5 mt-3 ">
      <div className="img-border p-2 md:w-1/4 md:h-80 bg-slate-300  custom-slider ">
      <Carousel>
            {slideImage?.map((item)=>{
              return(<img src={item} class="object-cover w-full rounded-br-lg rounded-tl-lg h-auto md:h-full md:w-full "  alt="..." />)
            })}
          </Carousel>
      </div>
      <div className=" md:w-3/4 md:h-80 ">
        <div className="md:ml-5 border-2 h-full  border-slate-200 flex flex-col">
          <div className="md:flex-1 border-2 border-slate-200 md:px-10 p-4 justify-center flex-col flex">
            <div className="flex justify-between ">
            <Link to={`/property/${property._id}`}><h1 className="font-medium md:text-3xl text-xl">
                {property.title}
              </h1></Link>
              
              
              
            </div>
            <span className="md:text-lg text-[#8E8E8E]">
              <i className="fa  fa-map-marker text-[#6ACDE9] md:text-xl text-lg"></i>
              {property.location}
            </span>
          <div className=' mt-2 md:flex hidden'>
            {essentialAmenities?.map((item,index)=>{
              if(index < 3){
                return (<div className='bg-[#E0F4FA] rounded-full mr-1 px-4 py-1 flex items-center'><img src={item.icon.url} className='w-[1.2rem] mx-1' alt='meal'></img>{item.title}</div>)
              }
              })}
              <div className='bg-[#E0F4FA] rounded-full mr-1 px-4 py-1 flex items-center'>More</div>
            
          </div>
            <h1 className='text-[#F79489] font-medium text-xl mt-2 md:block hidden'>Room types</h1>
            <div className='flex my-1'>
              {property.roomType.map((item,index)=>{
              return(
                (item == 'full-property' && <div className='flex mr-1 pr-2 items-center text-sm'><img src={FullProperty} alt='full' className='mr-1'></img> Full Property</div>) ||
                (item == 'private-rooms' && <div className='flex mx-1 px-2 items-center  text-sm'><img src={PrivateRoom} alt='private' className='mr-1'></img> Private Room</div>) ||
                (item == 'dorm-beds' && <div className='flex mx-1 px-2 items-center  text-sm'><img src={DormRoom} alt='dorm' className='mr-1'></img> Dorm Room</div>))
              })}
              
            </div>
            <p className='md:pr-10 text-justify px-2 text-sm md:text-medium md:block hidden'>{property.room_description.substring(0,310)}</p>
              <div className='mt-2'><b className=''>Starting from</b><span className='py-1 px-2 ml-2 border-2 rounded-lg border-green-500 text-green-500 font-medium'>Rs {property.price}/-</span></div>
            </div>
          
        </div>
      </div>
    </div>
  )
}
