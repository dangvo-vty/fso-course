import { useDispatch } from "react-redux"
import { vote } from '../reducers/anecdoteReducer'

const Anecdote = ( {anecdote} ) => {
    const dispatch = useDispatch()

    const votes = (id) => {
        dispatch(vote(id))
      }

    return (
        <>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => votes(anecdote.id)}>vote</button>
            </div>
            </div>
        </>
    )
}

export default Anecdote