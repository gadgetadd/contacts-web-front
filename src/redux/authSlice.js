import { createSlice } from '@reduxjs/toolkit';
import {
    signUp,
    logIn, logOut,
    refreshUser,
    changeAvatar,
    verify,
    resend
} from './authOperations';

const initialState = {
    user: { name: null, email: null },
    token: null,
    isAuth: false,
    isLoggedIn: false,
    isRefreshing: false,
    error: null
};

const authRejectHandler = (state, action) => {
    state.error = action.payload
    state.isAuth = false;
};

const authPendingHandler = (state) => {
    state.isAuth = true;
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
            .addCase(signUp.fulfilled, (state) => {
                state.isAuth = false;
            })
            .addCase(verify.fulfilled, (state, action) => {
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.isLoggedIn = true;
                state.isAuth = false;
            })
            .addCase(resend.fulfilled, (state) => {
                state.isAuth = false;
            })
            .addCase(logIn.fulfilled, (state, action) => {
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.isLoggedIn = true;
                state.isAuth = false;
            })
            .addCase(logOut.fulfilled, (state) => {
                state.user = { name: null, email: null };
                state.token = null;
                state.isLoggedIn = false;
                state.isAuth = false;
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
            .addCase(changeAvatar.fulfilled, (state, action) => {
                state.user = { ...state.user, ...action.payload };
                state.isAuth = false;
            })
            .addCase(signUp.pending, authPendingHandler)
            .addCase(logIn.pending, authPendingHandler)
            .addCase(logOut.pending, authPendingHandler)
            .addCase(changeAvatar.pending, authPendingHandler)
            .addCase(verify.pending, authPendingHandler)
            .addCase(resend.pending, authPendingHandler)
            .addCase(signUp.rejected, authRejectHandler)
            .addCase(logIn.rejected, authRejectHandler)
            .addCase(logOut.rejected, authRejectHandler)
            .addCase(changeAvatar.rejected, authRejectHandler)
            .addCase(verify.rejected, authRejectHandler)
            .addCase(resend.rejected, authRejectHandler)
    }
})

export const { clearError } = authSlice.actions

export default authSlice.reducer;
