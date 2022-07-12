import { createSlice } from '@reduxjs/toolkit'
const initialState = null

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        notificationShow(state, action) {
            return state = action.payload
        },
        notificationRemove(state, action) {
            return state = null
        }
    }
})

export const { notificationShow, notificationRemove } = notificationSlice.actions

let timeoutID
export const setNotification = (message, time) => {
    return dispatch => {
        if (timeoutID) {
            clearTimeout(timeoutID)
        }
        dispatch(notificationShow(message))
        timeoutID = setTimeout(() => dispatch(notificationRemove()), time*1000)
    }
}

export default notificationSlice.reducer