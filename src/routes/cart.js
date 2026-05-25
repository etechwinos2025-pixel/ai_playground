const express = require('express');
const router = express.Router();
const cartModel = require('../models/cart');

router.get('/', (req, res) => {
  try {
    const cart = cartModel.getCart();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/items', (req, res) => {
  try {
    const { productId, quantity } = req.body;
    if (!productId || !quantity) {
      return res.status(400).json({ error: 'Missing required fields: productId, quantity' });
    }
    const cart = cartModel.addItem(productId, quantity);
    res.status(201).json(cart);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put('/items/:itemId', (req, res) => {
  try {
    const { quantity } = req.body;
    if (quantity === undefined) {
      return res.status(400).json({ error: 'Missing required field: quantity' });
    }
    const cart = cartModel.updateItem(req.params.itemId, quantity);
    res.json(cart);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/items/:itemId', (req, res) => {
  try {
    const cart = cartModel.removeItem(req.params.itemId);
    res.json(cart);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/', (req, res) => {
  try {
    const cart = cartModel.clearCart();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
