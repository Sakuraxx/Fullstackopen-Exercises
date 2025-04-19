import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";
import FavoriteBooks from "./components/FavoriteBooks";
const App = () => {
  const [page, setPage] = useState("authors");
  const [errorMessage, setErrorMessage] = useState(null)
  const [token, setToken] = useState(null)

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }
  
  const Notify = ({errorMessage}) => {
    if ( !errorMessage ) {
      return null
    }
    return (
      <div style={{color: 'red'}}>
      {errorMessage}
      </div>
    )
  }


  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        
        {!token && <button onClick={() => setPage("login")}>login</button>}

        {token && <button onClick={() => setPage("add")}>add book</button>}
        {token && <button onClick={() => setPage("recommendations")}>recommendations</button>}
        {token && <button onClick={() => {setToken(null); localStorage.clear(); setPage("books")}}>logout</button>}
      </div>
      <Notify errorMessage={errorMessage} />

      <Authors show={page === "authors"} setError={notify}/>

      <Books show={page === "books"} />

      <FavoriteBooks show={page === "recommendations"} token={token}/>

      <NewBook show={page === "add"} setError={notify}/>

      <LoginForm show={page == "login"} setError={notify} setToken={setToken} setPage={setPage}/>

    </div>
  );
};

export default App;
