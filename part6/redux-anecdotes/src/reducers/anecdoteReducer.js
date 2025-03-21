import { createSlice,current } from '@reduxjs/toolkit'
import anecdotesService from '../services/anecdotes'




const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    vote(state, action) {
      state.find(anec => anec.id === action.payload).votes += 1
      state.sort((a,b) => b.votes-a.votes)
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnec(state, action ) {
      state = action.payload
      return state.sort((a,b) => b.votes-a.votes)
    }
  }
})

export const { vote, add, appendAnecdote, setAnec } = anecdoteSlice.actions

export const initialAnecDote = () => {
  return async dispatch => {
    const anecdotes = await anecdotesService.getAll()
    dispatch(setAnec(anecdotes))
  }
}

export const createAnec = content => {
  return async dispatch => {
    const newNote = await anecdotesService.createNew(content)
    dispatch(appendAnecdote(newNote))
  }
}

export const voteAnec = (id,anec) => {
  return async dispatch => {
    const anecToChange = {...anec,votes: anec.votes + 1}

    console.log('change',anecToChange)
    anecdotesService.update(id,anecToChange)
    dispatch(vote(id))
  }
}

export default anecdoteSlice.reducer