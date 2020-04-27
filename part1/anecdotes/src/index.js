import React, { useState } from 'react'
import ReactDOM from 'react-dom'
const Anecdote = ({ content, vote }) => (
  <div>
    <h1>Anecdote of the day</h1>
    <p>{content}</p>
    <p>has {vote} votes</p>
  </div>
);
const MostAnecdote = ({ content, vote }) => (
    <div>
      <h1>Anecdote with most votes</h1>
      <p>{content}</p>
      <p>has {vote} votes</p>

    </div>
  
);
const App = (props) => {
  const [selected, setSelected] = useState(0)
  const points = { ...Array(anecdotes.length).fill(0) };

  const [vote, setVote] = useState(points)

  let arr = Object.values(vote);
  let max_vote = Math.max(...arr);
  
  let random = Math.floor(Math.random() * (props.anecdotes.length - 0) + 0)

  const randomAnecdotes = () => setSelected(random )

  const clickVote = () => {
    setVote({ ...vote, [selected]: vote[selected] +1})
  }
  return (
    <div>
      <Anecdote content={anecdotes[selected]} vote={vote[selected]} />
      <button  onClick={clickVote}> vote </button> 
      <button  onClick={randomAnecdotes}> next anecdote </button> 
      <MostAnecdote content={anecdotes[arr.indexOf(max_vote)]} vote={max_vote} /> 

    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)