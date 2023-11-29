import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import NavbarC from '../Components/NavbarC'
import { Carousel } from 'flowbite-react'
import { useSelector,useDispatch } from 'react-redux';
import { getPropertyById } from '../Store/propertySlice';
import api from '../api/api';
import FooterC from '../Components/FooterC';

export default function Gallery() {
    const routeParams = useParams();
  const routeParamsID = routeParams.id;
  const dispatch = useDispatch();
  const property = useSelector((state) => state.property.propertyById);
  const [slideImage,setSlideImage] = useState([])

  useEffect(()=>{
    dispatch(getPropertyById(routeParamsID)).then((data)=>{
        console.log(data.payload.currentLocation_images)
        getSlideImage(data.payload.currentLocation_images)
    })
  },[])

//   useEffect(()=>{
//     console.log(slideImage)
//   },[slideImage])

  const getSlideImage = async(data)=>{
    try{
      const new_slide_images = await Promise.all(data.map(async (id,index) => {
            const result = await api.get(`/api/v1/image/${id}`);
            return result.data.url;
      }));
      setSlideImage(new_slide_images)

    }catch(err){
      console.log(err)
    }
  }

//   comment out this for scroll
  useEffect(() => {
    console.log(slideImage)
    const imgElement = document.querySelector('[data-testid="carousel-item"] img');
  
      if (imgElement) {
        imgElement.classList.remove('absolute', 'top-1/2', 'left-1/2', 'block', 'w-full', '-translate-x-1/2', '-translate-y-1/2');
      }
  }, [slideImage]);

  return (
    <>
    <NavbarC/>
    <h1 className='text-center text-3xl font-bold'>{property.title}</h1>
    <div className='md:mx-20  md:h-[550px] h-[250] mt-4 mx-2 custom-slider rounded-lg mb-4'>
        <Carousel>
        {slideImage?.map((item)=>{
              return(<img src={item} class="object-cover w-full rounded-br-lg rounded-tl-lg h-auto md:h-full md:w-full "  alt="..." />)
            })}
        </Carousel>
    </div>
    <FooterC/>






</>
  )
}