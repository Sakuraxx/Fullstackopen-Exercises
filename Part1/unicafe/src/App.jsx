import { useState } from 'react'

const Button = ({ text, value, onClick }) => {
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
      <table>
        <tbody>
          <StatisticLine text="good" value={good}></StatisticLine>
          <StatisticLine text="neutral" value={neutral}></StatisticLine>
          <StatisticLine text="bad" value={bad}></StatisticLine>
          <StatisticLine text="all" value={total}></StatisticLine>
          <StatisticLine text="average" value={average}></StatisticLine>
          <StatisticLine text="positive" value={positive} unit="%"></StatisticLine>
        </tbody>
      </table>
    </>
  )
}

const StatisticLine = ({text, value, unit=""}) => {
  return (
    <>
      <tr>
        <td>{text}</td>
        <td>{value.toFixed(2)} {unit}</td>
      </tr>
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
