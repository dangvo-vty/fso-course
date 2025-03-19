import { createSlice,current } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notification',
    initialState : [],
    reducers: {
        append(state, action) {
        state[0] = action.payload.value
        },
        remove(state,action) {
            state[0] = null
        }
    }   
})

export const { append,remove } = notificationSlice.actions
export default notificationSlice.reducer