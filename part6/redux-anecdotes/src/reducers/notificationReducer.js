import { createSlice,current } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notification',
    initialState : [],
    reducers: {
        append(state, action) {
        state[0] = action.payload
        console.log(state)
        },
        remove(state,action) {
            state[0] = null
        }
    }   
})


export const { append,remove } = notificationSlice.actions

export const setNotifcation = (message,time) => {
    return dispatch => {
        dispatch(append(message))
        setTimeout(() => {
            dispatch(remove())
        },time)
    }
}
export default notificationSlice.reducer