const { ApolloServer } = require('@apollo/server')
const { expressMiddleware } = require('@apollo/server/express4')
const { ApolloServerPluginDrainHttpServer } = require('@apollo/server/plugin/drainHttpServer')
const { makeExecutableSchema } = require('@graphql-tools/schema')
const express = require('express')
const cors = require('cors')
const http = require('http')

const jwt = require('jsonwebtoken')

const mongoose = require('mongoose')

const User = require('./models/user')

mongoose.set('strictQuery', false)

const typeDefs = require('./schema')
const resolvers = require('./resolvers')

require('dotenv').config()

const MONGODB_URI = process.env.MONGODB_URI 

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

// setup is now within a function
const start = async () => {
  const app = express()
  const httpServer = http.createServer(app)

  const server = new ApolloServer({
    schema: makeExecutableSchema({ typeDefs, resolvers }),
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  })

  await server.start()

  app.use(
    '/',
    cors(),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        const auth = req ? req.headers.authorization : null;
        console.log('>>> Context: Auth header:', auth); // Log header
        if (auth && auth.startsWith('Bearer ')) {
          try {
            const decodedToken = jwt.verify(auth.substring(7), process.env.JWT_SECRET);
            console.log('>>> Context: Token decoded:', decodedToken); // Log decoded payload
            const currentUser = await User.findById(decodedToken.id);
            console.log('>>> Context: Current user found:', currentUser); // Log found user
            return { currentUser };
          } catch (error) {
            console.error('>>> Context: Token verification failed:', error.message); // Log error
            return {};
          }
        }
      },
    }),
  )

  const PORT = 4000

  httpServer.listen(PORT, () =>
    console.log(`Server is now running on http://localhost:${PORT}`)
  )
}

start()