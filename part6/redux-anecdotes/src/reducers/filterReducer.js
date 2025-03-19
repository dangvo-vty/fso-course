import { createSlice, current } from "@reduxjs/toolkit"

const anecdoteFilter = createSlice({
    name: 'anecdoteFilter',
    initialState: [],
    reducers: {
        filter(state, action) {
            state[0] = action.payload
        }
        
    }
})

export const { filter } = anecdoteFilter.actions
export default anecdoteFilter.reducer