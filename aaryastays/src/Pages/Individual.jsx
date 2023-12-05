import React, { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import NavbarC from "../Components/NavbarC";
import aboutspace from "../Resources/aboutspace.png";
import Reviews from "../Components/Reviews";
import Query from "../Components/Query";
import About from "../Components/About";
import FooterC from "../Components/FooterC";
import Slide from "../Components/Slide";
import Bin from "../Resources/Bin.png";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getPropertyById } from "../Store/propertySlice";
import { useEffect } from "react";
import IndividualCard from "../Components/IndividualCard";
import { getHeadingImages, getImageById } from "../Store/imageSlice";
import DummyImgSqr from "../Resources/DummyImgSqr.png";
import { getSingleCard } from "../Store/cardSlice";
import api from "../api/api";
import ReactFlipCard from "reactjs-flip-card";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { authentication } from "../firebase/config";

import { Dropdown, Datepicker, Modal } from "flowbite-react";
import { updateOrder } from "../Store/currentOrderSlice";
import AddOn from "../Components/AddOn";
import IndividualCard2 from "../Components/IndividualCard2";

export default function Individual() {
  const routeParams = useParams();
  const routeParamsID = routeParams.id;
  const [showOnDemand, setShowOnDemand] = useState(false);
  
  const dispatch = useDispatch();
  const property = useSelector((state) => state.property.propertyById);
  const currOrder = useSelector((state) => state.currentOrder.currentOrder);
  const heading_img = useSelector((state) => state.image.headingImage);
  const [price, setPrice] = useState();
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [essentialAmenities, setEssentialAmenities] = useState([]);
  const [extraAmenities, setExtraAmenities] = useState([]);
  const [addedOnDemand, setAddedOnDemand] = useState(new Set());
  const [amenitiesPrice, setAmenitiesPrice] = useState();
  const [allEvents, setAllEvents] = useState([]);
  const [headingImage, setHeadingImage] = useState("");
  const [checkInDate, setCheckInDate] = useState(currOrder?.CheckInDate);
  const [roomType, setRoomType] = useState(currOrder?.RoomType);
  const [checkOutDate, setCheckOutDate] = useState(currOrder?.CheckOutDate);

  useEffect(() => {
    dispatch(updateOrder({ key: "Id", value: routeParamsID }));
    if (!("CheckInDate" in currOrder)) {

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
      
    }
    dispatch(getPropertyById(routeParamsID)).then((data) => {
      dispatch(updateOrder({ key: "Title", value: data.payload.title }));
      dispatch(updateOrder({ key: "Location", value: data.payload.location }));
      dispatch(
        updateOrder({ key: "RoomType", value: data.payload.roomType[0] })
      );
      setPrice(data.payload.price);
      getAmenities(data.payload.amenities);
      getEvents(data.payload.events);
      dispatch(getHeadingImages(data.payload.currentLocation_images[0])).then(
        (data) => {
          setHeadingImage(data.payload.url);
        }
      );
    });
  }, [dispatch]);

  useEffect(() => {
    if(roomType === "full-property") {
      const events = allEvents?.filter(event => event.type === "full-property");
      setFilteredEvents(events);
    } else if(roomType === "private-rooms") {
      const events = allEvents?.filter(event => event.type === "private-rooms");
      setFilteredEvents(events);
    } else {
      const events = allEvents?.filter(event => event.type === "dorm-beds");
      setFilteredEvents(events);
    }
  }, [allEvents, roomType]);

  useEffect(() => {
    overLap();
  },[filteredEvents, checkInDate]);

  useEffect(() => {
    console.log(filteredEvents)
  },[filteredEvents])

  const getAmenities = async (prop) => {
    try {
      // console.log("hello")
      const new_amenities = await Promise.all(
        prop.map(async (id, index) => {
          const result = await api.get(`/api/v1/amenity/${id}`);
          return result.data;
        })
      );
      // console.log(new_amenities);
      // setAmenities(new_amenities)
      const essential = new_amenities.filter(
        (amenity) => amenity.type === "essential"
      );
      const extra = new_amenities.filter((amenity) => amenity.type === "extra");
      setEssentialAmenities(essential);
      setExtraAmenities(extra);
    } catch (err) {
      console.log(err);
    }
  };

  const getEvents = async (events) => {
    const fethcedEvents = await Promise.all(
      events.map(async (id) => {
        const result = await api.get(`/api/v1/event/${id}`);
        return result.data;
      })
    );
    setAllEvents(fethcedEvents);
  }

  const overLap = () => {
    // const arr = checkInDate.split("/");
    // const day = arr[0];
    // const month = arr[1];
    // const year = arr[2];
    // for (let i = 0; i < allEvents.length; i++) {
    //   const d1 = new Date(allEvents[i].start);
    //   const d2 = new Date(year,month,day)
    //   const d3 = new Date(allEvents[i].end);
    //   const d4 = d2;
    //   if ((d1 <= d2 && d2 <= d3) || (d1 <= d4 && d4 <= d3)) {
    //     console.log(d2)
    //     setPrice(allEvents[i].title);
    //     return;
    //   }
    // } 
    console.log(checkInDate);
  }

  const addOnDemand = (item) => {
    const obj = {
      id: item._id,
      price: item.price,
      qty: 1,
    };
    const arr = currOrder.amenities;
    console.log(arr)
    const isNewObjArray = !arr.some((obj2) => obj2.id === obj.id);
    //add obj in arr
    console.log(isNewObjArray)
    if (isNewObjArray) {
      dispatch(updateOrder({ key: "amenities", value: [...arr, obj] }));
      setAddedOnDemand((prev) => new Set([...prev, item]));
    }
    // console.log(item)
    
    setShowOnDemand(true);
  };

  const removeAddedItem = (item) => {
    const updatedValues = new Set(addedOnDemand);
    //i want to delete the object from amenities array

    const newAmenities = currOrder.amenities.filter((amenity) => {
      return amenity.id !== item._id;
    });
    dispatch(updateOrder({ key: "amenities", value: newAmenities }));

    updatedValues.delete(item);
    setAddedOnDemand(updatedValues);
    if (updatedValues.size == 0) {
      setShowOnDemand(false);
    }
  };

  

  // Search component logic

  
  useEffect(() => {
    // setCheckInDate(currOrder.CheckInDate);
    // setCheckOutDate(currOrder.CheckOutDate);
    setRoomType(currOrder.RoomType);
    const totalSum = currOrder.amenities.reduce((accumulator, amenity) => {
      return accumulator + amenity.price * amenity.qty;
    }, 0);
    setAmenitiesPrice(totalSum);

    if (currOrder.amenities.length > 0) {
      // console.log("have amenities");
      setShowOnDemand(true);
      getAlreadyAddedAmenity(currOrder.amenities);
    }
  }, [currOrder]);

  const getAlreadyAddedAmenity = async (prop) => {
    const new_amenities = await Promise.all(
      prop.map(async (item, index) => {
        const result = await api.get(`/api/v1/amenity/${item.id}`);
        return result.data;
      })
    );
    setAddedOnDemand(new_amenities);
  };

  const handleCheckIn = (date) => {
    setCheckInDate(
      date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
    );
    dispatch(
      updateOrder({
        key: "CheckInDate",
        value:
          date.getDate() +
          "/" +
          (date.getMonth() + 1) +
          "/" +
          date.getFullYear(),
      })
    );
  };

  const handleCheckOut = (date) => {
    setCheckOutDate(
      date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
    );
    dispatch(
      updateOrder({
        key: "CheckOutDate",
        value:
          date.getDate() +
          "/" +
          (date.getMonth() + 1) +
          "/" +
          date.getFullYear(),
      })
    );
  };

  const [adultNumber, setAdultNumber] = useState(
    currOrder.adultNumber ? currOrder.adultNumber : 2
  );
  const incrAdult = () => {
    setAdultNumber(adultNumber + 1);
    dispatch(updateOrder({ key: "adultNumber", value: adultNumber + 1 }));
  };
  const decrAdult = () => {
    if (adultNumber > 0) {
      setAdultNumber(adultNumber - 1);
      dispatch(updateOrder({ key: "adultNumber", value: adultNumber - 1 }));
    }
  };

  const [childNumber, setChildNumber] = useState(
    currOrder.childNumber ? currOrder.childNumber : 1
  );
  const incrChild = () => {
    setChildNumber(childNumber + 1);
    dispatch(updateOrder({ key: "childNumber", value: childNumber + 1 }));
  };
  const decrChild = () => {
    if (childNumber > 0) {
      setChildNumber(childNumber - 1);
      dispatch(updateOrder({ key: "childNumber", value: childNumber - 1 }));
    }
  };



  const handleRoomType = (type) => {
    setRoomType(type);
    dispatch(updateOrder({ key: "RoomType", value: type }));
  };

  const myRef = useRef(null);

  const executeScroll = () => myRef.current.scrollIntoView();

  const [amenitesInfo,setAmenitiesInfo] = useState();
  const [openModal, setOpenModal] = useState(false);

  const showAmenitiesInfo = (data)=>{
    setOpenModal(true);
    setAmenitiesInfo(data);
  } 

  useEffect(() => {
    const unsubscribe = authentication.onAuthStateChanged(async (currentUser) => {
        if (currentUser) {
          setUser(currentUser);
        } else {
          setUser(null);
        }
      });
  
      return () => unsubscribe();
    
  }, []);

  let navigate = useNavigate(); 
  
  const [user,setUser] = useState(null)
  const navigateToBook = () =>{
    if(user){
      navigate('/booking',{state:{propertyDetails:property,stateCurrOrders:currOrder}})
    }else{
      alert("You must be logged in")
    }

  };
  //    Amenities Logic

  if (!property || !property.cards) {
    return <div></div>;
  }
  return (
    <div>
      <NavbarC />
      <div className="relative overflow-hidden md:h-full h-64">
        <img src={headingImage} className="object-cover  h-full  w-full" />
        <div className="absolute inset-0    grid content-center text-center backdrop-brightness-50  ">
          <h1 className="text-white md:text-6xl text-2xl font-medium">
            {property.title}
          </h1>
          <h1 className="text-white md:text-4xl text-lg">
            {property.location}
          </h1>
        </div>
      </div>

      <h1 className="md:text-4xl text-xl text-center font-medium mt-10 mb-14 underline decoration-[#F79489] underline-offset-8 decoration-4">
        About the <span className="text-[#179FEB] font-bold">Space</span>
      </h1>

      <div className="w-100 md:h-full h-96 even:bg-[#FABEB7] odd:bg-[#D1EDF5]  md:mt-20 mt-10  relative">
        <img src={aboutspace} className="object-  h-full  w-full" />

        <div className="absolute -bottom-32  w-4/5 md:h-56 mx-auto left-0 right-0 ml-auto mr-auto px-10 py-8 border-8 rounded border-[#B4E2EF] grid content-center text-center bg-white  ">
          <h1 className="text-black md:text-xl text-sm ">
            {property.location_description}
          </h1>
        </div>
      </div>

      <h1 className="md:text-4xl text-xl text-center mt-44 font-medium my-10 ">
        Get a{" "}
        <span className="text-[#179FEB] font-bold">
          Sense of the Atmosphere
        </span>{" "}
        of your next Vacation Destination
      </h1>

      <div className="md:mx-20 mx-10">
        <div className="video-responsive ">
          <iframe
            width="100%"
            height="480px"
            src={`https://www.youtube.com/embed/c6fY_E3hEZo`}
            // {property.video should be in this format ^}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Embedded youtube"
          />
        </div>
      </div>
      <div ref={myRef}></div>
      {/* Search Components */}
      <div>
      <div className="sticky top-5 z-20">
        <div className="container md:block hidden  pt-16 mx-auto ">
          <div className="flex flex-wrap border-2 mx-28  border-slate-300/50 custom-shadow content-center divide-x	  rounded-lg">
            <div class="lg:w-2/6 dropdown bg-white px-5  py-2 ...">
              <div>
                <h1 className="text-xl font-medium">{property.title}</h1>
                <p>
                  <i className="fa  fa-map-marker text-[#6ACDE9] mr-2"></i>
                  {property.location}
                </p>
              </div>
            </div>
            <div class="lg:w-1/6 h-full text-lg py-2 bg-white ...">
              <h1 className="pl-3 z-10 font-medium">Check In</h1>
              <Datepicker
                value={checkInDate}
                onSelectedDateChanged={handleCheckIn}
                className=" custom-date"
              />
            </div>
            <div class="lg:w-1/6 text-lg py-2 bg-white ...">
              <h1 className="pl-3 z-10 font-medium">Check Out</h1>
              <Datepicker
                value={checkOutDate}
                onSelectedDateChanged={handleCheckOut}
                className=" custom-date "
              />
            </div>
            <div class="lg:w-1/6 dropdown px-3 py-2 bg-white ...">
              <Dropdown
                arrowIcon={true}
                dismissOnClick={false}
                className="px-5 py-4 z-50"
                inline
                label={
                  <div className="text-start  w-full">
                    <div className="text-xl font-medium">Guests</div>
                    <div className="text-[#F79489]">
                      {adultNumber} Adult, {childNumber} Child
                    </div>
                  </div>
                }
              >
                <div className="flex w-100 mb-2 justify-between">
                  <div>
                    <h1 className="font-bold text-base w-3/5">Adults</h1>
                    <p className="text-gray-400">Age 8+</p>
                  </div>
                  <div className="w-2/5 justify-between  flex items-center">
                    <button
                      className="border mr-2 rounded-full border-2"
                      onClick={decrAdult}
                    >
                      -
                    </button>{" "}
                    {adultNumber}
                    <button
                      className="ml-2 border rounded-full border-2"
                      onClick={incrAdult}
                    >
                      +
                    </button>
                  </div>
                </div>
                <Dropdown.Divider />
                <div className="flex w-100 my-2 justify-between">
                  <div>
                    <h1 className="font-bold text-base w-3/5">Child</h1>
                    <p className="text-gray-400">Age 0 - 8</p>
                  </div>
                  <div className="w-2/5 justify-between  flex items-center">
                    <button
                      onClick={decrChild}
                      className="border mr-2 rounded-full border-2"
                    >
                      -
                    </button>{" "}
                    {childNumber}
                    <button
                      onClick={incrChild}
                      className="ml-2 border rounded-full border-2"
                    >
                      +
                    </button>
                  </div>
                </div>
                <Dropdown.Divider />
                <div>
                  <h1 className="text-green-500 font-bold w-64">
                    Charges are not applicable for children below 8
                  </h1>
                </div>
              </Dropdown>
            </div>
            <div class="lg:w-1/6 bg-white ...">
              <button
                onClick={executeScroll}
                className="w-full align-center bg-[#F79489] h-full text-xl font-bold rounded-lg text-white py-2 px-3"
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="">
        <div className="container md:hidden  pt-5 mx-auto ">
          <div className="flex flex-wrap border-2 mx-5  border-slate-300/50 custom-shadow-mobile content-center divide-x	  rounded-lg">
            <div className="w-3/5 dropdown  bg-white  py-2  px-4 ...">
              <h1 className="text-lg font-medium">{property.title}</h1>
              <p className="text-sm">
                <i className="fa  fa-map-marker text-[#6ACDE9] mr-2"></i>
                {property.location}
              </p>
            </div>
            <div className="w-2/5 dropdown pl-1 bg-white py-2 pr-1 ...">
              <Dropdown
                arrowIcon={true}
                dismissOnClick={false}
                className="px-5 py-4"
                inline
                label={
                  <div className='text-start  w-full'><div className='text-[17px] font-medium'>Guests</div>
                <div className='text-[#F79489] text-[13px]'>{adultNumber} Adult, {childNumber} Child</div></div>
                }
              >
                <div className='flex w-100 mb-2 justify-between items-center'>
                        <div><h1 className='font-bold text-base w-3/5'>Adults</h1><p className='text-gray-400'>Age 8+</p></div>
                        <div className='w-2/5 justify-between  flex '><button className='border mr-2 rounded-full border-2' onClick={decrAdult}>-</button> {adultNumber}<button className='ml-2 border rounded-full' onClick={incrAdult}>+</button></div>
                    </div>
                    <Dropdown.Divider />
                    <div className='flex w-100 my-2 justify-between  items-center'>
                            <div><h1 className='font-bold text-base w-3/5'>Child</h1><p className='text-gray-400'>Age 0 - 8</p></div>
                            <div className='w-2/5 justify-between  flex'><button onClick={decrChild} className='border mr-2 rounded-full'>-</button> {childNumber}<button onClick={incrChild} className='ml-2 border rounded-full'>+</button></div>
                    </div>
                    <Dropdown.Divider />
                    <div><h1 className='text-green-500 font-bold w-64'>Charges are not applicable for children below 8</h1></div>
                
                
              </Dropdown>
            </div>
          </div>
          <div className="flex flex-wrap border-2 mx-5 mt-2 border-slate-300/50 custom-shadow-mobile content-center divide-x	  rounded-lg">
          <div className="w-2/5 dropdown    py-2 ...">
                <h1 className='pl-3  z-10 font-medium'>Check In</h1>
                <Datepicker value={checkInDate} minDate={new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()+2)} onSelectedDateChanged={handleCheckIn} className='p-0  custom-date'/>
            </div>
            <div className="w-2/5 dropdown pl-0  py-2 ...">
            <h1 className='pl-3 z-10 font-medium'>Check Out</h1>
                <Datepicker value={checkOutDate} minDate={new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()+3)} onSelectedDateChanged={handleCheckOut} className='p-0  custom-date mobile-date'/>
            </div>
            <div className="w-1/5 dropdown    ...">
              <button
                onClick={executeScroll}
                className="w-full align-center bg-[#F79489] h-full text-xl font-bold rounded-lg text-white "
              >
                <i class="fa fa-edit" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* <Search/>
            <SearchMobile /> */}

      <h1 className="md:text-4xl text-xl text-center font-medium my-10 underline decoration-[#F79489] underline-offset-8 decoration-4">
        Accomodations in{" "}
        <span className="text-[#179FEB] font-bold">Aarya Stays</span>
      </h1>

      {/* property card */}

      <div className="  md:mx-20 mx-5 ">
        <div class="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:p-5 ">
          <div className="img-border p-5 md:w-1/3 md:h-80   ">
            <img
              class="object-cover w-full  rounded-lg h-auto md:h-full md:w-full  "
              src={DummyImgSqr}
              alt=""
            />
          </div>

          <div class="flex flex-col justify-between p-5 md:w-2/3 leading-normal">
            <h1 className="font-medium md:text-3xl text-xl">
              {property.title}
            </h1>
            <span className="text-lg text-[#8E8E8E]">
              <i className="fa  fa-map-marker text-[#6ACDE9] text-xl"></i>{" "}
              {property.location}
            </span>
            <p className="md:text-xl text-md">{property.room_description}</p>
            <div className="flex flex-wrap">
              <div class="md:w-1/3 w-1/2 h-full text-lg py-2 ...">
                <h1 className="pl-3 z-10 font-medium">Check In</h1>
                <Datepicker
                  value={checkInDate}
                  onSelectedDateChanged={handleCheckIn}
                  className="  custom-date cursor-pointer"
                />
              </div>

              <div class="md:w-1/3 w-1/2 text-lg py-2 ...">
                <h1 className="pl-3 z-10 font-medium">Check Out</h1>
                <Datepicker
                  value={checkOutDate}
                  onSelectedDateChanged={handleCheckOut}
                  className="  custom-date mobile-date2"
                />
              </div>

              <div class="md:lg:w-1/3 w-1/2 dropdown px-3 py-2 ...">
                <Dropdown
                  arrowIcon={true}
                  className="px-5 py-4"
                  inline
                  label={
                    <div className="text-start  w-full">
                      <div className="text-xl font-medium">Type</div>
                      <div className="text-[#F79489]">{roomType}</div>
                    </div>
                  }
                >
                  {property.roomType.map((item, index) => {
                    return (
                      <Dropdown.Item>
                        <div
                          className=" cursor-pointer"
                          onClick={() => {
                            handleRoomType(item);
                          }}
                        >
                          <h1 className="font-bold text-base ">{item}</h1>
                        </div>
                      </Dropdown.Item>
                    );
                  })}
                  {/* <Dropdown.Item>
                      <div className=' cursor-pointer' onClick={()=>{handleRoomType('Full Property')}}>
                          <h1 className='font-bold text-base '>Full Property</h1>
                      </div>
                      </Dropdown.Item>
                      
                      <Dropdown.Divider />
                      <Dropdown.Item>
                      <div className=' cursor-pointer' onClick={()=>{handleRoomType('Dorm Beds')}}>
                          <h1 className='font-bold text-base '>Dorm Beds</h1>
                      </div>
                      </Dropdown.Item>
                      
                      <Dropdown.Divider />
                      <Dropdown.Item>
                      <div className=' cursor-pointer' onClick={()=>{handleRoomType('Private Rooms')}}>
                          <h1 className='font-bold text-base '>Private Rooms</h1>
                      </div>
                      </Dropdown.Item> */}
                </Dropdown>
              </div>

              <div class="lg:w-1/3 w-1/2 dropdown px-3 py-2 ...">
                <Dropdown
                  arrowIcon={true}
                  dismissOnClick={false}
                  className="px-5 py-4"
                  inline
                  label={
                    <div className="text-start  w-full">
                      <div className="text-xl font-medium">Guests</div>
                      <div className="text-[#F79489]">
                        {adultNumber} Adult, {childNumber} Child
                      </div>
                    </div>
                  }
                >
                  <div className="flex w-100 mb-2 justify-between">
                    <div>
                      <h1 className="font-bold text-base w-3/5">Adults</h1>
                      <p className="text-gray-400">Age 8+</p>
                    </div>
                    <div className="w-2/5 justify-between  flex items-center">
                      <button
                        className="border mr-2 rounded-full border-2"
                        onClick={decrAdult}
                      >
                        -
                      </button>{" "}
                      {adultNumber}
                      <button
                        className="ml-2 border rounded-full border-2"
                        onClick={incrAdult}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <Dropdown.Divider />
                  <div className="flex w-100 my-2 justify-between">
                    <div>
                      <h1 className="font-bold text-base w-3/5">Child</h1>
                      <p className="text-gray-400">Age 0 - 8</p>
                    </div>
                    <div className="w-2/5 justify-between  flex items-center">
                      <button
                        onClick={decrChild}
                        className="border mr-2 rounded-full border-2"
                      >
                        -
                      </button>{" "}
                      {childNumber}
                      <button
                        onClick={incrChild}
                        className="ml-2 border rounded-full border-2"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <Dropdown.Divider />
                  <div>
                    <h1 className="text-green-500 font-bold w-64">
                      Charges are not applicable for children below 8
                    </h1>
                  </div>
                </Dropdown>
              </div>

              <div className="lg:w-1/2 w-full px-3 py-2">
                <div className="flex  items-center h-full">
                  <h1 className="font-medium md:text-xl">
                    Total before Taxes{" "}
                  </h1>
                  <span className="py-1 px-2 ml-2 border-2 rounded-lg border-green-500 text-green-500 font-medium">
                    Rs {price}/-
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* property card ends */}

      <h1 className="md:text-4xl text-xl text-center font-medium my-10 underline decoration-[#F79489] underline-offset-8 decoration-4">
        Amenities
      </h1>
      <div className="w-100  md:mx-20  md:p-10 mx-8 pb-10 grid justify-items-start  md:border-2 md:border-slate-200 md:rounded-lg">
        <h1 className="md:text-2xl text-xl font-medium">Essentials</h1>
        {/* <div className="flex h-full flex-wrap mt-4"> */}
        <div className='flex h-full flex-wrap gap-y-8 md:gap-x-14 gap-x-4 my-6'>

