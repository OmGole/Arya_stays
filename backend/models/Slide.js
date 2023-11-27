const mongoose = require('mongoose');

const SlideSchema = new mongoose.Schema({
  images:[{
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
  description:{
    type:String,
    required:[true,'Please provide description'],
  }
});

SlideSchema.pre('findOneAndDelete', function(next) {
  const slide = this;
  console.log(this._id);
  mongoose.model("Property").updateOne(
      { slides: { $in: [slide._id] } }, 
      { $pull: { slides: slide._id } },  
      { multi: true },
      next);
});



module.exports = mongoose.model('Slide',SlideSchema);