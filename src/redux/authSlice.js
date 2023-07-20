import { createSlice } from '@reduxjs/toolkit';
import { signUp, logIn, logOut, refreshUser } from './authOperations';

const initialState = {
    user: { name: null, email: null },
    token: null,
    isAuth: false,
    isLoggedIn: false,
    isRefreshing: false,
    error: null
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        clearError(state) {
            state.error = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(signUp.fulfilled, (state, action) => {
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.isLoggedIn = true;
                state.isAuth = false;
            }).addCase(signUp.rejected, (state, action) => {
                state.error = action.payload
                state.isAuth = false;
            })
            .addCase(signUp.pending, (state) => {
                state.isAuth = true
            })
            .addCase(logIn.fulfilled, (state, action) => {
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.isLoggedIn = true;
                state.isAuth = false;
            })
            .addCase(logIn.rejected, (state, action) => {
                state.error = action.payload
                state.isAuth = false;
            })
            .addCase(logIn.pending, (state) => {
                state.isAuth = true
            })
            .addCase(logOut.fulfilled, (state) => {
                state.user = { name: null, email: null };
                state.token = null;
                state.isLoggedIn = false;
                state.isAuth = false;
            })
            .addCase(logOut.rejected, (state) => {
                state.isAuth = false;
            })
            .addCase(logOut.pending, (state) => {
                state.isAuth = true
            })
            .addCase(refreshUser.pending, (state) => {
                state.isRefreshing = true;
            })
            .addCase(refreshUser.fulfilled, (state, action) => {
                state.user = action.payload;
                state.isLoggedIn = true;
                state.isRefreshing = false;
            })
            .addCase(refreshUser.rejected, (state) => {
                state.isRefreshing = false;
            })


    }
})

export const { clearError } = authSlice.actions

export default authSlice.reducer;
