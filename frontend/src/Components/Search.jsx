import React, { useEffect } from 'react';
import { Datepicker } from 'flowbite-react';
import { useState } from 'react';
import { Dropdown } from 'flowbite-react';
export default function Search() {

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
        <div className='container md:block hidden  pt-16 mx-auto '>
            <div className='flex flex-wrap border-2 mx-28  border-slate-300/50 custom-shadow content-center divide-x	  rounded-lg'>
            <div class="lg:w-2/6 dropdown  px-9  py-2 ...">
            <Dropdown
                inline
                label={ isChoose ? <div className='w-full '><h1>Classy 1 BHK, near Viviana Mall</h1><p>Casa Ultima, Behind Jupiter Hospital, Thane (W)</p></div> : <div className='py-2  text-lg   w-full'>Choose your stays</div> }
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
            <div class="lg:w-1/6 h-full text-lg py-2 ...">
                <h1 className='pl-3 z-10'>Check In</h1>
                <Datepicker value={checkInDate} onSelectedDateChanged={handleCheckIn} className='p-0  custom-date'/>
            </div>
            <div class="lg:w-1/6 text-lg py-2 ...">
                <h1 className='pl-3 z-10'>Check In</h1>
                <Datepicker value={checkOutDate} onSelectedDateChanged={handleCheckOut} className='p-0  custom-date'/>
            </div>
            <div class="lg:w-1/6 dropdown px-3 py-2 ...">
            <Dropdown
                arrowIcon={true}
                dismissOnClick={false}
                className='px-5 py-4'
                inline
                label={<div className='text-start  w-full'><div className='text-xl'>Guests</div>
            <div className='text-[#F79489]'>{adultNumber} Adult, {childNumber} Child</div></div>}
                
            >
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
                {/* <Dropdown.Item>
                    <div className='flex w-100 justify-between'>
                        <div><h1 className='font-bold text-base flex-1'>Adults</h1><p>Age 8+</p></div>
                        <div className='flex-1  grid grid-cols-3 gap-4 content-center'><button onClick={decrAdult}>-</button> {adultNumber}<button onClick={incrAdult}>+</button></div>
                    </div>
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item >
                    <div className='flex w-100 justify-around'>
                        <div><h1 className='font-bold text-base flex-1'>Child</h1><p>Age 0 - 8</p></div>
                        <div className='flex-1  grid grid-cols-3 gap-4 content-center'><button onClick={decrChild}>-</button> {adultNumber}<button onClick={incrChild}>+</button></div>
                    </div>
                </Dropdown.Item>
                <Dropdown.Item>
                    <div><h1 className='text-green-500 font-bold'>Charges are not applicable for children below 8</h1></div>
                </Dropdown.Item> */}
            </Dropdown>
            </div>
            <div class="lg:w-1/6 ...">
            <button className='w-full align-center bg-[#F79489] h-full text-xl font-bold rounded-lg text-white py-2 px-3'>Search</button>
            </div>
        </div>
        </div>
    </div>
  )
}
