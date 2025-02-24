import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import axios from 'axios'
import notesService from './services/notes' 
import './App.css'
import notes from './services/notes'


const Person = (props) => {
  return (
    <div>
      { 
      props.persons.map( person => 
        <div key={person.name}>
          {person.name} {person.number} <button onClick={() => props.onClick(person.id)}></button>
          </div>
        )
      }
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
    notesService.getAll().then(initialNotes => {
      setPersons(initialNotes)
    })
  }, [])

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
    const isExist = persons.find(person => person.name === newName)
    
    if (newName === '') { return alert('Name cannot be empty')}
    if (newNumber === '') { return alert('Number cannot be empty')}
    if (isNaN(newNumber)) { return alert('Number must be a number')}
    if (isExist && !isNaN(newNumber)) {
      if (window.confirm(`Hey, ${newName} is already exist. Replace the old with a new number? `)) {
        const updated = {...isExist, number: newNumber}
        notesService.update(isExist.id, updated).then(returnedPerson => {
          setPersons(persons.map(p => p.id === isExist.id ? returnedPerson: p))
        setNewName('')
        setNewNumber('')
        })       
      }
      
      return
    }
      
    const personObject = {
      name: newName,
      number: newNumber
    }

    notesService.create(personObject)
    .then(p => setPersons(persons.concat({...personObject,id:p.id})))
    setNewName('')
    setNewNumber('')
  }
  
  const deletePerson = (id) => {
     console.log(id)
    const person = persons.find(p => p.id === id)
    if (window.confirm (`Delete ${person.name}?`)) {
      notesService.deletePerson(id)
      setPersons(persons.filter(p => p.id !== id))
      
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        <Filter onChange={handleFilterChange} />
      </div>
      <PersonForm newName={newName} newNumber={newNumber} onChangeName={handleNameChange} onChangeNumber={handleNumberChange} onClick={addPerson} />
      <h2>Numbers</h2>
      <Person persons={filter ? persons.filter((p) => p.name.includes(search)) : persons } onClick={deletePerson} />
    </div>
  )
}


export default App
