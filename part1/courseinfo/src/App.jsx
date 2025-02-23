import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

const Header = (props) => {
  return (
    <h1 key={props.key}> {props.course} </h1>
  )
}

const Content = (props) => {
  console.log(props)
  return (
    <div>
      { props.part.map((part) => <Part key={part.id} part={part.name} exercises={part.exercises} />)}
      <Total parts={props.part}/>
    </div> 
  )
}

const Total = ({parts}) => {
  const total = parts.reduce( (s, p) => s + p.exercises,0)
  return (
    <p><strong>Number of exercises</strong> {total}</p>
  )
}

const Part = (props) => {
  return (
    <p key={props.key}>  {props.part} {props.exercises}</p>
  )
}

const Course = ({key, course}) => {
  console.log(course.parts)
  return (
    <div>
      <Header key={key} course={course.name}/>
      <Content part={course.parts}/>
    </div>
  )
}

const App = () => { 
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
  <div>
    { courses.map((course) => <Course key={course.id} course={course}/>) }
  </div>
    
  )
}

export default App
