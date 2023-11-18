const dotenv = require('dotenv')
dotenv.config({path:__dirname+'/.env'});
require('express-async-errors');
const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const rateLimiter = require('express-rate-limit');

const express = require('express');
const app = express();
const fileUpload = require("express-fileupload");
const propertyRoutes = require('./routes/property');
const userRoutes = require('./routes/user');
const orderRoutes = require('./routes/order');
const reviewRoutes = require('./routes/review');
const amenityRoutes = require('./routes/amenity');
const cardRoutes = require('./routes/card');
const slideRoutes = require('./routes/slide');
const imageRoutes = require('./routes/image');
const connectDB = require('./db/connect');
const {auth} = require('./middleware/auth');

const port =5000;
const connectString = process.env.MONGO_URI;
app.use(express.json({limit: '50mb'}));
app.use(fileUpload({useTempFiles: true}));
app.set('trust proxy',1)
app.use(rateLimiter({
  windowMs:15*60*1000,
  max:100,
}));
app.use(helmet());
app.use(cors({
  origin:process.env.CLIENT_URL, 
}));
app.use(xss());

app.use('/uploads', express.static('uploads'));
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/image', imageRoutes); 
app.use('/api/v1/property', propertyRoutes);
app.use('/api/v1/order', orderRoutes); 
app.use('/api/v1/review', reviewRoutes); 
app.use('/api/v1/amenity', amenityRoutes); 
app.use('/api/v1/card', cardRoutes); 
app.use('/api/v1/slide', slideRoutes); 
// app.use('/api/v1/stripe', stripeRoutes);

const startServer = async () => {
  try {
    connectDB(connectString);
    app.listen(port, console.log('Server Listening'));
  } catch (error) {
    console.log(error);
  }
}

startServer();