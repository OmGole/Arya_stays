const mongoose = require('mongoose')

const PropertySchema = new mongoose.Schema({
  title : {
    type:String,
    required:[true,'Please provide title'],
    maxlength:40
  },
  location:{
    type:String,
    required:[true,`Please provide location`],
    maxlength:30
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
  card_description:[{
    title:{
      type:String,
      required:[true,'Please provide title'],
      maxlength:10
    },
    desc:{
      type:String,
      required:[true,'Please provide c description'],
      maxlength:100
    },
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
  roomType:{
    type: String,
    enum : ['full-property','dorm-beds','private-rooms',],
    default: 'full-property'
  },
  surrounding_images:[{
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
  }]
  // createdBy:{
  //   type:mongoose.Types.ObjectId,
  //   ref:'User',
  //   required:[true,'Please provide user']
  // },
})

module.exports = mongoose.model('Property',PropertySchema);