const mongoose = require('mongoose');


const PropertySchema = new mongoose.Schema({
  title: {
    type:String,
    required:[true,'Please provide title']
  },
  location:{
    type:String,
    required:[true,`Please provide location`],
  },
  reviews:[{
    type:mongoose.Types.ObjectId,
    ref:'Review',
    required:true,
    _id:false
  }],
  maxGuests:{
    type:Number,
    required:[true,'Please  provide max allowed people'],
  },
  location_description:{
    type:String,
    required:[true,'Please provide l description'],
    maxlength:1000
  },
  room_description:{
    type:String,
    required:[true,'Please provide r description'],
    maxlength:1000
  },
  surrounding_description:{
    type:String,
    required:[true,'Please provide s description'],
    maxlength:1000
  },
  cards:[{
    type:mongoose.Types.ObjectId,
    ref:'Card',
    required:true,
    _id:false
  }],
  price:{
    type:Number,
    required:[true,'Please  provide price'],
  },
  amenities:[{
    type:mongoose.Types.ObjectId,
    ref:'Amenity',
    required:true,
    _id:false
  }],
  slides:[{
    type:mongoose.Types.ObjectId,
    ref:'Slides',
    required:true,
    _id:false
  }],
  roomType:[{
    type: String,
    enum : ['full-property','dorm-beds','private-rooms'],
    required:true
  }],
  ats_image:[{
    public_id:{
      type:String,
      required:true
    },
    url:{
      type:String,
      required:true
    },
    _id:false
  }],
  currentLocation_images:[{
    public_id:{
      type:String,
      required:true
    },
    url:{
      type:String,
      required:true
    },
    _id:false
  }],
  video:{
    type:String,
    required:[true,'Please provide r description'],
  }
  // createdBy:{
  //   type:mongoose.Types.ObjectId,
  //   ref:'User',
  //   required:[true,'Please provide user']
  // },
})



module.exports = mongoose.model('Property',PropertySchema);