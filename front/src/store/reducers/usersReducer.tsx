import {UserType} from '../../api/api';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {MessageType, wsApi} from '../../api/wsApi';
import {setMessages} from './profileReducer';

const initialState: ProfileInitialStateType = {
    users: []
}

export const sendMessageThunk = createAsyncThunk('send-message', async (arg: {
    msg: sendMessageDataType,
    ws: WebSocket
}, thunkAPI) => {
    wsApi.sendMessage(arg);
});

export const getUsersThunk = createAsyncThunk('get-users', async (arg: { d: string }, thunkAPI) => {
    const data = JSON.parse(arg.d);
    if (data.users) {
        thunkAPI.dispatch(setUsers(data.users));
    }
});

const usersReducers = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setUsers: (state, action) => {
            state.users = action.payload;
        },
    }
});

const {setUsers} = usersReducers.actions;
export default usersReducers.reducer;

type ProfileInitialStateType = {
    users: UserType[]
}

export type sendMessageDataType = {
    name: string
    recipient: number,
    sender: number
    theme: string,
    message: string
}