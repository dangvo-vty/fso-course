import { useSelector } from "react-redux"
import Anecdote from "./Anecdote"

const AnecdoteList = () => {
    const anecdotes = useSelector((state) => state.anec)
    return (
        <>
        {anecdotes.map(a =>  <Anecdote key={a.id} anecdote={a}/>)}
        </>
    )
}

export default AnecdoteList