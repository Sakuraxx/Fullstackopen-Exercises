import { useState } from 'react'

const ButtonRandomSelect = ({selected, setSelected}) => {
  const getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
  };

  const handleClick = () => {
    let range = selected.votes.length;
    let randomId = getRandomInt(range);
    while (randomId === selected.id) {
      randomId = getRandomInt(range);
    }

    const newVotes = [...selected.votes];
    newVotes[randomId]++;
    const newSelected = {
      ...selected,
      votes: newVotes,
      id: randomId,
    };

    console.log('random id', randomId, newSelected);
    setSelected(newSelected);
  }

  return <button onClick={handleClick}>next anecdote</button>
}


function App() {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState({
    id:0,
    votes: new Array(anecdotes.length).fill(0)
  })

  return (
    <>
      <div>
        {anecdotes[selected.id]}<br/> Has {selected.votes[selected.id]} votes.
      </div>
      <ButtonRandomSelect selected={selected} setSelected={setSelected}></ButtonRandomSelect>
    </>
  )
}

export default App
