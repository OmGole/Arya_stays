const Event = require('../models/Event');
const Property = require('../models/Property')


const getAllEvents = async (req,res) => {
  try {
    const events = await Event.find();
    return res.status(200).json(events);  
  } catch (error) {
    console.log(error);
  }
}

const createEvent = async (req,res) => {
  try {
    console.log(req.body);
    const {propertyId, title, start, end} = req.body;
    // const object_Id = new ObjectId(_id);

    if(!propertyId || !title || !start || !end) {
    return res.status(401).send("Please Provide Name, Email and Password");
  }
  
   
  const event = await Event.create({...req.body});

  const currentProperty = await Property.findById({_id:propertyId});
  if(!currentProperty) {
    return res.status(401).send("No property with given id");
  }

  currentProperty.events.push(event);
  await currentProperty.save();

  return res.status(200).json(event);
  } catch (error) {
    console.log(error)
  }
}

const getEvent = async (req,res) => {
  try {
    const {id:eventID} = req.params;
    const event = await Event.findOne({_id:eventID});
    if(!event) {
      return res.status(404).json({msg:`No event with id: ${eventID}`});
    }
    return res.status(201).json(event);  
  } catch (error) {
    console.log(error);
  }  
}

const updateEvent = async (req,res) => {
  try {
    const {id:eventID} = req.params;
    const event = await Event.findById({_id:eventID});

    if(!event) {
      return res.status(404).json({msg:`No event with id: ${eventID}`});
    }

    const updatedEvent = await Event.findOneAndUpdate({_id:eventID}, req.body, {
      new:true,
    });
    
    return res.status(200).json(updatedEvent);  
  } catch (error) {
    console.log(error);
  }  
}

const deleteEvent = async (req,res) => {
  try {
    const {id:eventID} = req.params;
    const event = await Event.findById({_id:eventID});

    if(!event) {
      return res.status(404).json({msg:`No event with id: ${eventID}`});
    }

    await Event.findByIdAndDelete({_id:eventID});
    return res.status(200).json(event);  
    } catch (error) {
    console.log(error);
  }
}

module.exports = {getAllEvents,createEvent,getEvent,updateEvent,deleteEvent};