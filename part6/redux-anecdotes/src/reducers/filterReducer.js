import { createSlice } from "@reduxjs/toolkit"
const initialState = ''

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        filterIt(state, action) {
            return state = action.payload
        }
    }
})

export const { filterIt } = filterSlice.actions
export default filterSlice.reducer