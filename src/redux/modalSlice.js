import { createSlice } from '@reduxjs/toolkit'
import { formVariant } from '../constants/constants';


const modalSlice = createSlice({
    name: 'modal',
    initialState: {
        isFormOpen: false,
        isFormEdited: false,
        formVariant: null,
        idToEdit: null
    },
    reducers: {
        openFormNew: (state) => {
            state.isFormOpen = true;
            state.formVariant = formVariant.new;
        },
        editForm: (state) => {
            state.isFormEdited = true;
        },
        openFormEdit: (state, action) => {
            state.isFormOpen = true;
            state.formVariant = formVariant.edit;
            state.idToEdit = action.payload;
        },
        closeForm: (state) => {
            state.isFormOpen = false;
            state.formVariant = null;
            state.idToEdit = null;
            state.isFormEdited = false;
        },
    },
})

export const {
    openFormEdit,
    openFormNew,
    closeForm,
    editForm
} = modalSlice.actions

export default modalSlice.reducer