import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const StatisticLine = (props) => {
  return (
    
      <td>{props.text} {props.value}</td>
    
  )
}

const Statistic = ({good,neutral,bad}) => {
  var all = good + neutral + bad
  var avg = (good + (neutral - neutral) - bad ) / all
  var positive = (good / all) * 100
return (
    <div>
      <table>
        <tbody>
         
        <tr>
          <StatisticLine text="good" value={good} />
        </tr>
        <tr>
          <StatisticLine text="neutrl" value={neutral} />
        </tr>
        <tr>
          <StatisticLine text="bad" value={bad} />
        </tr>
        <tr>
          <StatisticLine text="all" value={all} />
        </tr>
        <tr>
          <StatisticLine text="avg" value={avg } />
        </tr>
        <tr>
          <StatisticLine text="positive" value={positive + "%"} />
        </tr>
        
        </tbody>
      </table>     
    </div>
  )
  
}

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}

function App() {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const setValueGood = () => {
      setGood(good + 1)
    }
    const setValueNeutral = () => {
      setNeutral(neutral + 1)
    }
    const setValueBad = () => {
      setBad(bad + 1)
    }

    return (
      <div>
        
        <h1>give feedback</h1>
        <Button handleClick={setValueGood} text="good" />
        <Button handleClick={setValueNeutral} text="neutrel" />
        <Button handleClick={setValueBad} text="bad" />
        <h1>Statistics</h1>

        <Statistic good={good} bad={bad} neutral={neutral}  />
      </div>
    )
}

export default App
