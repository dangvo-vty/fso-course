import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import axios from 'axios'
import notesService from './services/notes' 
import './App.css'
import notes from './services/notes'

const Notification = ({message,className}) => {
  if (message == '') return null
  return (
    <div className={className} >
      {message}
    </div>
  )
}

const Person = (props) => {
  return (
    <div>
      { 
      props.persons.map( person => 
        <div key={person.name}>
          {person.name} {person.number} <button onClick={() => props.onClick(person.id)}>Delete</button>
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
  const [message, setMessage] = useState('')
  const [className, setClassName] = useState('')

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
    // if (isNaN(newNumber)) { return alert('Number must be a number')}

    if (isExist && !isNaN(newNumber)) {
      if (window.confirm(`Hey, ${newName} is already exist. Replace the old with a new number? `)) {
        const updated = {...isExist, number: newNumber}
        notesService.update(isExist.id, updated).then(returnedPerson => {
          setPersons(persons.map(p => p.id === isExist.id ? returnedPerson: p))
        setClassName('successful')
        setMessage('Updated complete')
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

    notesService
    .create(personObject)
    .then(p => {
      setPersons(persons.concat({...personObject,id:p.id}))
      console.log("then created",p)
    })
    .catch(error => {
      setMessage(`${error.response.data.error}`),
      setClassName('error'),
      setTimeout(()=>{
        setMessage(''),
        setClassName('')
      },10000)
    })
    setClassName('successful')
    setMessage(`Added ${newName}`)
    setNewName('')
    setNewNumber('')
  }
  
  const deletePerson = (id) => {
     console.log(id)
    const person = persons.find(p => p.id === id)
    if (window.confirm (`Delete ${person.name}?`)) {
      notesService.deletePerson(id).then( returnedPerson => {
      setPersons(persons.filter(p => p.id !== id)),
      setClassName('successful'),
      setMessage(`Deleted ${  person.name}`)
    }).catch(error => {
        setMessage(`${person.name} is already deleted`),
        setClassName('error'),
        setTimeout(() => {
          setMessage(''),
          setClassName('error')
        },5000)
      })  
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} className={className}/>
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
