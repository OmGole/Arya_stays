import React from 'react'
import Bg from '../Resources/aboutbg.png'


export default function About() {
  return (
    <>
    <div className='lg:relative bg-[#EFEFEF] overflow-hidden lg:h-full py-10 lg:py-0     '>
        <img src={Bg} className='object-cover hidden lg:block  h-full  w-full'/>
        <div className=' lg:absolute  lg:mx-24 inset-0 m-auto grid content-center  mx-10'>
            <h1 className='text-black lg:text-6xl text-3xl font-medium'>About</h1>
            <p className='lg:text-xl lg:mt-10 mt-2 text-base lg:mr-96 lg:pr-60'>Welcome to Aarya Stays, where comfort, safety and women friendly is everything. We provide Beautiful room presentations, & reservation options, & a whole lot more awaits here. Welcome to Aarya Stays, where comfort, safety and women friendly is everything. We provide Beautiful room presentations, & reservation options, & a whole lot more awaits here.Welcome to Aarya Stays, where comfort, safety and women friendly is everything. We provide Beautiful room presentations, & reservation options, & a whole lot more awaits here.</p>
           
            
        </div>
    </div>
    </>
    
  )
}
