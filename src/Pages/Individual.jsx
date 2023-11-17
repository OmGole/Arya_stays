import React, { useState } from 'react'
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

export default function Individual() {

    const routeParams = useParams();
    const routeParamsID = routeParams.id;
    const [showOnDemand,setShowOnDemand] = useState(false);

    const addOnDemand = () =>{
        setShowOnDemand(true)
    }


  return (
    <div>
        <NavbarC/>
        <div className='relative overflow-hidden md:h-full h-64'>
            <img src={headingbg} className='object-cover  h-full  w-full'/>
            <div className='absolute inset-0    grid content-center text-center backdrop-brightness-50  '>
                <h1 className='text-white md:text-6xl text-2xl font-medium'>AARYA STAYS X AUROVILLA</h1>
                <h1 className='text-white md:text-4xl text-lg'>Rustomjee Acura, Majiwada, Thane</h1>
            </div> 
        </div>
        
        <h1 className='text-4xl text-center font-medium my-10 underline decoration-[#F79489] underline-offset-8 decoration-4'>About the <span className='text-[#179FEB] font-bold'>Space</span></h1>

        <div className="w-100 md:h-full h-96 even:bg-[#FABEB7] odd:bg-[#D1EDF5]  md:mt-20 mt-20  relative">
            <img src={aboutspace} className='object-  h-full  w-full'/>
            
            <div className='absolute -bottom-32  w-4/5 md:h-56 mx-auto left-0 right-0 ml-auto mr-auto px-10 py-8 border-8 rounded border-[#B4E2EF] grid content-center text-center bg-white  '>
            <h1 className='text-black md:text-xl text-sm '>Enjoy a rejuvenating early-morning yoga session on the sprawling lawn with calming birdsong melodies. Gorge on a delectable breakfast on the lush lawn, where a dreamy setup awaits. Savour mouthwatering dishes amidst the picturesque surroundings, creating unforgettable memories with your family.
Spend the afternoon lazying by the pool  you make the most of Alibaug’s tropical weather.
Add the charm to your celebrations by making your own cocktails and mocktails at the in-house bar with a side of some barbecue bites prepared fresh by our in-house chef.</h1>
                
            </div> 
        </div>

        <h1 className='md:text-4xl text-xl text-center mt-44 font-medium my-10 '>Get a <span className='text-[#179FEB] font-bold'>Sense of the Atmosphere</span> of your next Vacation Destination</h1>
        
        <div className='md:mx-20 mx-10'>
            <div className="video-responsive ">
                <iframe
                width="100%"
                height="480px"
                src={`https://www.youtube.com/embed/rokGy0huYEA`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Embedded youtube"
                />
            </div>

            
        </div>
        <Search/>
            <SearchMobile />

        <h1 className='md:text-4xl text-xl text-center font-medium my-10 underline decoration-[#F79489] underline-offset-8 decoration-4'>Accomodations in <span className='text-[#179FEB] font-bold'>Aarya Stays</span></h1>
        <PropertyCard/>

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
        

        <Reviews/>
        <Query/>
        <About/>
        <FooterC/>
    </div>
  )
}
