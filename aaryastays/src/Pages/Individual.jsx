import React, { useState, useRef } from 'react'
import { useParams } from "react-router-dom";
import NavbarC from '../Components/NavbarC';
import headingbg from '../Resources/headingbg.png'
import aboutspace from '../Resources/aboutspace.png'
import Search from '../Components/Search';
import SearchMobile from '../Components/SearchMobile';
import PropertyCard from '../Components/PropertyCard';
import Reviews from '../Components/Reviews';
import Query from '../Components/Query';
import About from '../Components/About';
import FooterC from '../Components/FooterC';
import Meals from '../Resources/Meals.png'
import Slide from '../Components/Slide';
import Slide2 from '../Components/Slide2';
import Bin from '../Resources/Bin.png'
import Chef from '../Resources/Chef.png'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { getPropertyById } from '../Store/propertySlice'
import { useEffect } from 'react';
import IndividualCard from '../Components/IndividualCard';
import {getHeadingImages, getImageById} from '../Store/imageSlice';
import DummyImgSqr from '../Resources/DummyImgSqr.png'
import {getSingleCard} from '../Store/cardSlice'
import api from '../api/api';

import { Dropdown, Datepicker } from 'flowbite-react';

export default function Individual() {

    const routeParams = useParams();
    const routeParamsID = routeParams.id;
    const [showOnDemand,setShowOnDemand] = useState(false);

    const dispatch = useDispatch();
    const property = useSelector(state => state.property.propertyById);
    const heading_img = useSelector(state=> state.image.headingImage)
    
    const [headingImage,setHeadingImage] = useState('')


useEffect(() => {
    dispatch(getPropertyById(routeParamsID)).then((data)=>{
        setPrice(data.payload.price)
        dispatch(getHeadingImages(data.payload.currentLocation_images[0])).then((data)=>{
            setHeadingImage(data.payload.url)
        });
    })
  }, [dispatch]);
  
  
  useEffect(()=>{
    console.log(heading_img.url)

  
  },[heading_img])

    const addOnDemand = () =>{
        setShowOnDemand(true)
    }

    //ATS img logic

    
    // const ats_img = useSelector(state => state.image.imageById);

    // useEffect(() => {
    //     console.log(property.ats_image)
    //     dispatch(getImageById(property.ats_image[0]));
    //     console.log(property)
    // },[dispatch]);

    // Card logic

    // current location img

    
 
    // useEffect(()=>{
    //     console.log(property.currentLocation_images[0])
    //     dispatch(getImageById(property.currentLocation_images[0]));
    // },[dispatch])
    

    



    // Search component logic

    const [checkInDate,setCheckInDate] = useState();  
    const [checkOutDate,setCheckOutDate] = useState(); 
    useEffect(()=>{
        setCheckInDate(new Date().getDate()+'/'+(new Date().getMonth()+1) +'/'+new Date().getFullYear());
        setCheckOutDate((new Date().getDate()+1)+'/'+(new Date().getMonth()+1) +'/'+new Date().getFullYear());
    },[]) 

    const handleCheckIn = (date) => {
        setCheckInDate(date.getDate()+'/'+(date.getMonth()+1) +'/'+date.getFullYear());
    };

    const handleCheckOut = (date) => {
        setCheckOutDate(date.getDate()+'/'+(date.getMonth()+1) +'/'+date.getFullYear());
    };
   

   const [adultNumber,setAdultNumber] = useState(2);
   const incrAdult = () =>{
         setAdultNumber(adultNumber+1);
   }
   const decrAdult = ()=>{
    if (adultNumber>0){
           setAdultNumber(adultNumber-1)
       }
   }

   const [childNumber,setChildNumber] = useState(1);
   const incrChild = () =>{
    setChildNumber(childNumber+1);
   }
   const decrChild = ()=>{
    if(childNumber > 0){
        setChildNumber(childNumber-1)
    }
   }

   const [price,setPrice] = useState(7000)

   const [roomType,setRoomType] = useState("Full Property");

    const handleRoomType = (type) => {
      setRoomType(type)
    }

   const myRef = useRef(null);

   const executeScroll = () => myRef.current.scrollIntoView();

   if(!property || !property.cards) {
    return <div>
      
    </div>
  }
  return (
    <div>
        <NavbarC/>
        <div className='relative overflow-hidden md:h-full h-64'>
            <img src={headingImage} className='object-cover  h-full  w-full'/>
            <div className='absolute inset-0    grid content-center text-center backdrop-brightness-50  '>
                <h1 className='text-white md:text-6xl text-2xl font-medium'>{property.title}</h1>
                <h1 className='text-white md:text-4xl text-lg'>{property.location}</h1>
            </div> 
        </div>
        
        <h1 className='text-4xl text-center font-medium my-10 underline decoration-[#F79489] underline-offset-8 decoration-4'>About the <span className='text-[#179FEB] font-bold'>Space</span></h1>

        <div className="w-100 md:h-full h-96 even:bg-[#FABEB7] odd:bg-[#D1EDF5]  md:mt-20 mt-20  relative">
            <img src={aboutspace} className='object-  h-full  w-full'/>
            
            <div className='absolute -bottom-32  w-4/5 md:h-56 mx-auto left-0 right-0 ml-auto mr-auto px-10 py-8 border-8 rounded border-[#B4E2EF] grid content-center text-center bg-white  '>
            <h1 className='text-black md:text-xl text-sm '>{property.location_description}</h1>
                
            </div> 
        </div>

        <h1 className='md:text-4xl text-xl text-center mt-44 font-medium my-10 '>Get a <span className='text-[#179FEB] font-bold'>Sense of the Atmosphere</span> of your next Vacation Destination</h1>
        
        <div className='md:mx-20 mx-10'>
            <div className="video-responsive ">
                <iframe
                width="100%"
                height="480px"
                src={`https://www.youtube.com/embed/c6fY_E3hEZo`}
                // {property.video should be in this format ^}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Embedded youtube"
                />
            </div>

            
        </div>
        <div ref={myRef}></div>
        {/* { console.log("hello",cardArray)} */}
        {/* <SearchFixed name={property.title} loc={property.location}/>
 */}
{/* Search Components */}
    <div className='sticky top-0 z-50'>
        <div className='container md:block hidden  pt-16 mx-auto '>
            <div className='flex flex-wrap border-2 mx-28  border-slate-300/50 custom-shadow content-center divide-x	  rounded-lg'>
                <div class="lg:w-2/6 dropdown bg-white px-5  py-2 ...">
                    <div>
                        <h1 className='text-xl font-medium'>{property.title}</h1>
                        <p><i className='fa  fa-map-marker text-[#6ACDE9] mr-2'></i>{property.location}</p>
                    </div>
                </div>
                <div class="lg:w-1/6 h-full text-lg py-2 bg-white ...">
                    <h1 className='pl-3 z-10 font-medium'>Check In</h1>
                    <Datepicker value={checkInDate} onSelectedDateChanged={handleCheckIn} className='p-0  custom-date'/>
                </div>
                <div class="lg:w-1/6 text-lg py-2 bg-white ...">
                    <h1 className='pl-3 z-10 font-medium'>Check Out</h1>
                    <Datepicker value={checkOutDate} onSelectedDateChanged={handleCheckOut} className='p-0  custom-date'/>
                </div>
                <div class="lg:w-1/6 dropdown px-3 py-2 bg-white ...">
                    <Dropdown
                        arrowIcon={true}
                        dismissOnClick={false}
                        className='px-5 py-4'
                        inline 
                        label={<div className='text-start  w-full'><div className='text-xl font-medium'>Guests</div>
                    <div className='text-[#F79489]'>{adultNumber} Adult, {childNumber} Child</div></div>}    >
                        <div className='flex w-100 mb-2 justify-between'>
                            <div><h1 className='font-bold text-base w-3/5'>Adults</h1><p className='text-gray-400'>Age 8+</p></div>
                            <div className='w-2/5 justify-between  flex items-center'><button className='border mr-2 rounded-full border-2' onClick={decrAdult}>-</button> {adultNumber}<button className='ml-2 border rounded-full border-2' onClick={incrAdult}>+</button></div>
                        </div>
                        <Dropdown.Divider />
                        <div className='flex w-100 my-2 justify-between'>
                                <div><h1 className='font-bold text-base w-3/5'>Child</h1><p className='text-gray-400'>Age 0 - 8</p></div>
                                <div className='w-2/5 justify-between  flex items-center'><button onClick={decrChild} className='border mr-2 rounded-full border-2'>-</button> {childNumber}<button onClick={incrChild} className='ml-2 border rounded-full border-2'>+</button></div>
                        </div>
                        <Dropdown.Divider />
                        <div><h1 className='text-green-500 font-bold w-64'>Charges are not applicable for children below 8</h1></div>
                
                    </Dropdown>
                </div>
                <div class="lg:w-1/6 bg-white ...">
                    <button onClick={executeScroll} className='w-full align-center bg-[#F79489] h-full text-xl font-bold rounded-lg text-white py-2 px-3'>Edit</button>
                </div>
            </div>
        </div>
    </div>


        {/* <Search/>
            <SearchMobile /> */}

        <h1  className='md:text-4xl text-xl text-center font-medium my-10 underline decoration-[#F79489] underline-offset-8 decoration-4'>Accomodations in <span className='text-[#179FEB] font-bold'>Aarya Stays</span></h1>
        

        {/* property card */}

        <div className='  md:mx-20 mx-8 '>
      <div  class="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:p-5 ">
        <div className='img-border p-5 md:w-1/3 md:h-80   '>
          <img class="object-cover w-full  rounded-lg h-auto md:h-full md:w-full  " src={DummyImgSqr} alt=""/>
        </div>
        
        <div class="flex flex-col justify-between p-5 md:w-2/3 leading-normal">
          <h1 className='font-medium md:text-3xl text-xl'>{property.title}</h1>
          <span className='text-lg text-[#8E8E8E]'><i className='fa  fa-map-marker text-[#6ACDE9] text-xl'></i> {property.location}</span>
          <p className='md:text-xl text-md'>{property.room_description}</p>
          <div className='flex flex-wrap'>
            <div class="md:w-1/3 w-1/2 h-full text-lg py-2 ...">
                <h1 className='pl-3 z-10 font-medium'>Check In</h1>
                <Datepicker value={checkInDate} onSelectedDateChanged={handleCheckIn} className='p-0  custom-date cursor-pointer'/>
            </div>

            <div class="md:w-1/3 w-1/2 text-lg py-2 ...">
                <h1 className='pl-3 z-10 font-medium'>Check Out</h1>
                <Datepicker value={checkOutDate} onSelectedDateChanged={handleCheckOut} className='p-0  custom-date'/>
            </div>

            <div class="md:lg:w-1/3 w-1/2 dropdown px-3 py-2 ...">
                  <Dropdown
                      arrowIcon={true}
                      className='px-5 py-4'
                      inline
                      label={<div className='text-start  w-full'><div className='text-xl font-medium'>Type</div>
                  <div className='text-[#F79489]'>{roomType}</div></div>}>
                      <Dropdown.Item>
                      <div className=' cursor-pointer' onClick={()=>{handleRoomType('Full Property')}}>
                          <h1 className='font-bold text-base '>Full Property</h1>
                      </div>
                      </Dropdown.Item>
                      
                      <Dropdown.Divider />
                      <Dropdown.Item>
                      <div className=' cursor-pointer' onClick={()=>{handleRoomType('Dorm Beds')}}>
                          <h1 className='font-bold text-base '>Dorm Beds</h1>
                      </div>
                      </Dropdown.Item>
                      
                      <Dropdown.Divider />
                      <Dropdown.Item>
                      <div className=' cursor-pointer' onClick={()=>{handleRoomType('Private Rooms')}}>
                          <h1 className='font-bold text-base '>Private Rooms</h1>
                      </div>
                      </Dropdown.Item>
                      
                  </Dropdown>
            </div>

            <div class="lg:w-1/3 w-1/2 dropdown px-3 py-2 ...">
                <Dropdown
                    arrowIcon={true}
                    dismissOnClick={false}
                    className='px-5 py-4'
                    inline
                    label={<div className='text-start  w-full'><div className='text-xl font-medium'>Guests</div>
                <div className='text-[#F79489]'>{adultNumber} Adult, {childNumber} Child</div></div>}>
                    <div className='flex w-100 mb-2 justify-between'>
                        <div><h1 className='font-bold text-base w-3/5'>Adults</h1><p className='text-gray-400'>Age 8+</p></div>
                        <div className='w-2/5 justify-between  flex items-center'><button className='border mr-2 rounded-full border-2' onClick={decrAdult}>-</button> {adultNumber}<button className='ml-2 border rounded-full border-2' onClick={incrAdult}>+</button></div>
                    </div>
                    <Dropdown.Divider />
                    <div className='flex w-100 my-2 justify-between'>
                            <div><h1 className='font-bold text-base w-3/5'>Child</h1><p className='text-gray-400'>Age 0 - 8</p></div>
                            <div className='w-2/5 justify-between  flex items-center'><button onClick={decrChild} className='border mr-2 rounded-full border-2'>-</button> {childNumber}<button onClick={incrChild} className='ml-2 border rounded-full border-2'>+</button></div>
                    </div>
                    <Dropdown.Divider />
                    <div>
                      <h1 className='text-green-500 font-bold w-64'>Charges are not applicable for children below 8</h1>
                    </div>
                    
                </Dropdown>
            </div>

            <div className='lg:w-1/2 w-full px-3 py-2'>
                  <div className='flex  items-center h-full'>
                    <h1 className='font-medium md:text-xl'>Total before Taxes </h1>
                    <span className='py-1 px-2 ml-2 border-2 rounded-lg border-green-500 text-green-500 font-medium'>Rs {price}/-</span>
                  </div>
            </div>

          </div>
          
        </div>
      </div>

    </div>

    {/* property card ends */}

        <h1 className='text-4xl text-center font-medium my-10 underline decoration-[#F79489] underline-offset-8 decoration-4'>Amenities</h1>
        <div className='w-100  md:mx-20 mx-10 p-10 grid content-center place-content-center border-2 border-slate-200 rounded-lg'>
            <h1 className='text-2xl font-medium'>Essentials</h1>
            <div className='flex flex-wrap  gap-10 mt-4'>
                <div className='aspect-square '>
                    <div className="cursor-pointer flex-1 group perspective h-full custom-shadow rounded hover:w-52 transition-all duration-500  
                ease-in-out">
                        <div className="relative preserve-3d group-hover:my-rotate-y-180 w-full h-full duration-1000">
                            <div className="absolute backface-hidden w-full h-full">
                                <img src={Meals} className=''/>
                            </div>
                            <div className="absolute my-rotate-y-180 backface-hidden w-full h-full overflow-hidden" >
                                <h1>Worried About Work? Experience a smooth internet connection while you stay at Aarya Stays and don’t worry about Internet Connectivity</h1>
                            </div>
                        </div>
                    </div>
                    <h1>Entire Home</h1>
                </div>
                
                <div className='aspect-square '>
                    <div className='flex-1 h-full custom-shadow rounded grid content-center place-content-center'>
                        <img src={Meals} className=''/>
                    </div>
                    <h1>Entire Home</h1>
                </div>
                <div className='aspect-square '>
                    <div className='flex-1 h-full custom-shadow rounded grid content-center place-content-center'>
                        <img src={Meals} className=''/>
                    </div>
                    <h1>Entire Home</h1>
                </div>
                <div className='aspect-square '>
                    <div className='flex-1 h-full custom-shadow rounded grid content-center place-content-center'>
                        <img src={Meals} className=''/>
                    </div>
                    <h1>Entire Home</h1>
                </div>
                <div className='aspect-square '>
                    <div className='flex-1 h-full custom-shadow rounded grid content-center place-content-center'>
                        <img src={Meals} className=''/>
                    </div>
                    <h1>Entire Home</h1>
                </div>
                <div className='aspect-square '>
                    <div className='flex-1 h-full custom-shadow rounded grid content-center place-content-center'>
                        <img src={Meals} className=''/>
                    </div>
                    <h1>Entire Home</h1>
                </div>
                <div className='aspect-square '>
                    <div className='flex-1 h-full custom-shadow rounded grid content-center place-content-center'>
                        <img src={Meals} className=''/>
                    </div>
                    <h1>Entire Home</h1>
                </div>
                <div className='aspect-square '>
                    <div className='flex-1 h-full custom-shadow rounded grid content-center place-content-center'>
                        <img src={Meals} className=''/>
                    </div>
                    <h1>Entire Home</h1>
                </div>
                <div className='aspect-square '>
                    <div className='flex-1 h-full custom-shadow rounded grid content-center place-content-center'>
                        <img src={Meals} className=''/>
                    </div>
                    <h1>Entire Home</h1>
                </div>
                <div className='aspect-square '>
                    <div className='flex-1 h-full custom-shadow rounded grid content-center place-content-center'>
                        <img src={Meals} className=''/>
                    </div>
                    <h1>Entire Home</h1>
                </div>
                <div className='aspect-square '>
                    <div className='flex-1 h-full custom-shadow rounded grid content-center place-content-center'>
                        <img src={Meals} className=''/>
                    </div>
                    <h1>Entire Home</h1>
                </div>
                <div className='aspect-square '>
                    <div className='flex-1 h-full custom-shadow rounded grid content-center place-content-center'>
                        <img src={Meals} className=''/>
                    </div>
                    <h1>Entire Home</h1>
                </div>
                <div className='aspect-square '>
                    <div className='flex-1 h-full custom-shadow rounded grid content-center place-content-center'>
                        <img src={Meals} className=''/>
                    </div>
                    <h1>Entire Home</h1>
                </div>
                <div className='aspect-square '>
                    <div className='flex-1 h-full custom-shadow rounded grid content-center place-content-center'>
                        <img src={Meals} className=''/>
                    </div>
                    <h1>Entire Home</h1>
                </div>
                <div className='aspect-square '>
                    <div className='flex-1 h-full custom-shadow rounded grid content-center place-content-center'>
                        <img src={Meals} className=''/>
                    </div>
                    <h1>Entire Home</h1>
                </div>
                <div className='aspect-square '>
                    <div className='flex-1 h-full custom-shadow rounded grid content-center place-content-center'>
                        <img src={Meals} className=''/>
                    </div>
                    <h1>Entire Home</h1>
                </div>
            </div>
            <h1 className='text-2xl font-medium mt-4'>On Demand Service</h1>
            <div className='flex flex-wrap gap-10  mt-4'>
                <div className='aspect-square ' onClick={addOnDemand}>
                    <div className='flex-1 h-full custom-shadow rounded grid content-center place-content-center'>
                        <img src={Meals} className=''/>
                    </div>
                    <h1>Entire Home</h1>
                </div>
                
                <div className='aspect-square '>
                    <div className='flex-1 h-full custom-shadow rounded grid content-center place-content-center'>
                        <img src={Meals} className=''/>
                    </div>
                    <h1>Entire Home</h1>
                </div>
                <div className='aspect-square '>
                    <div className='flex-1 h-full custom-shadow rounded grid content-center place-content-center'>
                        <img src={Meals} className=''/>
                    </div>
                    <h1>Entire Home</h1>
                </div>
                <div className='aspect-square '>
                    <div className='flex-1 h-full custom-shadow rounded grid content-center place-content-center'>
                        <img src={Meals} className=''/>
                    </div>
                    <h1>Entire Home</h1>
                </div>
                <div className='aspect-square '>
                    <div className='flex-1 h-full custom-shadow rounded grid content-center place-content-center'>
                        <img src={Meals} className=''/>
                    </div>
                    <h1>Entire Home</h1>
                </div>
            </div>
        </div>

        { showOnDemand && <div className='flex flex-wrap  md:mx-20 mx-10 mt-5'>
            <div className=' md:w-2/3 md:pr-2 '>
                <div className='border-2 border-slate-200 rounded-lg divide-y'>
                    <div className='flex md:flex-row flex-col items-center md:justify-start  py-4'>
                        <div className='flex flex-col  items-center justify-center md:w-1/4 w-2/3 '>
                            
                            <img src={Chef} className='custom-shadow w-1/3 rounded p-2'></img>
                            
                            <div className='text-center mt-2'>
                                <h1>Home Chef</h1>

                            </div>

                        </div>
                        <div className='px-2'>
                            <h1>Trained Chef expert to enhance your Homestay Experience.</h1>
                            <h1>Trained Chef expert to enhance your Homestay Experience.</h1>
                            <h1>Trained Chef expert to enhance your Homestay Experience.</h1>
                            <h1>Trained Chef expert to enhance your Homestay Experience.</h1>
                            <div className='flex justify-between mt-2'>
                                <div>
                                    <h1 className='text-[#268F43]'>@ RS 200/ Hour</h1>
                                </div>
                                <div>
                                    <img src={Bin}></img>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='flex md:flex-row flex-col items-center md:justify-start  py-4'>
                        <div className='flex flex-col  items-center justify-center md:w-1/4 w-2/3 '>
                            
                            <img src={Chef} className='custom-shadow w-1/3 rounded p-2'></img>
                            
                            <div className='text-center mt-2'>
                                <h1>Home Chef</h1>

                            </div>

                        </div>
                        <div className='px-2'>
                            <h1>Trained Chef expert to enhance your Homestay Experience.</h1>
                            <h1>Trained Chef expert to enhance your Homestay Experience.</h1>
                            <h1>Trained Chef expert to enhance your Homestay Experience.</h1>
                            <h1>Trained Chef expert to enhance your Homestay Experience.</h1>
                            <div className='flex justify-between mt-2'>
                                <div>
                                    <h1 className='text-[#268F43]'>@ RS 200/ Hour</h1>
                                </div>
                                <div>
                                    <img src={Bin}></img>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='flex md:flex-row flex-col items-center md:justify-start  py-4'>
                        <div className='flex flex-col  items-center justify-center md:w-1/4 w-2/3 '>
                            
                            <img src={Chef} className='custom-shadow w-1/3 rounded p-2'></img>
                            
                            <div className='text-center mt-2'>
                                <h1>Home Chef</h1>

                            </div>

                        </div>
                        <div className='px-2'>
                            <h1>Trained Chef expert to enhance your Homestay Experience.</h1>
                            <h1>Trained Chef expert to enhance your Homestay Experience.</h1>
                            <h1>Trained Chef expert to enhance your Homestay Experience.</h1>
                            <h1>Trained Chef expert to enhance your Homestay Experience.</h1>
                            <div className='flex justify-between mt-2'>
                                <div>
                                    <h1 className='text-[#268F43]'>@ RS 200/ Hour</h1>
                                </div>
                                <div>
                                    <img src={Bin}></img>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div className='md:w-1/3 '>
                <div class="border-2 border-slate-200 rounded-lg grid grid-cols-1 divide-y">
                    <div>
                        <h1 className='md:text-3xl text-xl text-[#949494] font-medium py-2 px-6'>Price details</h1>
                    </div>
                    <div className='flex justify-between py-2 px-6'>
                        <div>
                            <h1 className='font-medium md:text-xl text-lg'>Total Service Charges</h1>
                            <h1 className='text-lg'>(No. of Items)</h1>
                        </div>
                        <div>
                            <h1 className='text-xl text-[#268F43] font-medium'>Rs Price</h1>
                        </div>
                    </div>
                    <div className='py-2 px-6'>
                        <h1 className='md:text-3xl text-xl text-[#949494] font-medium'>Why customized amenities?</h1>
                        <p className='md:text-lg mt-2'>Aarya Stays gives flexibility to their guest to pay according to the needs, we are transperant on pricing & the most affordable brand for Homestays.</p>
                        <button className='bg-[#F79489] w-full md:text-2xl text-xl py-1 rounded font-medium text-white my-4'>Apply</button>
                    </div>
                </div>
                
            </div>


        </div> }

        <div className='md:mx-20 mx-10 w-100 mt-10 text-center'>
            <button className=' bg-[#F79489] w-1/2 md:text-3xl text-xl py-4 rounded font-medium text-white'>Book Now</button>
        </div>

        <Slide/>
        <Slide2/>
        <h1 className='text-4xl text-center font-medium my-10 underline decoration-[#F79489] underline-offset-8 decoration-4'>Everything You Need To Know <span className='text-[#179FEB]'>Before You Book</span></h1>
        <div className='md:mx-20 mx-10'>
        <div className='flex flex-wrap  gap-y-3 '>
            {property && property.cards.map((id)=>{
                return(
                    <IndividualCard id={id}/>
                )
            })}
            </div>
        </div>
        
        <Reviews/>
        <Query/>
        <About/>
        <FooterC/>
    </div>
  )
}
