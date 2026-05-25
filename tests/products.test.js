const productModel = require('../src/models/product');

describe('Product Model', () => {
  test('should return all products', () => {
    const products = productModel.getAll();
    expect(Array.isArray(products)).toBe(true);
    expect(products.length).toBeGreaterThan(0);
  });

  test('should get a product by id', () => {
    const products = productModel.getAll();
    const firstProduct = products[0];
    const retrieved = productModel.getById(firstProduct.id);
    expect(retrieved).toEqual(firstProduct);
  });

  test('should return null for non-existent product', () => {
    const product = productModel.getById('non-existent-id');
    expect(product).toBeUndefined();
  });

  test('should create a new product', () => {
    const initialCount = productModel.getAll().length;
    const newProduct = productModel.create({
      name: 'Test Product',
      description: 'Test Description',
      price: 99.99,
      stock: 5
    });
    expect(newProduct.id).toBeDefined();
    expect(newProduct.name).toBe('Test Product');
    expect(productModel.getAll().length).toBe(initialCount + 1);
  });

  test('should update a product', () => {
    const products = productModel.getAll();
    const firstProduct = products[0];
    const updated = productModel.update(firstProduct.id, { price: 199.99 });
    expect(updated.price).toBe(199.99);
  });

  test('should delete a product', () => {
    const initialCount = productModel.getAll().length;
    const products = productModel.getAll();
    const firstProduct = products[0];
    const success = productModel.remove(firstProduct.id);
    expect(success).toBe(true);
    expect(productModel.getAll().length).toBe(initialCount - 1);
  });

  test('should return false when deleting non-existent product', () => {
    const success = productModel.remove('non-existent-id');
    expect(success).toBe(false);
  });
});
