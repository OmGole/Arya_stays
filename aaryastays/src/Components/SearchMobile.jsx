
import React, { useEffect } from 'react';
import { Datepicker } from 'flowbite-react';
import { useState } from 'react';
import { Dropdown } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateOrder } from '../Store/currentOrderSlice';
import { useNavigate } from 'react-router-dom';
export default function SearchMobile({dropdownArray}) {
    const dispatch = useDispatch();
    const currOrder = useSelector(state => state.currentOrder.currentOrder)
    let navigate = useNavigate()

    const [selectedTitle,setSelectedTitle] = useState('');
    const [selectedLoc, setSelectedLoc] = useState('');
    const [selectedId,setSelectedId] = useState('');
   const [isChoose,SetisChoose] =useState(false);

    console.log(dropdownArray)
   const changeDropdown = (title,loc,id)=>{
        setSelectedLoc(loc)
        setSelectedTitle(title)
        dispatch(updateOrder({key:'Title',value:title}))
        dispatch(updateOrder({key:'Location',value:loc}))
        dispatch(updateOrder({key:'Id',value:id}))
        setSelectedId(id)
        SetisChoose(true);
        
   }
   //set date using useeffect
    const [checkInDate,setCheckInDate] = useState();  
    const [checkOutDate,setCheckOutDate] = useState(); 
    useEffect(()=>{
        const checkin = new Date();
        checkin.setDate(new Date().getDate()+2);
        const checkout = new Date();
        checkout.setDate(new Date().getDate()+3);

        setCheckInDate(`${checkin.getDate()}/${checkin.getMonth() + 1}/${checkin.getFullYear()}`);
        dispatch(updateOrder({key:'CheckInDate',value:`${checkin.getDate()}/${checkin.getMonth() + 1}/${checkin.getFullYear()}`}))
        setCheckOutDate(`${checkout.getDate()}/${checkout.getMonth() + 1}/${checkout.getFullYear()}`);
        dispatch(updateOrder({key:'CheckOutDate',value:`${checkout.getDate()}/${checkout.getMonth() + 1}/${checkout.getFullYear()}`}))
        dispatch(updateOrder({key:'adultNumber',value:2}))
        dispatch(updateOrder({key:'childNumber',value:1}))
    },[]) 

    useEffect(()=>{
        console.log(currOrder)
    },[currOrder])

    const handleCheckIn = (date) => {
        console.log(typeof date)
        setCheckInDate(date.getDate()+'/'+(date.getMonth()+1) +'/'+date.getFullYear());
        dispatch(updateOrder({key:'CheckInDate',value:date.getDate()+'/'+(date.getMonth()+1) +'/'+date.getFullYear()}))
    };

    const handleCheckOut = (date) => {
        setCheckOutDate(date.getDate()+'/'+(date.getMonth()+1) +'/'+date.getFullYear());
        dispatch(updateOrder({key:'CheckOutDate', value:date.getDate()+'/'+(date.getMonth()+1) +'/'+date.getFullYear()}))
    };
   

   const [adultNumber,setAdultNumber] = useState(2);
   const incrAdult = () =>{
         setAdultNumber(adultNumber+1);
         dispatch(updateOrder({key:'adultNumber',value:adultNumber+1}))
   }
   const decrAdult = ()=>{
    if (adultNumber>0){
           setAdultNumber(adultNumber-1)
           dispatch(updateOrder({key:'adultNumber',value:adultNumber-1}))
       }
   }

   const [childNumber,setChildNumber] = useState(1);
   const incrChild = () =>{
    setChildNumber(childNumber+1);
    dispatch(updateOrder({key:'childNumber',value:childNumber+1}))
   }
   const decrChild = ()=>{
    if(childNumber > 0){
        setChildNumber(childNumber-1)
        dispatch(updateOrder({key:'childNumber',value:childNumber-1}))
    }
   }

   const redirectToIndividualPage = ()=>{
    if(selectedId){
        navigate('/property/'+selectedId)
    }else{
        alert('Please select a property')
    }
   }

  return (
    <div>
        <div className='container md:hidden  pt-10 mx-auto '>
          <div className='flex flex-wrap border-2 mx-5  border-slate-300/50 custom-shadow-mobile content-center divide-x	  rounded-lg'>
            <div className="w-3/5 dropdown flex items-center   py-2  px-4 ...">
                <Dropdown
                    inline
                    label={ isChoose ? <div className='w-full text-sm text-start'><h1 className='font-medium'>{selectedTitle}</h1><p><i className='fa  fa-map-marker text-[#6ACDE9] mr-2'></i>{selectedLoc}</p></div> : <div className='py-2  text-[17px]   w-full font-medium'>Choose your stays</div> }
                >
              {dropdownArray.map(item=>{
                    return(<>
                    <Dropdown.Item onClick={()=>{changeDropdown(item.title,item.location,item.id)}}><div className='text-start'>
                        <h1>{item.title}</h1>
                        <p>{item.location}</p>
                    </div></Dropdown.Item>
                    <div className='last-divider'><Dropdown.Divider /></div>
                    
                    </>)
                })}
                </Dropdown>
            </div>
            <div className="w-2/5 dropdown pl-1  py-2 pr-1 ...">
                <Dropdown
                    arrowIcon={true}
                    dismissOnClick={false}
                    className='px-5 py-4'
                    inline
                    label={<div className='text-start  w-full'><div className='text-[17px] font-medium'>Guests</div>
                <div className='text-[#F79489] text-[13px]'>{adultNumber} Adult, {childNumber} Child</div></div>}
                    
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
            <div className="w-2/5 dropdown    py-2 ...">
            <h1 className='pl-3  z-10 font-medium'>Check In</h1>
                <Datepicker value={checkInDate} minDate={new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()+2)} onSelectedDateChanged={handleCheckIn} className='p-0  custom-date'/>
            </div>
            <div className="w-2/5 dropdown pl-0  py-2 ...">
            <h1 className='pl-3 z-10 font-medium'>Check Out</h1>
                <Datepicker value={checkOutDate} minDate={new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()+3)} onSelectedDateChanged={handleCheckOut} className='p-0  custom-date'/>
            </div>
            <div className="w-1/5 dropdown    ...">
                <Link to={`/property/${selectedId}`}>
                    <button className='w-full align-center bg-[#F79489] h-full text-xl font-bold rounded-lg text-white '><i class="fa fa-search"/></button>
                </Link>
            </div>
          </div>
        </div>
    </div>
  )
}
