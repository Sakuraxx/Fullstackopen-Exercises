import { useState, useEffect } from 'react'
import { useMutation, useApolloClient } from '@apollo/client'
import { LOGIN } from './queries'

const LoginForm = ({ show, setError, setToken, setPage }) => {
  if(!show) {
    return null
  }

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const client = useApolloClient();

  const [ login, result ] = useMutation(LOGIN, {
    onError: (error) => {
      setError(error.graphQLErrors[0].message)
    }
  })


  useEffect(() => {
    if ( result.data ) {
      client.resetStore(); // clear cache
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('bookapp-user-token', token)
      setPage('books')
    }
  }, [result.data, setToken, setPage])

  const submit = async (event) => {
    event.preventDefault()

    login({ variables: { username, password } })
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          username <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password <input
            type='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )
}

export default LoginForm