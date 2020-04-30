import React from 'react'

const Header = (props) =>{
  return(
    <div>
      <h1>{props.header}</h1>
    </div>
  )
}

const MultiContent = ({name, parts}) =>{
  let sum = parts.map(part => part.exercises).reduce((a, c) => { return a + c });

  return(
    <div>
      <h2>{name}</h2>
      
      {parts.map((part) => 
          <Part key={part.id} name={part.name} exercise={part.exercises}/>
      )}
      <p><strong>Total of {sum} exercises</strong></p>
    </div>
  )
}

const Content = (props) =>{

  return(
    <div>
      {props.parts.map((content) => 
          <MultiContent key={content.id} name={content.name} parts={content.parts}/>
        )}
    </div>
  )
}

const Part = ({name, exercise}) =>{
   return(
     <div>
      <p>{name} {exercise}</p>
     </div>
   )
}

const Course = (props) => {
    const { course } = props

    return (
      <div>
        <h1>Web Development curriculum</h1>
         <Header header={course.name} />
         <Content parts={course}/>
      </div>
    )
}

export default Course
