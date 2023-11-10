const Property = require('../models/Property');
const cloudinary = require('../utils/cloudinary');

const getAllPropertys = async (req,res) => {
  // const {name, sort, numericFilters, category} = req.query;
  const queryOptions = {};
  // if(category) {
  //   queryOptions.category = category;
  // }
  // if(name) {
  //   queryOptions.name = { $regex:name, $options:'i'};
  // }
  // if(numericFilters) {
  //   const operatorMap = {
  //     '>':'$gt',
  //     '>=':'$gte',
  //     '=':'$eq',
  //     '<':'$lt',
  //     '<=':'$lte'
  //   }
  //   const regEx = /\b(<|>|>=|=|<|<=)\b/g
  //   let filters = numericFilters.replace(regEx,(match) => `-${operatorMap[match]}-`);
  //   console.log(filters);
  //   filters = filters.split(',').forEach(item => {
  //     console.log(item);
  //     const [field,operator,value] = item.split('-');     
  //     if(field === 'price') {
  //       queryOptions.price = { ...queryOptions.price,[operator] :Number(value) };
  //     }
  //   });
  // }
  let result = Property.find(queryOptions);
  // if(sort) {
  //   const sortPrice = sort.split(',').find(el => el === 'price' || el ==='-price');
  //   result = result.sort(sortPrice);
  // } else {
  //   result = result.sort('price');
  // }
  const propertys = await result;
  res.status(200).json(propertys);
}

const createProperty = async (req,res) => {
  try {
  // req.body.createdBy = req.user.userId; 
  const {title,location,review,location_description,room_description,surrounding_description,card_description,price,amenities,roomType,surrounding_images,currentLocation_images,ats_image} = req.body;

  if(!title || !location || !price || !review || !location_description || !room_description || !surrounding_description || !card_description || !amenities || !roomType || !surrounding_images || !currentLocation_images || !ats_image) {
    console.log(req.body);
    return res.status(401).send("Please fill the missing fields");
  }

  const new_surrounding_images = await Promise.all(surrounding_images.map(async img => {
    try {
      const result = await cloudinary.uploader.upload(img, {
        folder:"propertys"
      });
      return {public_id:result.public_id,url:result.secure_url};
    } catch(error) {
      console.log(error);
    }
  }));  

  const new_currentLocation_images = await Promise.all(currentLocation_images.map(async img => {
    const result = await cloudinary.uploader.upload(img, {
    folder:"propertys"
    });
    return {public_id:result.public_id,url:result.secure_url};
  }));  

  const new_ats_images = await Promise.all(ats_image.map(async img => {
    const result = await cloudinary.uploader.upload(img, {
    folder:"propertys"
    });
    return {public_id:result.public_id,url:result.secure_url};
  })); 

  req.body.surrounding_images = new_surrounding_images;
  req.body.currentLocation_images = new_currentLocation_images;
  req.body.ats_image = new_ats_images;

  const property = await Property.create({...req.body});
  return res.status(201).json(property);
  } catch (error) {
    console.log(error);
  }
  
}

const getSingleProperty = async (req,res) => {
  const {id:propertyID} = req.params;
  const property = await Property.findOne({_id:propertyID});
  if(!property) {
    return res.status(404).json({msg:`No property with id: ${propertyID}`});
  }
  res.status(201).json(property);
}

const updateProperty = async (req,res) => {
  try {
    const {id:propertyID} = req.params;
    const currentProperty = await Property.findById({_id:propertyID});
  if(req.body.image && req.body.image !== '') {
    const type = req.body.type;
    const imgs = currentProperty[type];
    // const imgs =  type === "currentLocation_images" ? currentProperty.currentLocation_images : currentProperty.surrounding_images;
    const imgId = imgs.find(img => img.public_id == propertyID);
    const imgIndex = imgs.findIndex(img => img.public_id == propertyID);
    console.log(imgId);
    await cloudinary.uploader.destroy(imgId);

    const upload = await cloudinary.uploader.upload(req.body.image, {
      folder:"propertys"
    });

    const newImage = {
      public_id : upload.public_id,
      url: upload.secure_url
    }

    req.body[type] = currentProperty[type].splice(imgIndex,0,newImage);
    delete req.body.type;
  }
  const property = await property.findOneAndUpdate({_id:propertyID},req.body,{
    new:true,
    // runValidators:true,
  });

  if(!property) {
    return res.status(404).json({msg:`No task with id : ${propertyID}`});
  }

  return res.status(200).json(property);
  } catch(error) {
    console.log(error);
  }
}

const deleteProperty = async (req,res) => {
  const {id:propertyID} = req.params;
  const property = await Property.findById({_id:propertyID});
  if(!property) {
    return res.status(404).json({msg:`No task with id: ${propertyID}`});
  }

  const {surrounding_images,currentLocation_images,ats_image} = property;
  
  surrounding_images.forEach(async img => {
    await cloudinary.uploader.destroy(img.public_id);
  });  

  currentLocation_images.map(async img => {
    await cloudinary.uploader.destroy(img.public_id);
  });
  
  ats_image.map(async img => {
    await cloudinary.uploader.destroy(img.public_id);
  });

  await Property.findByIdAndDelete({_id:propertyID});
  return res.status(200).json(property);  
}

module.exports = {
  getAllPropertys,
  getSingleProperty,
  updateProperty,
  deleteProperty,
  createProperty
}

