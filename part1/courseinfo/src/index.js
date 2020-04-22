import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  return (
    <div>
      <h1>
        {props.course}
      </h1>
    </div>
  )
}

const Content = (content) => {
  return (
    <div>
      {content.parts.map((value,index)=>(
         <div key={index}>
           <Part content={value}/>
         </div> 
      ))}
    </div>
  )
}

const Part = (part) => {

  return (
    <div>
      <p>
        {part.content.name} {part.content.exercises}
      </p>
    </div>
  )
}

const Total = (total) => {
  const total_exercise = total.parts.reduce((exercise, part) => exercise + part.exercises, 0);
  return (
    <div>
     
      <p>
        Number of exercises {total_exercise}
      </p>
    </div>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))