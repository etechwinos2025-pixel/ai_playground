const { v4: uuidv4 } = require('uuid');
const productModel = require('./product');

let cart = {
  id: uuidv4(),
  items: [],
  createdAt: new Date(),
  updatedAt: new Date()
};

const getCart = () => ({
  ...cart,
  total: calculateTotal()
});

const addItem = (productId, quantity) => {
  const product = productModel.getById(productId);
  if (!product) throw new Error('Product not found');
  if (product.stock < quantity) throw new Error('Insufficient stock');

  const existingItem = cart.items.find(item => item.productId === productId);

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.items.push({
      id: uuidv4(),
      productId,
      quantity,
      price: product.price,
      name: product.name
    });
  }

  cart.updatedAt = new Date();
  return getCart();
};

const removeItem = (itemId) => {
  const index = cart.items.findIndex(item => item.id === itemId);
  if (index === -1) throw new Error('Item not found in cart');
  cart.items.splice(index, 1);
  cart.updatedAt = new Date();
  return getCart();
};

const updateItem = (itemId, quantity) => {
  const item = cart.items.find(item => item.id === itemId);
  if (!item) throw new Error('Item not found in cart');
  if (quantity <= 0) throw new Error('Quantity must be greater than 0');
  item.quantity = quantity;
  cart.updatedAt = new Date();
  return getCart();
};

const clearCart = () => {
  cart.items = [];
  cart.updatedAt = new Date();
  return getCart();
};

const calculateTotal = () => {
  return cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2);
};

module.exports = {
  getCart,
  addItem,
  removeItem,
  updateItem,
  clearCart,
  calculateTotal
};
