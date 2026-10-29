import Fastify from 'fastify'
import fastifyStatic from '@fastify/static'
import path from 'node:path'

const app = Fastify({ logger: true })
const publicDir = path.join(process.cwd(), 'public')

await app.register(fastifyStatic, { root: publicDir, index: false })

app.get('/home', async (_request, reply) => reply.sendFile('index.html'))
app.get('/classifieds', async (_request, reply) => reply.sendFile('classifieds.html'))
app.get('/learning', async (_request, reply) => reply.sendFile('learning.html'))
app.get('/wealth', async (_request, reply) => reply.sendFile('wealth.html'))
app.get('/ideas', async (_request, reply) => reply.sendFile('ideas.html'))
app.get('/about-me', async (_request, reply) => reply.sendFile('about-me.html'))
app.get('/', async (_request, reply) => reply.redirect('/home'))

app.get('/api/status', async () => ({ ok: true }))

const port = Number(process.env.PORT ?? 3000)
try {
  await app.listen({ port, host: '0.0.0.0' })
  console.log(`Craftsite running at http://localhost:${port}/home`)
} catch (error) {
  app.log.error(error)
  process.exit(1)
}
