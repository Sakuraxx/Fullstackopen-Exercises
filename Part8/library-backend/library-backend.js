const { ApolloServer } = require('@apollo/server')
const { expressMiddleware } = require('@apollo/server/express4')
const { ApolloServerPluginDrainHttpServer } = require('@apollo/server/plugin/drainHttpServer')
const { makeExecutableSchema } = require('@graphql-tools/schema')
const { WebSocketServer } = require('ws')
const { useServer } = require('graphql-ws/lib/use/ws');

const express = require('express')
const cors = require('cors')
const http = require('http')

const jwt = require('jsonwebtoken')

const mongoose = require('mongoose')

const User = require('./models/user')

const Book = require('./models/book')

mongoose.set('strictQuery', false)

const typeDefs = require('./schema')
const resolvers = require('./resolvers')

require('dotenv').config()

// Import DataLoader
const DataLoader = require('dataloader');

const MONGODB_URI = process.env.MONGODB_URI 

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })


// --- DataLoader Batch Function ---
const batchAuthorsBookCount = async (authorIds) => {
  try {
    const bookCounts = await Book.aggregate([
      { $match: { author: { $in: authorIds } } },
      { $group: { _id: '$author', count: { $sum: 1 } } }
    ]);

    console.log('[DataLoader] Aggregation result (bookCounts):', bookCounts);

    const countMap = new Map();
    bookCounts.forEach(item => {
      const key = item._id.toString(); // Key is string representation of ObjectId
      // console.log(`[DataLoader] Setting map: Key=${key}, Count=${item.count}`); // Log map setting
      countMap.set(key, item.count);
    });

    // Log the final map
    // console.log('[DataLoader] Final countMap:', countMap);

    // Map the original IDs to their counts from the map
    const finalCounts = authorIds.map(id => {
      const key = id.toString(); // Lookup key is also string representation
      const count = countMap.get(key) || 0; // Get count or default to 0
      // console.log(`[DataLoader] Mapping ID ${key} to Count ${count}`); // Log mapping lookup
      return count;
    });

    console.log('[DataLoader] Returning final counts:', finalCounts); // Log final result array
    return finalCounts;

  }catch (error) {
    console.error('[DataLoader] Error fetching book counts:', error);
    // Return an array of errors or default values, matching the input length
    return authorIds.map(() => 0); // Or throw an error if appropriate
  }
};

// setup is now within a function
const start = async () => {
  const app = express()
  const httpServer = http.createServer(app)

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/',
  })

  const schema = makeExecutableSchema({ typeDefs, resolvers })
  const serverCleanup = useServer({
    schema,
    onConnect: (ctx) => {
      console.log('[WebSocket Backend] Connected:', ctx.connectionParams);
    },
    onDisconnect: (ctx, code, reason) => {
      console.log('[WebSocket Backend] Disconnected:', code, reason); 
    },
    onError: (ctx, msg, errors) => {
      console.error('[WebSocket Backend] Error:', errors); 
    },
  }, wsServer);

  const server = new ApolloServer({
    schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      }
    ]
  })
  
  await server.start()

  app.use(cors())
  app.use(express.json())

  app.use(
    '/',
    expressMiddleware(server, {
      context: async ({ req }) => {
        // --- Create DataLoaders PER REQUEST ---
        const loaders = {
          bookCount: new DataLoader(batchAuthorsBookCount)
        };

        let contextObject = { loaders, currentUser: null }; // Start with loaders and null user

        const auth = req ? req.headers.authorization : null;
        console.log('>>> Context: Auth header:', auth); // Log header
        if (auth && auth.startsWith('Bearer ')) {
          try {
            const decodedToken = jwt.verify(auth.substring(7), process.env.JWT_SECRET);
            console.log('>>> Context: Token decoded:', decodedToken); // Log decoded payload
            const currentUser = await User.findById(decodedToken.id);
            console.log('>>> Context: Current user found:', currentUser); // Log found user
            if (currentUser) {
              contextObject.currentUser = currentUser;
            }
          } catch (error) {
            console.error('>>> Context: Token verification failed:', error.message); // Log error
          }
        }

        return contextObject;
      },
    }),
  )

  const PORT = 4000

  httpServer.listen(PORT, () =>
    console.log(`Server is now running on http://localhost:${PORT}`)
  )
}

start()