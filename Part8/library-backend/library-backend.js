const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { GraphQLError } = require('graphql')

const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const Book = require('./models/book');
const Author = require('./models/author');

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


const typeDefs = `
  type Book {
    title: String!
    author: Author!
    published: Int!
    genres: [String!]!
  }

  type Author {
    name: String
    bookCount: Int
    born: Int
  }

  type Query {
    bookCount: Int
    authorCount: Int
    allBooks(genre: String): [Book!]!
    allAuthor: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
  }
`

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(), 
    authorCount: async () => Author.collection.countDocuments(),
    allAuthor: async (root, args) => {
        return await Author.find({})
    },
    allBooks: async (root, args) => {
      const filter = args.genre ? { genres: { $in: [args.genre] } } : {}
      return await Book.find(filter).populate('author')
    }
  },

  Author: {
    bookCount: async (root) => {
      return await Book.countDocuments({ author: root._id })
    }
  },
  
  Mutation: {
    addBook: async (root, args) => {
      let author = await Author.findOne({ name: args.author })

      try {
        if (!author) {
          author = new Author({ name: args.author});
          await author.save()
        }
      } catch (error) {
        throw new GraphQLError('Saving author failed', {
          extensions: {
            code: 'BAD_AUTHOR_INPUT',
            invalidArgs: args.author,
            error
          }
        })
      }

      try {
        const book = new Book({ ...args, author: author._id})
        await book.save()
        return book
      } catch (error) {
        throw new GraphQLError('Saving book failed', {
          extensions: {
            code: 'BAD_BOOK_INPUT',
            invalidArgs: args.title,
            error
          }
        })
      }
    },
    editAuthor: async (root, args) => {
      const author = await Author.findOne({ name: args.name })

      try {
        if (author) {
          author.born = args.setBornTo
        }
        return author.save()
      } catch (error) {
        throw new GraphQLError('Saving author failed', {
          extensions: {
            code: 'BAD_BORNYEAR_INPUT',
            invalidArgs: args.setBornTo,
            error
          }
        })
      }
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
