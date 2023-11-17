import React, { useState } from 'react'
import NavbarC from '../Components/NavbarC'
import DummyImgSqr from '../Resources/DummyImgSqr.png'
import FooterC from '../Components/FooterC';

export default function Orders() {

    const [selectedTab,setSelectedTab] = useState(1);

  return (
    <>
        <NavbarC/>
        <div className='md:mx-20 mx-10'>
            <div className='flex justify-around'>
                <div>
                    <button onClick={()=>{setSelectedTab(1)}} className={`border-2 font-medium  py-3 px-8 rounded ${selectedTab==1? 'bg-[#F79489] border-[#FFD93D] text-white':'border-slate-200'}` }>Current Stays</button>
                </div>
                <div>
                    <button onClick={()=>{setSelectedTab(2)}} className={`border-2 font-medium  py-3 px-8 rounded ${selectedTab==2? 'bg-[#F79489] border-[#FFD93D] text-white':'border-slate-200'}` }>Past Stays</button>
                </div>
                <div>
                    <button onClick={()=>{setSelectedTab(3)}} className={`border-2 font-medium  py-3 px-8 rounded ${selectedTab==3? 'bg-[#F79489] border-[#FFD93D] text-white':'border-slate-200'}` }>Cancelled Stays</button>
                </div>
            </div>


            <div>
                <div className='flex flex-col  bg-white  md:flex-row md:p-5 mt-3 '>
                    <div className='img-border p-2 md:w-1/4 md:h-80   '>
                        <img class="object-cover w-full rounded-br-lg rounded-tl-lg h-auto md:h-full md:w-full  " src={DummyImgSqr} alt=""/>
                    </div>
                    <div className=' md:w-3/4 md:h-80 '>
                        <div className='md:ml-5 border-2 h-full  border-slate-200 flex flex-col'>
                            <div className='md:flex-1 border-2 border-slate-200 md:px-10 p-4 justify-center flex-col flex'>
                                <div className='flex justify-between '><h1 className='font-medium md:text-3xl text-xl'>AARYA STAYS X AUROVILLA</h1> <button className='rounded-lg bg-[#F79489] text-white md:px-6 hidden md:block'>VIEW BOOKING</button></div>
                                <span className='md:text-lg text-[#8E8E8E]'><i className='fa  fa-map-marker text-[#6ACDE9] md:text-xl text-lg'></i> Rustomjee Acura, Majiwada, Thane</span>
                                <ul className='flex gap-x-8 md:text-lg list-disc mt-2'><div className='font-medium'> Completed {/*Add status here */}</div><li className='font-medium'>Stay in Mumbai</li><li>Booking Id - 55555555</li></ul>
                            </div>
                            <div className='flex-1 border-2 border-slate-200 md:px-10 p-3 justify-center flex-col flex'>
                                <div className='flex md:gap-x-10 gap-5'>
                                    <div>
                                        <h1 className='md:text-xl text-[#797979]'>Check In</h1>
                                        <h1 className='font-medium'>Sun, 25 Sep 2023</h1>
                                    </div>
                                    <div>
                                        <h1 className='md:text-xl  text-[#797979]'>Check Out</h1>
                                        <h1 className='font-medium'>Sun, 25 Sep 2023</h1>
                                    </div>
                                    <div>
                                        <h1 className='font-medium md:text-xl  '>1 x Private Room</h1>
                                        <h1>Anurup Bhatacharya + 4 Guest</h1>
                                    </div>  
                                </div>
                                <div className='flex  items-center mt-3'>
                                    <h1 className='font-medium md:text-xl'>Amount </h1>
                                    <span className='py-1 px-2 ml-2 border-2 rounded-lg border-green-500 text-green-500 font-medium'>Rs 2000/-</span>
                                    <button className='rounded-lg bg-[#F79489] text-white px-4 py-1 ml-2  md:hidden'>VIEW BOOKING</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>
        <FooterC/>
    </>
  )
}
