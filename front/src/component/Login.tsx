import React, {useState, KeyboardEvent} from 'react';
import {Box, Button, Grid, Paper, TextField} from '@material-ui/core';
import {RootState, useAppDispatch} from '../store/store';
import {enterToChatThunk} from '../store/reducers/profileReducer';
import {useSelector} from 'react-redux';
import {Navigate} from 'react-router-dom';
import {Header} from './Header';

export const Login: React.FC = () => {
    const [name, setName] = useState('');
    const hasEntered = useSelector<RootState, boolean>(state => state.profile.hasEntered);
    const dispatch = useAppDispatch();
    const enterToChat = () => dispatch(enterToChatThunk({name}));
    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'enter' && name.length) enterToChat();
    };
    if (hasEntered) return <Navigate to="/chat"/>
    return (
        <>
            <Header/>
            <Grid
                container
                alignItems="center"
                justifyContent="center"
                direction="column"
                style={{width: '100%', height: '100%'}}
            >
                <Paper>
                    <Box style={{padding: '30px', width: '300px'}}>
                        <TextField
                            style={{width: '100%', marginBottom: '20px'}}
                            variant="outlined"
                            label="Your name"
                            onChange={(e) => setName(e.currentTarget.value)}
                            onKeyDown={onKeyDownHandler}
                        />
                        <Button
                            variant="outlined"
                            color="primary"
                            onClick={enterToChat}
                        >
                            Enter
                        </Button>
                    </Box>
                </Paper>
            </Grid>
        </>
    )
}