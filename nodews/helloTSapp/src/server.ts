import Fastify from "fastify";

const fastify = Fastify({ logger: true });

let stocks = [
  { id: 1, name: "AAPL", price: 150 },
  { id: 2, name: "GOOGL", price: 2800 },
  { id: 3, name: "AMZN", price: 3400 },
  { id: 4, name: "MSFT", price: 300 },
  { id: 5, name: "TSLA", price: 700 },
  { id: 6, name: "NVDA", price: 350 },
];

fastify.get("/stocks", async (request, reply) => {
  return { success: true, data: stocks };
});

fastify.get("/stocks/:id", async (request, reply) => {
  const { id } = request.params as { id: string };
  const stock = stocks.find((s) => s.id === parseInt(id));
  if (!stock) {
    return reply
      .status(404)
      .send({ success: false, message: "Stock not found" });
  }
  return { success: true, data: stock };
});

fastify.post("/stocks", async (request, reply) => {
  const { name, price } = request.body as { name: string; price: number };

  const newStock = { id: stocks.length + 1, name, price };
  stocks.push(newStock);
  reply.code(201);
  return { success: true, data: newStock };
});

fastify.put("/stocks/:id", async (request, reply) => {
  const { id } = request.params as { id: string };
  const { name, price } = request.body as { name: string; price: number };

  const stockIndex = stocks.findIndex((s) => s.id === parseInt(id));
  if (stockIndex === -1) {
    return reply
      .status(404)
      .send({ success: false, message: "Stock not found" });
  }

  const currentStock = stocks[stockIndex];
  if (!currentStock) {
    return reply
      .status(404)
      .send({ success: false, message: "Stock not found" });
  }

  stocks[stockIndex] = {
    id: parseInt(id),
    name: name || currentStock.name,
    price: price || currentStock.price,
  };

  return { success: true, data: stocks[stockIndex] };
});

fastify.delete("/stocks/:id", async (request, reply) => {
  const { id } = request.params as { id: string };
  const stockIndex = stocks.findIndex((s) => s.id === parseInt(id));

  if (stockIndex === -1) {
    return reply
      .status(404)
      .send({ success: false, message: "Stock not found" });
  }

  const dstock = stocks.splice(stockIndex, 1);
  return { success: true, data: dstock[0] };
});

// Start the server
const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
    console.log("Server listening on port 3000");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start();
console.log("Server is running on http://localhost:3000");
