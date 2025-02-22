import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'


const App = () => { 
  const course = 'Half stack application development'
  const part = [
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

  const Header = (props) => {
    return (
      <h1> {props.course} </h1>
    )
  }

  const Content = (props) => {
    return (
      <div>
        <Part part={part[0].name} exercises={part[0].exercises} />
        <Part part={part[1].name} exercises={part[1].exercises} />
        <Part part={part[2].name} exercises={part[2].exercises} />
      </div> 
    )
  }

  const Total = (props) => {
    return (
      <p>Number of exercises {props.exercises + props.exercises2 + props.exercises3}</p>
    )
  }

  const Part = (props) => {
    return (
      <p>{props.part} {props.exercises}</p>
    )
  }

  return (
    <div>
      <Header course={course} />
      <Content part={part[0].name} exercises={part[0].exercises} />
      <Total exercises={part[0].exercises} exercises2={part[1].exercises} exercises3={part[2].exercises} />
    </div>
  )
}

export default App
