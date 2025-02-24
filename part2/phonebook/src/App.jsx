import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import axios from 'axios'
import './App.css'

const Person = (props) => {
  return (
    <div>
      {props.persons.map(person => <div key={person.name}>{person.name} {person.number}</div>)}
    </div>
  )
}

const Filter = (props) => {
  return (
    <div>
      filter shown with <input onChange={props.onChange} />
    </div>
  )
}

const PersonForm = (props) => {
  return (
    <form>
      <div>
        <div>name: <input value={props.newName} onChange={props.onChangeName} /></div>
        <div>number: <input value={props.newNumber} onChange={props.onChangeNumber} /></div>
      </div>
      <div>
        <button onClick={props.onClick} type="submit">add</button>
      </div>
    </form>
  )
}

const App = () => {  

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState(false)

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  
  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response =>  setPersons(response.data))
  },[])

  const handleFilterChange = (event) => {
    if (event.target.value === '') {
      setFilter(false)
    } else { 
    setSearch(event.target.value)
    setFilter(true)
    }
    
  }

  const addPerson = (event) => {
    event.preventDefault()
    if (newName === '') { return alert('Name cannot be empty')}
    if (newNumber === '') { return alert('Number cannot be empty')}
    if (isNaN(newNumber)) { return alert('Number must be a number')}
    if (persons.find(person => person.name === newName)) {
      alert(`${newName} is already added to the phonebook`)
      return
    }
      
    const personObject = {
      name: newName,
      number: newNumber
    }

    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
  }
  

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        <Filter onChange={handleFilterChange} />
      </div>
      <PersonForm newName={newName} newNumber={newNumber} onChangeName={handleNameChange} onChangeNumber={handleNumberChange} onClick={addPerson} />
      <h2>Numbers</h2>
      <Person persons={filter ? persons.filter((p) => p.name.includes(search)) : persons }  />
    </div>
  )
}


export default App
