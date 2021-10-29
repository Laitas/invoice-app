import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    current : 'All'
}

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setFilter: (state,action) => {
            state.current = action.payload
        }
    }
});

export const {
    setFilter
} = filterSlice.actions
export default filterSlice.reducer