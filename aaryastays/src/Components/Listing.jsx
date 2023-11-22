import React from 'react'
import HomeCard from './HomeCard';

export default function Listing({properties}) {

  // temporary array
  const arr = [1,2,3,4,5];
  return (
    <div className='text-black'>
      <div className='container   md:py-16 py-10 mx-auto   mx-auto '>
        <div className=' text-center md:text-3xl text-2xl font-bold'>&#129668 Our Magical Stays</div>
        <div className='mt-5  px-3 text-center md:text-4xl text-xl font-medium'>"Make choosing <span className='text-[#179FEB]'>Aarya Stays,</span> <span className='text-[#F79489]'>the best decision of your vaccation</span>"</div>
      </div>

        {properties?.map((property, index) => (
        <div className='w-100 md:h-56 h-96 even:bg-[#FABEB7] odd:bg-[#D1EDF5] md:mt-40 md:mt-32 mt-36  relative'>
        <div className={`md:px-0 px-10   md:w-2/3  absolute -top-32 ${
              index % 2 === 0 ?   'md:left-20':'md:right-20'
            }`}>
          <div className='md:w-full p-3 bg-white  custom-shadow rounded'>
            <div><HomeCard property={property}/></div>
          </div>
        </div>
      </div>
      ))}

       




        {/* proper */}

        {/* <div className='w-100 md:h-56 h-96 bg-[#FABEB7] md:mt-40 md:mt-32 mt-32  relative'>

          <div className='md:px-0 px-10   md:w-2/3  absolute -top-32 md:left-20'>
            
            <div className='md:w-full p-3 bg-white  custom-shadow rounded'>
              <div><HomeCard2 ></HomeCard2></div>
            </div>
          </div>
        </div>

        <div className='w-100 md:h-56 h-96 bg-[#FABEB7] md:mt-40 md:mt-52 mt-44  relative'>

          <div className='md:px-0 px-10   md:w-2/3  absolute -top-32 md:right-20'>
            
            <div className='md:w-full p-3 bg-white  custom-shadow rounded'>
              <div><HomeCard2 ></HomeCard2></div>
            </div>
          </div>
        </div> */}

        
        

        
        
    </div>
  )
}
