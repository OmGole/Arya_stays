import React, { useState, useEffect, useRef } from "react";
import { Carousel } from "flowbite-react";
import api from "../api/api";
import DummyImgSqr from '../Resources/DummyImgSqr.png'

export default function Slide2({slides}) {
  const [slideDetails,setSlideDetails] = useState([]);
  const parentRef = useRef(null);
    const childRef = useRef(null);
  
    useEffect(() => {
      const parentHeight = parentRef;
      console.log("parent",parentHeight)
      // childRef.current.style.height = `${parentHeight}px`;
      // console.log("child",childRef.current.style.height)
    }, []); 
  


  const getSlideDetails = async()=>{
    
    try{
      const slideDetails = await Promise.all(slides.map(async (id,index) => {
            const result = await api.get(`/api/v1/slide/${id}`);
            return result.data[0];
      }));
      console.log(slideDetails)
      setSlideDetails(slideDetails)
    }catch(err){
      console.log(err)
    }
  }

  useEffect(() => {
    getSlideDetails();
  },[slides]);




  return (
        <Carousel className="h-[700px]" ref={parentRef} slide={false} indicators={false}>
          {slideDetails.map(slide => {
            return (<div className="dark:text-white ">
            <div className="flex justify-between mb-10">
              {slide.images.map((img, index) => {
                if (index == 1) {
                  return <img src={img.url} className="block" alt="Image 1" />;
                  }
      
                  return (
                    <img src={img.url} className="hidden sm:block" alt="Image 2" />
                  );
                })}
            </div>
            <div className="border-[#179FEB] border-2 p-5 lg:text-lg">
              <p className="mb-5">{slide.description}</p>
            </div>
          </div>)
          })} 

          {/* <div className="h-3/4 dark:text-white">
            <div className="flex flex-wrap h-3/4">
              <div className="flex">
                <div className="w-full sm:w-1/3 justify-center">
    
                  <img
                    src={sl1}
                    className="w-full h-auto sm:h-1/2"
                    alt="Image 1"
                  />
                </div>
                <div className="w-full sm:w-1/3 justify-center">
         
                  <img
                    src={sl2}
                    className="w-full h-auto sm:h-1/2 hidden sm:block"
                    alt="Image 2"
                  />
                </div>
                <div className="w-full sm:w-1/3 justify-center">
           
                  <img
                    src={sl3}
                    className="w-full h-auto sm:h-1/2 hidden sm:block"
                    alt="Image 3"
                  />

                </div>
              </div>
            </div>
          </div>
          <div className="h-full dark:text-white">
            <div className="flex flex-wrap">
              <div className="flex">
                <div className="w-full sm:w-1/3 justify-center">
              
                  <img
                    src={sl1}
                    className="w-full h-auto sm:h-1/2"
                    alt="Image 1"
                  />
                </div>
                <div className="w-full sm:w-1/3 justify-center">
                
                  <img
                    src={sl2}
                    className="w-full h-auto sm:h-1/2 hidden sm:block"
                    alt="Image 2"
                  />

                </div>
                <div className="w-full sm:w-1/3 justify-center">
               
                  <img
                    src={sl3}
                    className="w-full h-auto sm:h-1/2 hidden sm:block"
                    alt="Image 3"
                  />
                </div>
              </div>
            </div>
          </div> */}
        </Carousel>
  );
}