{essentialAmenities?.map((item,index)=>{
                    return(
                        <div onClick={()=>{showAmenitiesInfo(item)}} className='md:h-[8rem] md:w-[8rem] cursor-pointer h-[4rem] w-[4rem] mt-2'>
                            <div className='flex-1 h-full custom-shadow rounded grid  justify-items-center place-content-center'>
                                <img src={item.icon.url} className='w-2/3 md:w-full text-center'/>
                            </div>
                            
                            <h1 className='text-center mt-2 md:text-md text-xs'>{item.title}</h1>
                        </div>
                    )
                })}
        </div>

        <h1 className="md:text-2xl text-xl font-medium mt-10">On Demand Service</h1>
        <h1 className="md:text-lg text-sm text-green-600">Click on services to add them</h1>
        <div className="flex flex-wrap gap-10  mt-4">
          {extraAmenities?.map((item, index) => {
            return (
              <div
                className="md:h-[8rem] md:w-[8rem] cursor-pointer  h-[4rem] w-[4rem] mt-2"
                onClick={() => {
                  addOnDemand(item);
                }}
              >
                <div className="flex-1 h-full custom-shadow2  rounded grid  justify-items-center place-content-center">
                  <img
                    src={item.icon.url}
                    className="w-2/3 md:w-full text-center"
                  />
                </div>
                <h1 className="text-center mt-2 md:text-md text-xs">{item.title}</h1>
              </div>
            );
          })}
        </div>
      </div>

      {showOnDemand && (
        <div className="flex flex-wrap  md:mx-20 mx-4 mt-5">
          <div className=" md:w-2/3 md:pr-2 ">
            <div className="border-2 border-slate-200 rounded-lg divide-y">
              {[...addedOnDemand].map((item, index) => {
                // const [a,seta] = useState(1)
                return (
                  <div className="flex md:flex-row flex-col items-center md:justify-start  py-4">
                    <AddOn item={item} />
                    <div className="px-2 md:w-3/4">
                      <h1>{item.description}</h1>
                      <div className="flex justify-between mt-2">
                        <div>
                          <h1 className="text-[#268F43]">
                            @ RS {item.price}/ Hour
                          </h1>
                        </div>
                        <div
                          onClick={() => {
                            removeAddedItem(item);
                          }}
                        >
                          <img src={Bin}></img>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="md:w-1/3 ">
            <div class="border-2 border-slate-200 rounded-lg grid grid-cols-1 divide-y">
              <div>
                <h1 className="md:text-3xl text-xl text-[#949494] font-medium py-2 px-6">
                  Price details
                </h1>
              </div>
              <div className="flex justify-between py-2 px-6">
                <div>
                  <h1 className="font-medium md:text-xl text-lg">
                    Total Service Charges
                  </h1>
                  <h1 className="text-lg">
                    ({currOrder.amenities.length} Items)
                  </h1>
                </div>
                <div>
                  <h1 className="text-xl text-[#268F43] font-medium">
                    Rs {amenitiesPrice}
                  </h1>
                </div>
              </div>
              <div className="py-2 px-6">
                <h1 className="md:text-3xl text-xl text-[#949494] font-medium">
                  Why customized amenities?
                </h1>
                <p className="md:text-lg mt-2">
                  Aarya Stays gives flexibility to their guest to pay according
                  to the needs, we are transperant on pricing & the most
                  affordable brand for Homestays.
                </p>
                <button onClick={()=>{navigateToBook()}} className="bg-[#F79489] w-full md:text-2xl text-xl py-1 rounded font-medium text-white my-4">
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div id="amenites" className="md:mx-20 mx-4 w-100 mt-10 text-center">
        {/* <Link to="/booking" state={{property}}> */}
          <button onClick={()=>{navigateToBook()}} className=" bg-[#F79489] md:w-1/2 w-full md:text-3xl text-xl md:py-4 py-2 rounded font-medium text-white">
            Book Now
          </button>
        {/* </Link> */}
      </div>

      {/* <div className="w-100 md:mx-20 mx-10 rounded-lg overflow-auto">
        <Slide slides={property.slides} />
      </div> */}
      {/* <h1 className="lg:text-4xl md:tex-3xl text-xl text-center font-medium my-10 underline decoration-[#F79489] underline-offset-8 decoration-4">
        Everything You Need To Know{" "}
        <span className="text-[#179FEB]">Before You Book</span>
      </h1>  */}

      <div className='flex items-center justify-center my-8 '>
            <div className='bg-[#F79489] md:w-52 w-40 h-1'> </div>
            <div className='px-3 text-center lg:text-4xl md:tex-3xl text-xl font-medium'>Everything You Need To Know <span className='text-[#179FEB]'>Before You Book</span></div>
            <div className='bg-[#F79489] md:w-52 w-40 h-1'> </div>
        </div>

      <div className="md:mx-20 mx-4">
          
          <IndividualCard2 cards={property.cards}/>
          
      </div>


      </div>

      

      <Modal dismissible show={openModal} className="center"   onClose={() => setOpenModal(false)}>
        <Modal.Header >
          <div className="flex w-full gap-x-3 items-center justify-center">
          <img src={amenitesInfo?.icon.url} className='  text-center'/>
          {amenitesInfo?.title}
          </div></Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              {amenitesInfo?.description}
            </p>
            
          </div>
        </Modal.Body>
        {/* <Modal.Footer>
          <Button onClick={() => setOpenModal(false)}>I accept</Button>
          
        </Modal.Footer> */}
      </Modal>
      <Reviews />
      <Query />
      <About />
      <FooterC />
      <button onClick={executeScroll} id="fixedbutton" className="md:hidden bg-[#F79489] text-white font-medium border-2 rounded-full p-4"> Edit</button>
    </div>
  );
}
