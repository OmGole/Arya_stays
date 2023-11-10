import React from 'react'
import Bg from '../Resources/aboutbg.png'


export default function About() {
  return (
    <>
    <div className='md:relative bg-[#EFEFEF] overflow-hidden md:h-full py-10 md:py-0     '>
        <img src={Bg} className='object-cover hidden md:block  h-full  w-full'/>
        <div className=' md:absolute  md:mx-24 inset-0 m-auto grid content-center  mx-10'>
            <h1 className='text-black md:text-6xl text-3xl font-medium'>About</h1>
            <p className='md:text-xl md:mt-10 mt-2 text-base md:mr-96 md:pr-60'>Welcome to Aarya Stays, where comfort, safety and women friendly is everything. We provide Beautiful room presentations, & reservation options, & a whole lot more awaits here. Welcome to Aarya Stays, where comfort, safety and women friendly is everything. We provide Beautiful room presentations, & reservation options, & a whole lot more awaits here.Welcome to Aarya Stays, where comfort, safety and women friendly is everything. We provide Beautiful room presentations, & reservation options, & a whole lot more awaits here.</p>
           
            
        </div>
    </div>
    </>
    
  )
}
