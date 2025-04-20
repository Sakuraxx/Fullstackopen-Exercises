import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
query {
  allAuthor {
    name
    born
    bookCount
  }
}`

export const Edit_AUTHOR = gql`
mutation editAuthor($name: String!, $birth: Int!) {
    editAuthor(name: $name, setBornTo: $birth) {
      name
      born
    }
  }
`

export const ALL_BOOKS = gql`
  query ($genre: String) {
    allBooks(genre: $genre) {
      title
      author {
        name
        bookCount,
        born
      }
      published
      genres 
    }
  }
`

export const ADD_BOOK = gql`
  mutation addBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
    addBook(
      title: $title,
      author: $author,
      published: $published,
      genres: $genres
    ) {
      title
      published
      genres
      author {
        name
        bookCount
      }
    }
  }
`

export const LOGIN = gql`
mutation login($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    value
  }
}
`

export const CURRENT_USER = gql`
query Me {
  me {
    username
    favoriteGenre
    id
  }
}
`
export const ALL_GENRES = gql`
query AllGenres {
  allGenres
}
`

export const BOOK_ADDED = gql`
subscription Subscription {
  bookAdded {
    title
    author {
      name
      bookCount
      born
    }
    published
    genres
  }
}
`