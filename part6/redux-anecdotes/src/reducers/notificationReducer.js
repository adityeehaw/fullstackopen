import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notification',
    reducers: {
        notificationShow(state, action) {
            return action.payload
        }
    }
})

export default notificationSlice