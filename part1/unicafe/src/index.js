import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Statistics = (props) => {
 
  console.log(props)
  let total = props.good + props.neutral + props.bad;
  let average = ( props.good *1 + props.neutral*0 +props.bad*-1) / total;
  let positive = (props.good / total) * 100
  return(
    <div>
      <h2>statistics</h2>
      {total == 0 ?
        <p> No feedback given</p>
      :
        <table>

          <Statistic text="good" value ={props.good} />
          <Statistic text="neutral" value ={props.neutral} />
          <Statistic text="bad" value ={props.bad} />
          <Statistic text="all" value ={total} />
          <Statistic text="average" value ={average} />
          <Statistic text="positive" value ={positive} />
        </table>
      }
    </div>
  )
}

const Statistic = ({text, value})=>{
  return( 
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
  )
}
const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)
const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
  }
  
  
  return (
    <div>
      <div>
        <h2>Give feedback</h2>
        
        <Button onClick={handleGoodClick} text='good' />
        <Button onClick={handleNeutralClick} text='neutral' />
        <Button onClick={handleBadClick} text='bad' />

      </div>
      <div>
        <Statistics good={good} bad={bad} neutral={neutral} />
       

      </div>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)