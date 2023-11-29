import React, { useEffect, useState } from 'react'
import NavbarC from '../Components/NavbarC'
import FooterC from '../Components/FooterC'
import { useDispatch, useSelector } from 'react-redux'
import { Modal } from 'flowbite-react';
import api from '../api/api'
import { getPropertyById } from '../Store/propertySlice'
import whatsapp from '../Resources/Whatsapp.png'
import gmail from '../Resources/Gmail.png'
import { useLocation, useNavigate } from 'react-router-dom';
import { createOrder } from '../Store/orderSlice';
import { reset } from '../Store/currentOrderSlice';
import emailjs from '@emailjs/browser'


export default function Booking() {
    const {state} = useLocation();
    const dispatch = useDispatch();
    const currOrder = useSelector(state => state.currentOrder.currentOrder);
    const { property } = state;
    const userId = useSelector(state => state.user.user.uid);
    const [slideImage,setSlideImage] = useState([])
    const [numberOfNights,setNumberOfNights] = useState()
    const [amenitiesPrice,setAmenitiesPrice] = useState()
    const [openModal, setOpenModal] = useState(false);
    const [amenityTitle,setAmenityTitle] = useState([])
    let navigate = useNavigate(); 

    // calculate nights
    useEffect(()=>{
        const [day, month, year] = currOrder.CheckInDate.split('/').map(Number);
        const checkInDate = new Date(year, month - 1, day);
        const [day2, month2, year2] = currOrder.CheckOutDate.split('/').map(Number);
        const checkOutDate = new Date(year2, month2 - 1, day2); // Replace this with your check-out date
        const differenceInTime = checkOutDate.getTime() - checkInDate.getTime();
        const oneDayInMilliseconds = 1000 * 60 * 60 * 24;
        const numOfNights = Math.round(differenceInTime / oneDayInMilliseconds);
        setNumberOfNights(numOfNights)
    },[])

    
    // get property images
    useEffect(()=>{
        getSlideImage()
    },[property])

    const getSlideImage = async()=>{
        try{
            const new_slide_images = await Promise.all(property.currentLocation_images.map(async (id,index) => {
                if(index!=2){
                    const result = await api.get(`/api/v1/image/${id}`);
                    return result.data.url;
                }
            }));
            setSlideImage(new_slide_images)
        }catch(err){
          console.log(err)
        }
    }
    
    // calculate amenities price and amenity title
    useEffect(()=>{
        const totalSum = currOrder.amenities.reduce((accumulator, amenity) => {
            return accumulator + (amenity.price * amenity.qty);
          }, 0);
        setAmenitiesPrice(totalSum)
        getAmenityTitle()
    },[])

    const getAmenityTitle = async()=>{
        const amenitytitle = await Promise.all(currOrder.amenities.map(async (item,index) => {
            const result = await api.get(`/api/v1/amenity/${item.id}`);
            return result.data.title;
        }
        ));
        setAmenityTitle(amenitytitle)
    }

    const WhatsappMessage = () =>{
        console.log(amenityTitle);

        let msg = 'Hello+I%27m+UserName%2C+I+would+like+to+enquire+about+following+property%0D%0AProperty+%3A+'+ currOrder.Title +'%0D%0ALocation+%3A+'+ currOrder.Location +'%0D%0ACheckInDate+%3A+'+ currOrder.CheckInDate + '%0D%0ACheckOutDate+%3A+'+ currOrder.CheckOutDate +'%0D%0ARoom+Type+%3A+'+ currOrder.RoomType +'%0D%0ANumber+of+Adult+%3A+'+ currOrder.adultNumber +'%0D%0ANumber+of+Child+%3A+'+ currOrder.childNumber +'%0D%0AAmenities+%3A+'+ amenityTitle;


        window.open('https://api.whatsapp.com/send?phone=919136886650&text='+msg, '_blank', 'noreferrer');
        
        const requiredFormatInDate = convertDateFormat(currOrder.CheckInDate);
        const requiredFormatOutDate = convertDateFormat(currOrder.CheckOutDate);

        const finalOrder = {
            check_in:new Date(requiredFormatInDate).toISOString(),
            check_out:new Date(requiredFormatOutDate).toISOString(),
            accomodation:currOrder.RoomType,
            guest:{
                adult:currOrder.adultNumber,
                children:currOrder.childNumber
            },
            propertyId:currOrder.Id,
            userId,
            amenities:currOrder.amenities
        }
        console.log(finalOrder);
        dispatch(createOrder(finalOrder));
        dispatch(reset());
        navigate('/orders')
    }

    // const sendEmail = () => {
    //     console.log(amenityTitle)
    //     let msg = 'Hello+I%27m+UserName%2C+I+would+like+to+enquire+about+following+property%0D%0AProperty+%3A+'+ currOrder.Title +'%0D%0ALocation+%3A+'+ currOrder.Location +'%0D%0ACheckInDate+%3A+'+ currOrder.CheckInDate + '%0D%0ACheckOutDate+%3A+'+ currOrder.CheckOutDate +'%0D%0ARoom+Type+%3A+'+ currOrder.RoomType +'%0D%0ANumber+of+Adult+%3A+'+ currOrder.adultNumber +'%0D%0ANumber+of+Child+%3A+'+ currOrder.childNumber +'%0D%0AAmenities+%3A+'+ amenityTitle
    //     // console.log(msg)
    //     const subject = `Book Property ${currOrder.Title}`;
    //     window.open(`mailto:omgole82@gmail.com`);
    //     // window.open("youtube.com");
    //     // navigate('/orders');
    // }

    const sendEmail = () => {
        const param = {
            to_name:'yash',
            from_name:'username',
            from_email:'useremail',
            title:currOrder.Title,
            location:currOrder.Location,
            checkindate:currOrder.CheckInDate,
            checkoutdate:currOrder.CheckOutDate,
            roomtype:currOrder.RoomType,
            adultnumber:currOrder.adultNumber,
            childnumber:currOrder.childNumber,
            amenities:amenityTitle,
        };
        console.log(param)
    
        emailjs.send('service_xocsixq', 'template_5jokq89', param, 'hxrJoDY6Iai13B0RZ')
          .then((result) => {
              console.log(result.text);
          }, (error) => {
              console.log(error.text);
          });

          const requiredFormatInDate = convertDateFormat(currOrder.CheckInDate);
          const requiredFormatOutDate = convertDateFormat(currOrder.CheckOutDate);
  
          const finalOrder = {
              check_in:new Date(requiredFormatInDate).toISOString(),
              check_out:new Date(requiredFormatOutDate).toISOString(),
              accomodation:currOrder.RoomType,
              guest:{
                  adult:currOrder.adultNumber,
                  children:currOrder.childNumber
              },
              propertyId:currOrder.Id,
              userId,
              amenities:currOrder.amenities
          }
          console.log(finalOrder);
          dispatch(createOrder(finalOrder));
          dispatch(reset());

          navigate('/orders')
      };

    const convertDateFormat = (inputDate) => {
        const dateComponents = inputDate.split('/');
      
        if (dateComponents.length !== 3) {
          throw new Error('Invalid date format. Please use dd/mm/yyyy.');
        }
      
        const day = dateComponents[0];
        const month = dateComponents[1];
        const year = dateComponents[2];
      
        const outputDate = `${month}/${day}/${year}`;
      
        return outputDate;
      }


  return (
    <div>
        <NavbarC/>
        <div class="container mx-auto px-5 py-2 lg:px-20 lg:my-5">
            <div className='flex gap-x-2 flex-col md:flex-row'>
                <div className='md:w-2/3 p-4 rounded border-2 border-[#6ACDE9]'>
                    <div class="-m-1 flex flex-wrap md:-m-2">
                        <div class="flex w-1/2 flex-wrap">
                            <div class="w-full p-1 md:p-2">
                                <img
                                alt="gallery"
                                class="block h-full w-full rounded-lg object-cover object-center"
                                src={slideImage[0]} />
                            </div>
                        </div>
                        <div class="flex w-1/2 flex-wrap">
                            <div class="w-1/2 p-1 md:p-2">
                                <img
                                alt="gallery"
                                class="block h-full w-full rounded-lg object-cover object-center"
                                src={slideImage[1]} />
                            </div>
                            <div class="w-1/2 p-1 md:p-2">
                                <img
                                alt="gallery"
                                class="block h-full w-full rounded-lg object-cover object-center"
                                src={slideImage[3]} />
                            </div>
                            <div class="w-1/2 p-1 md:p-2">
                                <img
                                alt="gallery"
                                class="block h-full w-full rounded-lg object-cover object-center"
                                src={slideImage[4]} />
                            </div>
                            <div class="w-1/2 p-1 md:p-2">
                                <img
                                alt="gallery"
                                class="block h-full w-full rounded-lg object-cover object-center"
                                src={slideImage[5]} />
                            </div>
                        </div>
                    </div>
                    <div className='mt-4'>
                        <h1 className='font-medium md:text-xl'>{currOrder.Title}</h1>
                        <h1 className='text-lg'>{currOrder.Location}</h1>
                        <h1 className='text-lg'>Type : {currOrder.RoomType}</h1>
                        <h1 className='text-lg'>Total guest : {currOrder.adultNumber + currOrder.childNumber}</h1>
                        <h1 className='text-lg'>Adult : {currOrder.adultNumber} Children : {currOrder.childNumber}</h1>
                        <div className='flex'>
                            <div className='w-1/2 pr-2 py-2 text-white font-medium'><div className='bg-[#6ACDE9] md:text-xl p-4 rounded-lg '><h1 className=''>Check In Date</h1>{currOrder.CheckInDate}</div></div>
                            <div className='w-1/2 pl-2 py-2 text-white font-medium'><div className='bg-[#6ACDE9] md:text-xl p-4 rounded-lg '><h1 className=''>Check Out Date</h1>{currOrder.CheckOutDate}</div></div>
                        </div>
                    </div>
                </div>
                <div className='md:w-1/3 rounded border-2 border-[#6ACDE9]'>
                    <div className='p-4 border-b-2'>
                        <h1 className='text-xl text-[#949494] font-medium'>Price Details</h1>
                    </div>
                    <div className='p-4 border-b-2 flex justify-between items-center'>
                        <div><h1 className='text-lg font-medium'>Stay Amount</h1><h1>{currOrder.adultNumber} Adults x {numberOfNights} Nights</h1></div>
                        <div><h1 className='text-[#268F43] font-bold'>RS PRICE/-</h1></div>
                    </div>
                    <div className='p-4 border-b-2 flex justify-between items-center'>
                        <div><h1 className='text-lg font-medium'>Total Service Charges</h1><h1>( {currOrder.amenities.length} Items)</h1></div>
                        <div><h1 className='text-[#268F43] font-bold'>RS {amenitiesPrice} /-</h1></div>
                    </div>
                    <div className='p-4 border-b-2 flex justify-between items-center'>
                        <div><h1 className='text-lg font-medium'>Amount to be Paid</h1></div>
                        <div><h1 className='text-[#268F43] font-bold'>RS PRICE/-</h1></div>
                    </div>
                    <div className='p-4 border-b-2'>
                    <button onClick={() => setOpenModal(true)} className=' bg-[#F79489] w-full md:text-xl text-xl py-2 rounded font-medium text-white'>Book Now</button>
                    </div>
                    <div className='p-4'>
                        <h1 className='font-medium'>Our Team will shortly contact you with the
availabilty of our Homestays</h1>
                    </div>
                </div>

            </div>
            
        </div>
        <FooterC/>
        <Modal dismissible show={openModal} onClose={() => setOpenModal(false)} popup>
    <Modal.Header></Modal.Header>
    <Modal.Body>
        <div className=" w-full">
            <h1 className='font-medium text-center text-lg underline decoration-[#F79489] underline-offset-8 decoration-4'>Send Booking Request</h1>
            <div className='flex gap-x-2 mt-4 flex-row   '>
                <div className='w-1/2 p-4 rounded border-2 border-[#6ACDE9] cursor-pointer' onClick={WhatsappMessage}>
                    <div className='text-center p-2  grid justify-items-center '>
                        <h1 className='text-xl font-medium'>Whatsapp</h1>
                        <img src={whatsapp} className='w-2/3 ' />
                        <h1>Quicker Response</h1>
                        <h1>(Recommended)</h1>
                    </div>
                </div>
                <div className='w-1/2 p-4 rounded border-2 border-[#6ACDE9] cursor-pointer' onClick={sendEmail}>
                    <div className='text-center p-2  grid justify-items-center '>
                        <h1 className='text-xl font-medium'>G-mail</h1>
                        <img src={gmail} className='w-2/3 ' />
                        <h1>Response within 24 hours</h1>Hello
                        {/* <h1>(Recommended)</h1> */}
                    </div>
                </div>
                
            </div>
         

        
        
        
        
        
        
        </div>
    </Modal.Body>
    
  </Modal>
    </div>
  )
}
