require("dotenv").config();
const stripe = require('stripe')(process.env.STRIPE_KEY);
const express = require('express');
const router = express.Router();
const Book = require("../models/Property");
const Order = require("../models/Order")
const Cart = require("../models/Cart");
const {auth} = require('../middleware/auth');


router.post('/create-checkout-session', auth ,async (req, res) => {
  const customer = await stripe.customers.create({
    metadata:{
      id:req.body.userId,
      cart:JSON.stringify(req.body)
    }
  })

  const line_items = await Promise.all(req.body.products.map(async (product) => {
    const book = await Book.findOne({_id:product.productId});
    return {
      price_data:{
        currency:"INR",
        product_data:{
          name:book.name,
          images:[book.image.url],
          metadata:{
            id:book._id
          }
        },
        unit_amount:product.price*100,
      },
      quantity: product.quantity,
    }
  }))


  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    shipping_address_collection: {allowed_countries: ['IN']},
    shipping_options: [
      {
        shipping_rate_data: {
          type: 'fixed_amount',
          fixed_amount: {amount: 0, currency: 'inr'},
          display_name: 'Free shipping',
          delivery_estimate: {
            minimum: {unit: 'business_day', value: 5},
            maximum: {unit: 'business_day', value: 7},
          },
        },
      },
    ],
    phone_number_collection:{
      enabled:true
    },
    line_items,
    customer:customer.id,
    mode: 'payment',
    success_url: `${process.env.CLIENT_URL}/success`,
    cancel_url: `${process.env.CLIENT_URL}/fail`,
  });

  res.send({url:session.url});
});

const createOrder = async(customer,data) => {
  const cart = JSON.parse(customer.metadata.cart);
  const order = await Order.create({
    userId:customer.metadata.id,
    products:cart.products,
    total:data.amount_total,
    shipping:data.customer_details,
  })
  console.log("order",order)

  const emptyCart = await Cart.findOneAndUpdate({_id:cart._id}, {...cart,products:[]});
  console.log("newCart",emptyCart);
}

const endpointSecret = process.env.ENDPOINT_SECRET;

router.post('/webhook', (req, res) => {
  const sig = req.headers['stripe-signature'];
  let data; 
  let eventType;
  if(endpointSecret) {
    let event;
  try {
    event = stripe.webhooks.constructEvent(req.rawBody, sig, endpointSecret);
  } catch (err) {
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
   }

   data = event.data.object;
   eventType = event.type;
  } else {
    data = req.body.data.object;
    eventType = req.body.type;
  }
  if(eventType === "checkout.session.completed") {
     stripe.customers.retrieve(data.customer).then(customer => {
      createOrder(customer, data);
     }).catch(error => console.log(error));
  }
  
  res.send().end();
});

module.exports = router;
