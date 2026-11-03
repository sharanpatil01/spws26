import Fastify from 'fastify'
import fastifyStatic from '@fastify/static'
import path from 'node:path'

const app = Fastify({ logger: true })
const publicDir = path.join(process.cwd(), 'public')

await app.register(fastifyStatic, { root: publicDir, index: false })

app.get('/home', async (_request, reply) => reply.sendFile('pages/index.html'))
app.get('/classifieds', async (_request, reply) => reply.sendFile('pages/classifieds.html'))
app.get('/learning', async (_request, reply) => reply.sendFile('pages/learning.html'))
app.get('/wealth', async (_request, reply) => reply.sendFile('pages/wealth.html'))
app.get('/future', async (_request, reply) => reply.sendFile('pages/future.html'))
app.get('/stories', async (_request, reply) => reply.sendFile('pages/stories.html'))
app.get('/chess', async (_request, reply) => reply.sendFile('pages/chess.html'))
app.get('/driving', async (_request, reply) => reply.sendFile('pages/driving.html'))
app.get('/stories/monkey-crocodile', async (_request, reply) => reply.sendFile('pages/story-monkey-crocodile.html'))
app.get('/stories/clever-rabbit', async (_request, reply) => reply.sendFile('pages/story-clever-rabbit.html'))
app.get('/stories/blue-jackal', async (_request, reply) => reply.sendFile('pages/story-blue-jackal.html'))
app.get('/stories/frogs-snake', async (_request, reply) => reply.redirect('/stories/blue-jackal', 301))
app.get('/stories/solar-system', async (_request, reply) => reply.sendFile('pages/story-solar-system.html'))
app.get('/stories/stars', async (_request, reply) => reply.sendFile('pages/story-stars.html'))
app.get('/stories/galaxies', async (_request, reply) => reply.sendFile('pages/story-galaxies.html'))
app.get('/stories/isro-moon', async (_request, reply) => reply.sendFile('pages/story-isro-moon.html'))
app.get('/stories/nasa-mars', async (_request, reply) => reply.sendFile('pages/story-nasa-mars.html'))
app.get('/stories/flight-rockets', async (_request, reply) => reply.sendFile('pages/story-flight-rockets.html'))
app.get('/ideas', async (_request, reply) => reply.sendFile('pages/ideas.html'))
app.get('/about-me', async (_request, reply) => reply.sendFile('pages/about-me.html'))
app.get('/', async (_request, reply) => reply.redirect('/home'))

app.get('/api/status', async () => ({ ok: true }))

const port = Number(process.env.PORT ?? 3000)
try {
  await app.listen({ port, host: '0.0.0.0' })
  console.log(`mysite running at http://localhost:${port}/home`)
} catch (error) {
  app.log.error(error)
  process.exit(1)
}
