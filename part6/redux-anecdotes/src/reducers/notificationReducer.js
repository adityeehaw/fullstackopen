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

export default notificationSlice.reducer