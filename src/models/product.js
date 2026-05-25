const { v4: uuidv4 } = require('uuid');

let products = [
  {
    id: uuidv4(),
    name: 'Laptop',
    description: 'High performance laptop',
    price: 999.99,
    stock: 10
  },
  {
    id: uuidv4(),
    name: 'Mouse',
    description: 'Wireless mouse',
    price: 29.99,
    stock: 50
  },
  {
    id: uuidv4(),
    name: 'Keyboard',
    description: 'Mechanical keyboard',
    price: 79.99,
    stock: 25
  },
  {
    id: uuidv4(),
    name: 'Monitor',
    description: '27 inch 4K monitor',
    price: 399.99,
    stock: 15
  }
];

const getAll = () => products;

const getById = (id) => products.find(p => p.id === id);

const create = (data) => {
  const product = {
    id: uuidv4(),
    ...data
  };
  products.push(product);
  return product;
};

const update = (id, data) => {
  const index = products.findIndex(p => p.id === id);
  if (index === -1) return null;
  products[index] = { ...products[index], ...data };
  return products[index];
};

const remove = (id) => {
  const index = products.findIndex(p => p.id === id);
  if (index === -1) return false;
  products.splice(index, 1);
  return true;
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove
};
