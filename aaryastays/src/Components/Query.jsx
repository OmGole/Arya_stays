import React from 'react'

export default function Query() {
  const contactUs = () =>{
    console.log("hello")
    window.open('https://api.whatsapp.com/send?phone=919136886650&text=Hello I want to enquire', '_blank', 'noreferrer');
    
  }
  return (
    <div className='bg-[#FEDD89] w-full text-center py-12 mt-10'>
        <h1 className='md:text-4xl text-2xl font-medium'>Still confused about choosing stays? </h1>
        <h2 className='md:text-xl text-lg mt-8'>Call us <b>+91 7999913023</b> or click the below button to ask your query</h2>
        <button className='rounded-full p-4 px-5 md:text-xl bg-white text-black mt-10' onClick={()=>{contactUs()}}>Ask us Query</button>
    </div>
  )
}
