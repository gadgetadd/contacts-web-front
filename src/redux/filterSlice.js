import { createSlice } from '@reduxjs/toolkit'


const filterSlice = createSlice({
    name: 'filter',
    initialState: {
        name: '',
        favorites: 'all'
    },
    reducers: {
        setNameFilter: (state, action) => {
            state.name = action.payload
        },
        setFavoritesFilter: (state, action) => {
            state.favorites = action.payload
        }

    },
})


export const { setNameFilter, setFavoritesFilter } = filterSlice.actions

export default filterSlice.reducer