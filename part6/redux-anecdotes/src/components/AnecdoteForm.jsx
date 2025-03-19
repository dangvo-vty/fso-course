import { useDispatch  } from "react-redux"
import { add } from '../reducers/anecdoteReducer'
import { append,remove } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addNew = (event) => {
        event.preventDefault()
        const value = event.target.input.value
        event.target.input.value = ''
        dispatch(add(value))
        dispatch(append({value: value}))
        setTimeout(() => {
          dispatch(remove())
        }, 5000)
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