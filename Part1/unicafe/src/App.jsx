import { useState } from 'react'

const Button = ({ text, value, onClick }) => {
  console.log(text, value);
  return <button onClick={() => onClick(value + 1)}>{text}</button>
}

const Statistics = ({good, neutral, bad}) => {
  const total = good + neutral + bad;
  const average = total == 0 ? 0 : good - bad / total;
  const positive = total == 0 ? 0 : good / total * 100;

  if(total == 0)
  {
    return <p>No feedback given.</p>
  }
  return (
    <>
        <h1>statistics</h1>
        <p>good: {good}</p>
        <p>neutral: {neutral}</p>
        <p>bad: {bad}</p>
        <p>all: {total}</p>
        <p>average score: {average}</p>
        <p>positive: {positive}%</p>
    </>

  )
}

function App() {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <>
      <h1>give feedback</h1>
      <Button text="good" value={good} onClick={setGood} ></Button>
      <Button text="neutral" value={neutral} onClick={setNeutral} ></Button>
      <Button text="bad" value={bad} onClick={setBad} ></Button>
      <Statistics good={good} neutral={neutral} bad={bad}></Statistics>
    </>
  )
}

export default App
