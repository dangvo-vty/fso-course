import { useEffect } from 'react'
import AnecdoteForm from './components/AnecdoteForm'

import Filter from './components/Filter'
import Notification from './components/Notification'

import anecdotesService from './services/anecdotes'
import  {setAnec, initialAnecDote} from './reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'
import AnecdoteList from './components/AnecdoteList'

const App = () => {
  const dispatch = useDispatch()
  console.log('APp')

  useEffect(() => {
   dispatch(initialAnecDote())
  }, [])
  

  return (
    <div>
      <Notification/> 
      <h2>Anecdotes</h2>
      <Filter/>
      <AnecdoteList/>
      <AnecdoteForm/>
    </div>
  )
}



export default App