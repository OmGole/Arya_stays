
import React, { useEffect } from 'react';
import { Datepicker } from 'flowbite-react';
import { useState } from 'react';
import { Dropdown } from 'flowbite-react';
export default function SearchMobile() {
  const [selectedTitle,setSelectedTitle] = useState('');
  const [selectedLoc, setSelectedLoc] = useState('');
 const [isChoose,SetisChoose] =useState(false);


 const change = ()=>{
      // add param1:title, param2:loc
      // and set it
      SetisChoose(true);
 }
 //set date using useeffect
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

  return (
    <div>
        <div className='container md:hidden  pt-20 mx-auto '>
          <div className='flex flex-wrap border-2 mx-5  border-slate-300/50 custom-shadow-mobile content-center divide-x	  rounded-lg'>
            <div className="w-2/3 dropdown    py-2 ...">
                <Dropdown
                    inline
                    label={ isChoose ? <div className='w-full text-sm'><h1>Classy 1 BHK, near Viviana Mall</h1><p>Casa Ultima, Behind Jupiter Hospital, Thane (W)</p></div> : <div className='py-2  text-lg   w-full'>Choose your stays</div> }
                >
              <Dropdown.Item onClick={change}><div>
                    <h1>Classy 1 BHK, near Viviana Mall</h1>
                    <p>Casa Ultima, Behind Jupiter Hospital, Thane (W)</p>
                </div></Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={change}><div>
                    <h1>Classy 1 BHK, near Viviana Mall</h1>
                    <p>Casa Ultima, Behind Jupiter Hospital, Thane (W)</p>
                </div></Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={change}><div>
                    <h1>Classy 1 BHK, near Viviana Mall</h1>
                    <p>Casa Ultima, Behind Jupiter Hospital, Thane (W)</p>
                </div></Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={change}><div>
                    <h1>Classy 1 BHK, near Viviana Mall</h1>
                    <p>Casa Ultima, Behind Jupiter Hospital, Thane (W)</p>
                </div></Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={change}><div>
                    <h1>Classy 1 BHK, near Viviana Mall</h1>
                    <p>Casa Ultima, Behind Jupiter Hospital, Thane (W)</p>
                </div></Dropdown.Item>
                </Dropdown>
            </div>
            <div className="w-1/3 dropdown pl-2  py-2 ...">
            <Dropdown
                arrowIcon={true}
                dismissOnClick={false}
                className='px-5 py-4'
                inline
                label={<div className='text-start  w-full'><div className='text-lg'>Guests</div>
            <div className='text-[#F79489] text-sm'>{adultNumber} Adult, {childNumber} Child</div></div>}
                
            >
                <div className='flex w-100 mb-2 justify-between'>
                    <div><h1 className='font-bold text-base w-3/5'>Adults</h1><p className='text-gray-400'>Age 8+</p></div>
                    <div className='w-2/5 justify-between  flex '><button className='border mr-2 rounded-full border-2' onClick={decrAdult}>-</button> {adultNumber}<button className='ml-2 border rounded-full' onClick={incrAdult}>+</button></div>
                </div>
                <Dropdown.Divider />
                <div className='flex w-100 my-2 justify-between'>
                        <div><h1 className='font-bold text-base w-3/5'>Child</h1><p className='text-gray-400'>Age 0 - 8</p></div>
                        <div className='w-2/5 justify-between  flex'><button onClick={decrChild} className='border mr-2 rounded-full'>-</button> {childNumber}<button onClick={incrChild} className='ml-2 border rounded-full'>+</button></div>
                </div>
                <Dropdown.Divider />
                <div><h1 className='text-green-500 font-bold w-64'>Charges are not applicable for children below 8</h1></div>
                
            </Dropdown>
            </div>
          </div>
          <div className='flex flex-wrap border-2 mx-5 mt-2 border-slate-300/50 custom-shadow-mobile content-center divide-x	  rounded-lg'>
            <div className="w-1/3 dropdown    py-2 ...">
            <h1 className='pl-3 z-10'>Check In</h1>
                <Datepicker value={checkInDate} onSelectedDateChanged={handleCheckIn} className='p-0  custom-date'/>
            </div>
            <div className="w-1/3 dropdown pl-2  py-2 ...">
            <h1 className='pl-3 z-10'>Check In</h1>
                <Datepicker value={checkOutDate} onSelectedDateChanged={handleCheckOut} className='p-0  custom-date'/>
            </div>
            <div className="w-1/3 dropdown    ...">
            <button className='w-full align-center bg-[#F79489] h-full text-xl font-bold rounded-lg text-white '><i class="fa fa-search"/></button>
            </div>
          </div>
        </div>
    </div>
  )
}
