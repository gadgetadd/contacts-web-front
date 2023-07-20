import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = 'https://connections-api.herokuapp.com';

const setToken = token => axios.defaults.headers.common.Authorization = `Bearer ${token}`;
const removeToken = () => axios.defaults.headers.common.Authorization = '';

export const refreshUser = createAsyncThunk(
    'auth/refresh',
    async (_, thunkAPI) => {
        const { auth: { token } } = thunkAPI.getState();
        if (token === null) {
            return thunkAPI.rejectWithValue('User is not authorized');
        }
        try {
            setToken(token);
            const res = await axios.get('/users/current');
            return res.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const signUp = createAsyncThunk(
    'auth/signup',
    async (data, thunkAPI) => {
        try {
            const res = await axios.post('/users/signup', data);
            setToken(res.data.token);
            return res.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const logIn = createAsyncThunk(
    'auth/login',
    async (data, thunkAPI) => {
        try {
            const res = await axios.post('/users/login', data);
            setToken(res.data.token);
            return res.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const logOut = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
    try {
        await axios.post('/users/logout');
        removeToken();
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});




