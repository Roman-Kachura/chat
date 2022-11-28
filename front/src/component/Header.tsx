import React from 'react';
import {useSelector} from 'react-redux';
import {RootState, useAppDispatch} from '../store/store';
import {AppBar, Button, Grid, Toolbar} from '@material-ui/core';
import {exitFromChatThunk} from '../store/reducers/profileReducer';
import {AccountCircle} from '@material-ui/icons';

export const Header: React.FC<{ ws?: WebSocket }> = ({ws}) => {
    const hasEntered = useSelector<RootState, boolean>(state => state.profile.hasEntered);
    const id = useSelector<RootState, number>(state => state.profile.user.id);
    const name = useSelector<RootState, string>(state => state.profile.user.name);
    const dispatch = useAppDispatch();
    const exitFromChat = () => {
        if (ws) {
            dispatch(exitFromChatThunk({id,ws}));
        }
    }
    return (
        <AppBar position="static" color="primary" style={{height: '10vh', width: '100%'}}>
            <Toolbar>
                {
                    hasEntered &&
                    <Grid container alignItems="center" justifyContent="flex-start">
                        <div style={{display: 'flex', justifyContent: 'center', marginRight: '20px'}}>
                            <AccountCircle style={{marginRight: '10px'}}/>
                            <div>{name}</div>
                        </div>
                        <Button onClick={exitFromChat} color="inherit">Logout</Button>
                    </Grid>
                }
            </Toolbar>
        </AppBar>
    )
}