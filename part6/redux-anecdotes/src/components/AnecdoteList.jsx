import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { voteAnec } from '../reducers/anecdoteReducer'

const Anecdote = ( {anecdote} ) => {
    const dispatch = useDispatch()
    const votes = (id,anecdote) => {
        dispatch(voteAnec(id,anecdote))
      }
      
    return (
        <>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => votes(anecdote.id,anecdote)}>vote</button>
            </div>
            </div>
        </>
    )
}

const AnecdoteList = () => {
    const anecdotes = useSelector(state => 
        state.filter ? state.anec.filter(a =>  state.anec ) : state.anec  
        // a.content.toLowerCase().includes(state.filter)) : 
    )
    
        return (
        <>
        {anecdotes.map(a =>  <Anecdote key={a.id} anecdote={a}/>) }
        </>
    )
}

export default AnecdoteList