import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {RootState, useAppDispatch} from '../store/store';
import {Navigate} from 'react-router-dom';
import {Grid} from '@material-ui/core';
import {AppModal} from './Modal';
import {getUsersThunk, sendMessageDataType, sendMessageThunk} from '../store/reducers/usersReducer';
import {getUserMessagesThunk, ProfileUserType} from '../store/reducers/profileReducer';
import {wsApi} from '../api/wsApi';
import {Header} from './Header';
import {Messages} from './Messages';
import s from './style.module.css';

export const Chat: React.FC = () => {
    const [webSocket, setWebSocket] = useState<WebSocket | null>(null);
    const hasEntered = useSelector<RootState, boolean>(state => state.profile.hasEntered);
    const {id, messages,alert} = useSelector<RootState, ProfileUserType>(state => state.profile.user);
    const dispatch = useAppDispatch();
    const connect = (webSocket: WebSocket, id: number) => {
        wsApi.connect(webSocket, id);
        wsApi.getMessages(id, webSocket);
    }
    const onMessage = (d: string) => {
        const msg = JSON.parse(d);
        dispatch(getUsersThunk({d}));
        dispatch(getUserMessagesThunk({d}));
    }
    const closeHandler = () => {
        setTimeout(() => {
            setWebSocket(wsApi.createSocket(id));
        }, 3000)
    }
    const sendMessage = (msg: sendMessageDataType) => {
        webSocket && dispatch(sendMessageThunk({msg, ws: webSocket}));
    }
    useEffect(() => {
        if (webSocket !== null) webSocket.removeEventListener('close', closeHandler);
        const ws = wsApi.createSocket(id);
        ws.addEventListener('close', closeHandler);
        setWebSocket(ws);
        return () => {
            ws.removeEventListener('close', closeHandler)
        }
    }, []);

    useEffect(() => {
        const ws = webSocket;
        if (ws) {
            const c = () => connect(ws, id);
            const o = (e: MessageEvent) => {
                onMessage(e.data)
            };
            ws.addEventListener('open', c);
            ws.addEventListener('message', o);
            return () => {
                ws.removeEventListener('open', c);
                ws.removeEventListener('message', o);
            }
        }
    }, [webSocket]);

    if (!hasEntered) return <Navigate to="/login"/>
    return (
        <>
            {!!webSocket && <Header ws={webSocket}/>}

            <Grid container className={s.chat}>
                <Grid item className={s.chatItem}>
                    <AppModal sendMessageCallBack={sendMessage}/>
                    <Messages messages={messages}/>
                </Grid>
            </Grid>
        </>
    )
};

