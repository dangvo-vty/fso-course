import { useDispatch  } from "react-redux"
import { createAnec } from '../reducers/anecdoteReducer'
import { setNotifcation } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addNew = async (event) => {
        event.preventDefault()
        const value = event.target.input.value
        event.target.input.value = ''
        dispatch(createAnec(value))
        dispatch(setNotifcation(value,5000))
      }

    return (
        <>
        <h2>create new</h2>
      <form onSubmit={addNew}>
        <div><input name='input'/></div>
        <button >create</button>
      </form>
        </>
    )
}

export default AnecdoteForm;