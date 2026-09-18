import Fastify from 'fastify';

const fastify = Fastify({ logger: true });

// In-memory database mock for products
let products = [
  { id: '1', name: 'Laptop', price: 1200 },
  { id: '2', name: 'Smartphone', price: 800 },
];

// 1. GET: Retrieve all products
fastify.get('/products', async (request, reply) => {
  return { success: true, data: products };
});

// 2. GET by ID: Retrieve a single product
fastify.get('/products/:id', async (request, reply) => {
  const { id } = request.params;
  const product = products.find((p) => p.id === id);

  if (!product) {
    reply.code(404);
    return { success: false, error: 'Product not found' };
  }

  return { success: true, data: product };
});

// 3. POST: Create a new product
fastify.post('/products', async (request, reply) => {
  const { name, price } = request.body || {};
  
  if (!name || !price) {
    reply.code(400);
    return { success: false, error: 'Name and price are required' };
  }

  const newProduct = { id: String(Date.now()), name, price };
  products.push(newProduct);

  reply.code(201);
  return { success: true, data: newProduct };
});

// 4. PUT: Update an existing product
fastify.put('/products/:id', async (request, reply) => {
  const { id } = request.params;
  const { name, price } = request.body || {};
  
  const index = products.findIndex((p) => p.id === id);
  if (index === -1) {
    reply.code(404);
    return { success: false, error: 'Product not found' };
  }

  products[index] = { 
    id, 
    name: name || products[index].name, 
    price: price !== undefined ? price : products[index].price 
  };

  return { success: true, data: products[index] };
});

// 5. DELETE: Remove a product
fastify.delete('/products/:id', async (request, reply) => {
  const { id } = request.params;
  const index = products.findIndex((p) => p.id === id);

  if (index === -1) {
    reply.code(404);
    return { success: false, error: 'Product not found' };
  }

  const deleted = products.splice(index, 1);
  return { success: true, data: deleted[0] };
});

// Start server
const start = async () => {
  try {
    // Listen on port 3000 locally
    await fastify.listen({ port: 3000, host: '0.0.0.0' });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();



