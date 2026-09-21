import Fastify, { type FastifyRequest, type FastifyReply } from 'fastify';
import {z} from 'zod';



// Initialize Fastify with logging enabled
const server = Fastify({ logger: true });


// Define a simple test route
server.get('/', async (request, reply) => {
  return { status: 'success', message: 'Fastify server is running!' };
});

// Async function to start the server
const start = async () => {
  try {
    // Listen on port 3000 and bind to all network interfaces (0.0.0.0)
    await server.listen({ port: 3000, host: '0.0.0.0' });
    console.log('Server successfully listening on http://localhost:3000');
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

// Execute the start function
start();


//=====================students api===============================

type Student = {
  sno: number;
  name: string;
  grade: string;
  contactno: string;
  major: string;
};

const studentSchema = z.object({
  sno: z.number().int().positive(),
  name: z.string().min(3, 'name should be at least 3 characters').max(12, 'name should be less than 12 characters'),
  grade: z.string().max(4, 'grade should be less than 4 characters').min(1, 'grade should be at least 1 character'),
  contactno: z.string().max(11, 'contact number should be less than 11 characters').min(6, 'contact number should be at least 6 characters'),
  major: z.enum(['Math', 'Science', 'Arts', 'Engineering']).default('Science')
});

const students: Student[] = [
  { sno: 1, name: 'Alice', grade: 'A', contactno: '555-0101', major: 'Science' },
  { sno: 2, name: 'Bob', grade: 'B', contactno: '555-0102', major: 'Engineering' },
  { sno: 3, name: 'Charlie', grade: 'A', contactno: '555-0103', major: 'Arts' },
  { sno: 4, name: 'David', grade: 'C', contactno: '555-0104', major: 'Math' },
  { sno: 5, name: 'Eve', grade: 'B', contactno: '555-0105', major: 'Engineering' }
];

server.get('/students', async (request, reply) => {
  return { students };
});

server.post('/students', async (request, reply) => {
  console.log('Request body:', request.body);
  
  const student = request.body as Student;
  student.sno = students.length + 1; // Automatically assign a new sno based on the current length of the students array


  const validationResult = studentSchema.safeParse(student);
  
  if (!validationResult.success) {
    return reply.status(400).send({ error: validationResult.error.flatten() });
  }

  students.push(student);
  return { message: 'Student added successfully', student };
});


//===================================================================
// authenticate server routes using 

//
//const server = Fastify({ logger: true });

// 1. Define the Authentication Hook
const authenticate = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const authHeader = request.headers.authorization;

    // Check if Authorization header exists and starts with 'Bearer '
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return reply.code(401).send({ 
        statusCode: 401, 
        error: 'Unauthorized', 
        message: 'Missing or malformed Authorization header' 
      });
    }

    // Extract the token part
    const token = authHeader.split(' ')[1];

    // TODO: In production, verify a JWT (using @fastify/jwt) or lookup token in Redis/DB
    const isValidToken = token === 'my-secure-api-token-123';

    if (!isValidToken) {
      return reply.code(401).send({ 
        statusCode: 401, 
        error: 'Unauthorized', 
        message: 'Invalid or expired token' 
      });
    }

    // Optional: Attach decoded user/payload to request object for downstream handlers
    // request.user = { id: 'user_123', role: 'admin' };

  } catch (err) {
    server.log.error(err);
    return reply.code(500).send({ error: 'Internal Server Error during authentication' });
  }
};

// 2. Public Route (No authentication required)
server.get('/public', async (request, reply) => {
  return { message: 'This is a public endpoint accessible to anyone.' };
});

// 3. Protected Route (Attaches the authenticate hook via preHandler)
server.get('/dashboard', { preHandler: [authenticate] }, async (request, reply) => {
  return { 
    message: 'Welcome to the secure dashboard!',
    timestamp: new Date().toISOString()
  };
});

// // Start server
// const start = async () => {
//   try {
//     await server.listen({ port: 3000, host: '0.0.0.0' });
//     console.log('Server running on http://localhost:3000');
//   } catch (err) {
//     server.log.error(err);
//     process.exit(1);
//   }
// };

// start();

