import Fastify from "fastify";
import { z } from "zod";
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from "fastify-type-provider-zod";

const server = Fastify({ logger: true });

// 1. Set up Zod validation and serialization compilers
server.setValidatorCompiler(validatorCompiler);
server.setSerializerCompiler(serializerCompiler);

// 2. Define your input schema
const createUserSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  age: z.number().optional(),
});

// 3. Define the route with the Zod type provider
server.withTypeProvider<ZodTypeProvider>().post("/users",
  {
    schema: {
      body: createUserSchema,
      response: {
        201: z.object({
          id: z.string().uuid(),
          success: z.boolean(),
        }),
      },
    },
  },
  async (request, reply) => {
    // request.body is fully typed and runtime-validated!
    const { name, email, age } = request.body;

    // TODO: Save to database...

    return reply.code(201).send({
      id: "123e4567-e89b-12d3-a456-426614174000",
      success: true,
    });
  },
);


const port = 3000;

const start = async () => {
  try {
    await server.listen({ port });
    server.log.info(`Server started on port ${port}`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
