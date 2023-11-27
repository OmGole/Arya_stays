import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import { Datepicker } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Modal } from "flowbite-react";
import { useDispatch } from "react-redux";
import { createEvent, editEvent } from "../Store/eventSlice";
import api from "../api/api";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import "./App.css";

const locales = {
  "en-IN": require("date-fns/locale/en-IN"),
};
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});


function DashBoardCalender( { property } ) {

  const dispatch = useDispatch();
  const [price, setPrice] = useState();
  const [allEvents, setAllEvents] = useState([]);
  const [checkInDate, setCheckInDate] = useState();
  const [checkOutDate, setCheckOutDate] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [modalData, setModalData] = useState();

  function handleAddEvent() {
    if (!price || !checkInDate || !checkOutDate) {
      alert("Please fill the details");
      return;
    }

    const correctedStart = new Date(checkInDate);
    correctedStart.setSeconds(correctedStart.getSeconds() + 1);

    const correctedEnd = new Date(checkOutDate);
    correctedEnd.setDate(correctedEnd.getDate() + 1);
    correctedEnd.setSeconds(correctedEnd.getSeconds() - 1);

    console.log(correctedEnd);
    const newEvent = {
      propertyId:property._id,
      title: Number(price),
      start: correctedStart,
      end: correctedEnd,
    };
    
    for (let i = 0; i < allEvents.length; i++) {
      const d1 = new Date(allEvents[i].start);
      const d2 = new Date(newEvent.start);
      const d3 = new Date(allEvents[i].end);
      const d4 = new Date(newEvent.end);
      if ((d1 <= d2 && d2 <= d3) || (d1 <= d4 && d4 <= d3)) {
        alert("CLASH");
        return;
      }
    }    
    
    dispatch(createEvent(newEvent));
    getEvents()
    setPrice("");
    setCheckInDate("");
    setCheckOutDate("");
  }

  function handleEditEvent(e) {
    e.preventDefault();
    const newEvent = {};
    console.log(modalData);
    if (price) newEvent.title = Number(price);

    if (checkInDate) newEvent.start = checkInDate;
    else newEvent.start = modalData.start;

    if (checkOutDate) newEvent.end = checkOutDate;
    else newEvent.end = modalData.end;

    for (let i = 0; i < allEvents.length; i++) {
      if(allEvents[i]._id == modalData._id) continue;
      const d1 = new Date(allEvents[i].start);
      const d2 = new Date(newEvent.start);
      const d3 = new Date(allEvents[i].end);
      const d4 = new Date(newEvent.end);
      if ((d1 <= d2 && d2 <= d3) || (d1 <= d4 && d4 <= d3)) {
        alert("CLASH");
        return;
      }
    }

    const updatedEvent = {id:modalData._id, newEvent};

    dispatch(editEvent(updatedEvent));
    setOpenModal(false);
    // getEvents();
  }

  const getEvents = async (e) => {
    const events = await Promise.all(
      property.events.map(async (id) => {
        const result = await api.get(`/api/v1/event/${id}`);
        return result.data;
      })
    );
    setAllEvents(events);
  }



  const handleCheckIn = (date) => {
    console.log(date);
    setCheckInDate(date);
  };

  const handleDeleteEvent = (e) => {
    e.preventDefault();

    setOpenModal(false);
  }

  const handleCheckOut = (date) => {
    console.log(date);
    setCheckOutDate(date);
  };

  const handleSelect = (e) => {
    setModalData(e);
    setOpenModal(true);
  };

  useEffect(() => {
    setPrice();
    setCheckInDate();
    setCheckOutDate();
  }, [openModal, allEvents]);

  useEffect(() => {
    if(property) {
      console.log(property);
      getEvents();
    }
  }, [property]);

  return (
    <div className="mt-10">
      <div className="font-semibold text-2xl">
        <h1>Calendar:</h1>
      </div>
      <div className="mt-6">
        <h2 className="text-xl">Add New Event</h2>
      </div>
      <div>
        <input
          type="number"
          placeholder="Price"
          className="w-full rounded-xl"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <div className="flex">
          <div class="basis-1/2 items-center text-lg py-2 ...">
            <h1 className="pl-3 z-10 font-medium">Check In</h1>
            <Datepicker
              value={checkInDate}
              onSelectedDateChanged={handleCheckIn}
              className="p-0  custom-date"
            />
          </div>
          <div class="basis-1/2 text-lg py-2 ...">
            <h1 className="pl-3 z-10 font-medium">Check Out</h1>
            <Datepicker
              value={checkOutDate}
              onSelectedDateChanged={handleCheckOut}
              className="p-0  custom-date"
            />
          </div>
        </div>
        <button
          className="block w-full bg-black text-white py-1 px-5 rounded-xl hover:bg-white hover:text-black border-2 border-black transition duration-200 box-border text-l mb-5 font-poppins"
          onClick={handleAddEvent}
        >
          Add
        </button>
      </div>
      <Calendar
        localizer={localizer}
        events={allEvents}
        startAccessor="start"
        endAccessor="end"
        onSelectEvent={(e) => handleSelect(e)}
        style={{ height: 600, margin: "40px" }}
      />
      <Modal
        dismissible
        show={openModal}
        onClose={() => setOpenModal(false)}
        popup
      >
        <Modal.Header></Modal.Header>
        <Modal.Body>
          <div className="w-full h-[34rem]">
            <form action="">
              <div>
                <input
                  type="number"
                  placeholder="Price"
                  className="w-full rounded-xl mt-5"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
                <div className="flex">
                  <div class="basis-1/2 items-center text-lg py-2 ...">
                    <h1 className="pl-3 z-10 font-medium">Check In</h1>
                    <Datepicker
                      value={checkInDate}
                      onSelectedDateChanged={handleCheckIn}
                      className="p-0 custom-date"
                    />
                  </div>
                  <div class="basis-1/2 text-lg py-2 ...">
                    <h1 className="pl-3 z-10 font-medium">Check Out</h1>
                    <Datepicker
                      value={checkOutDate}
                      onSelectedDateChanged={handleCheckOut}
                      className="p-0 custom-date"
                    />
                  </div>
                </div>
                <button
                  className="block w-full bg-black text-white py-1 px-5 rounded-xl hover:bg-white hover:text-black border-2 border-black transition duration-200 box-border text-l mb-5 font-poppins"
                  onClick={handleEditEvent}
                >
                  Edit
                </button>
                <button
                  className="block w-full bg-red-600 text-white py-1 px-5 rounded-xl hover:bg-white hover:text-red-600 border-2 border-red-600 transition duration-200 box-border text-l mb-5 font-poppins"
                  onClick={handleDeleteEvent}
                >
                  Delete
                </button>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default DashBoardCalender;
