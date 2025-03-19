import { useSelector } from "react-redux"
import Anecdote from "./Anecdote"

const AnecdoteList = () => {
    const anecdotes = useSelector(state => 
        state.filter ? state.anec.filter(a => a.content.toLowerCase().includes(state.filter)) : state.anec)
    return (
        <>
        {anecdotes.map(a =>  <Anecdote key={a.id} anecdote={a}/>)}
        </>
    )
}

export default AnecdoteList