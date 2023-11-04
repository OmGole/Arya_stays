const Cart = require("../models/Cart");
const Book = require("../models/Property");

const getCart = async (req,res) => {
  const user = req.user.userId;
  const cart = await Cart.findOne({userId:user});
  if(cart) {
    return res.status(200).json({cart}); 
  } 
  res.status(404).json({msg:`No Cart with userId: ${user}`});
}

const addToCart = async (req,res) => {
  const user = req.user.userId;
  const {productId, quantity} = req.body;
  const cart = await Cart.findOne({userId:user});
  const book = await Book.findOne({_id:productId});
  
  const price = book.price;
  if(!book) {
    return res.status(404).send({message:"item not found"});
  }
  if(cart) {
    const bookIndex = cart.products.findIndex(book => book.productId == productId);

    if(bookIndex > -1) {
      let product = cart.products[bookIndex];
      product.quantity += quantity;

      cart.bill = cart.products.reduce((acc,curr) => {
        return acc + curr.quantity * curr.price;
      },0);

      cart.products[bookIndex] = product;
      await cart.save();
      console.log(cart);
      return res.status(200).send(cart);
    } else {
      
      cart.products.push({ productId,quantity, price})
      cart.bill = cart.products.reduce((acc, curr) => {
        return acc + curr.quantity * curr.price;
      },0)

      await cart.save();
      return res.status(200).send(cart);
    }
  } else {
    const newCart = await Cart.create({
      userId:user,
      products: [{ productId, quantity, price }],
      bill: quantity * price,
    });
    return res.status(201).send(newCart);
  }
}

const deleteCart = async (req, res) => {
  const user = req.user.userId;
  const { productId } = req.params;
  let cart = await Cart.findOne({ userId:user });

    const bookIndex = cart.products.findIndex((book) => book.productId == productId);
    
    if (bookIndex > -1) {
      console.log(bookIndex);
      let book = cart.products[bookIndex];
      cart.bill -= book.quantity * book.price;
      if(cart.bill < 0) {
          cart.bill = 0
      } 
      cart.products.splice(bookIndex, 1);
      cart.bill = cart.products.reduce((acc, curr) => {
        return acc + curr.quantity * curr.price;
    },0)
      cart = await cart.save();

      return res.status(200).send(cart);
    } else {
      return res.status(404).json({msg:`No Book with bookId: ${productId}`});
    }
};

module.exports = {getCart,addToCart,deleteCart};