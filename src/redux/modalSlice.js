import { createSlice } from '@reduxjs/toolkit'


const modalSlice = createSlice({
    name: 'modal',
    initialState: { isDialogOpen: false, isDrawerOpen: false, variant: null, idToEdit: null },
    reducers: {
        openDrawerNew: (state) => {
            state.isDrawerOpen = true;
            state.variant = 'new';
        },
        openDrawerEdit: (state, action) => {
            state.isDrawerOpen = true;
            state.variant = 'edit';
            state.idToEdit = action.payload;
        },
        closeDrawer: (state) => {
            state.isDrawerOpen = false;
            state.variant = null;
            state.idToEdit = null;
        },
        openDialog: (state) => {
            state.isDialogOpen = true;
        },
        closeDialog: (state) => {
            state.isDialogOpen = false
        }


    },
})


export const { openDrawerEdit, openDrawerNew, closeDrawer, openDialog, closeDialog } = modalSlice.actions

export default modalSlice.reducer