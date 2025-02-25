import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'

// const Weather = ({w,capital}) => {
//   return (
//     <>
   
//     <h2><strong>Weather in {capital}</strong></h2>
//       <p>Temp {w.main.temp -  273.15} in Celcius</p>
//       <img src={`https://openweathermap.org/img/wn/${w.weather[0].icon}@2x.png`}></img>
//       <p>Wind {w.wind.speed} m/s</p>
//       </>
//   )
  
// }

const Infomation = (props) => {
  const languages = []
  for (var key of Object.keys(props.country.languages)) {
    languages.push(props.country.languages[key])
  }
  
  return (
    <div>
      <h2><strong>{props.country.name.common}</strong></h2>
      <p>Capital: {props.country.capital}</p>
      <p>Area: {props.country.area}</p>
      <h2><strong>Language</strong></h2>
      <ul>
        {languages.map((l) => <li key={l}>{l}</li>)}
      </ul>
      <img src={props.country.flags.png}></img>
      {/* <Weather weather={props.weather} capital={props.country.capital}/> */}
    </div>
  )
}

const Display = (props) => {
  const api = import.meta.env.VITE_OPEN_WEATHER
  // const [w,setWeather] = useState([])
  
  // const getWeather = async (name,api) => {
  //   console.log("FE")
  //   return await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${api}`).then(( c)  => setWeather(c.data)).catch(err => console.log(err))
  // }

  if (props.countries.length == 1) {
    // getWeather(props.countries[0].capital,api)
    return (
      <div>
        <Country  country={props.countries[0]} init={true}/>
      </div>
    )} 
  if (props.countries.length <= 10 && props.countries.length > 1) {
    return (
        <div>
          { props.countries.map((c) => <Country   country={c}  init={false} /> )}
        </div>
  )} else if (props.countries.length > 10) {
          return (
            <div>
              <p>Too many please specific</p>
            </div>
          )
        } 
        
}

const Country = (props) => {
  const init = props.init
  const [toggle,setToggle] = useState(init)

  const handleClick = (() => {
    setToggle(!toggle)
  })

  return (
    <div>
      <p key={props.country.name.common}> {props.country.name.common} <button onClick={handleClick}>{toggle ? "Show": "Hide"}</button></p>
      {toggle ? <Infomation weather={props.w} country={props.country}/> : <div></div>}
      
    </div>

  )
}

function App() {
  const [change,setChange] = useState('')
  const [country, setCountry] = useState([])
  const [search,setSearch] = useState([])

  useEffect(() => {
    axios.get("http://localhost:3003/0").then(response => setCountry(response.data))
  },[])
  

  const handleChange = (event) => {
    setChange(event.target.value)
    if (event.target.value == '') {
      setSearch([])
    } else {
      setSearch(country.filter((c) => c.name.common.toLowerCase().includes(event.target.value.toLowerCase())))
    }
 
    }
  

  return (
    <div>
      find countries <input value={change} onChange={handleChange} placeholder='find...'/>
      <Display countries={search}/>
      </div>
  )
}

export default App
