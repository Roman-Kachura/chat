import {api, UserType} from '../../api/api';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {wsApi} from '../../api/wsApi';

const initialState: ProfileInitialStateType = {
    error: null,
    hasEntered: false,
    user: {} as ProfileUserType
}

export const enterToChatThunk = createAsyncThunk('enter-to-chat', async (arg: { name: string }, thunkAPI) => {
    try {
        const user = await api.enterToChat(arg.name);
        thunkAPI.dispatch(setProfile(user.data));
    } catch (e) {
        throw e;
    }
});

export const exitFromChatThunk = createAsyncThunk('exit-from-chat', async (arg: { id: number, ws: WebSocket }, thunkAPI) => {
    try {
        await api.exitFromChat(arg.id);
        await wsApi.disconnect(arg.ws);
        thunkAPI.dispatch(deleteProfile());
    } catch (e) {
        throw e;
    }
});

export const getUserMessagesThunk = createAsyncThunk('get-messages', async (arg: { d: string }, thunkAPI) => {
    const data = JSON.parse(arg.d);
    if (data.messages) thunkAPI.dispatch(setMessages(data.messages));
    if (data.alert) {
        thunkAPI.dispatch(setAlert(data.alert));
    }
});

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setProfile: (state, action) => {
            state.hasEntered = true;
            state.user = action.payload;
            state.user.messages = [];
        },
        deleteProfile: (state) => {
            state.hasEntered = false;
            state.user = {} as ProfileUserType
        },
        setMessages: (state, action) => {
            state.user.messages = action.payload;
        },
        setAlert: (state, action) => {
            state.user.alert = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        }
    }
});

export const {setProfile, deleteProfile, setMessages, setAlert, setError} = profileSlice.actions;
export default profileSlice.reducer;

type ProfileInitialStateType = {
    hasEntered: boolean,
    user: ProfileUserType
    error: string | null
}

export type ProfileUserType = UserType & {
    messages: ResponseMessageType[]
    alert: ResponseMessageType | null
};
export type ResponseMessageType = {
    name: string
    id: number
    sender: number
    message: string
    theme: string
}