const cartModel = require('../src/models/cart');
const productModel = require('../src/models/product');

describe('Cart Model', () => {
  beforeEach(() => {
    cartModel.clearCart();
  });

  test('should return an empty cart initially', () => {
    const cart = cartModel.getCart();
    expect(cart.items).toHaveLength(0);
    expect(cart.total).toBe('0.00');
  });

  test('should add an item to the cart', () => {
    const products = productModel.getAll();
    const product = products[0];
    const cart = cartModel.addItem(product.id, 2);
    expect(cart.items).toHaveLength(1);
    expect(cart.items[0].quantity).toBe(2);
  });

  test('should increase quantity if item already exists', () => {
    const products = productModel.getAll();
    const product = products[0];
    cartModel.addItem(product.id, 1);
    const cart = cartModel.addItem(product.id, 2);
    expect(cart.items).toHaveLength(1);
    expect(cart.items[0].quantity).toBe(3);
  });

  test('should remove an item from the cart', () => {
    const products = productModel.getAll();
    const product = products[0];
    const cart1 = cartModel.addItem(product.id, 2);
    const itemId = cart1.items[0].id;
    const cart2 = cartModel.removeItem(itemId);
    expect(cart2.items).toHaveLength(0);
  });

  test('should update item quantity', () => {
    const products = productModel.getAll();
    const product = products[0];
    const cart1 = cartModel.addItem(product.id, 2);
    const itemId = cart1.items[0].id;
    const cart2 = cartModel.updateItem(itemId, 5);
    expect(cart2.items[0].quantity).toBe(5);
  });

  test('should calculate total correctly', () => {
    const products = productModel.getAll();
    const product1 = products[0];
    const product2 = products[1];
    cartModel.addItem(product1.id, 1);
    const cart = cartModel.addItem(product2.id, 2);
    const expected = (product1.price + product2.price * 2).toFixed(2);
    expect(cart.total).toBe(expected);
  });

  test('should clear the cart', () => {
    const products = productModel.getAll();
    const product = products[0];
    cartModel.addItem(product.id, 5);
    const cart = cartModel.clearCart();
    expect(cart.items).toHaveLength(0);
  });

  test('should throw error when adding non-existent product', () => {
    expect(() => cartModel.addItem('non-existent-id', 1)).toThrow('Product not found');
  });

  test('should throw error when quantity exceeds stock', () => {
    const products = productModel.getAll();
    const product = products[0];
    expect(() => cartModel.addItem(product.id, product.stock + 10)).toThrow('Insufficient stock');
  });
});
