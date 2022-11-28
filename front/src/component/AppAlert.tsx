import * as React from 'react';
import {Alert, Snackbar} from '@mui/material';
import {RootState, useAppDispatch} from '../store/store';
import {useSelector} from 'react-redux';
import {ResponseMessageType, setAlert, setError} from '../store/reducers/profileReducer';

export const AppAlert: React.FC = () => {
    const dispatch = useAppDispatch();
    const alert = useSelector<RootState, ResponseMessageType | null>(state => state.profile.user.alert);
    const error = useSelector<RootState, string | null>(state => state.profile.error);

    const handleClose = () => {
        dispatch(setAlert(null));
    };

    const errorCloseHandler = () => {
        dispatch(setError(null));
    }

    return (
        <div>
            <Snackbar
                open={!!alert}
                onClose={handleClose}
                message={`Name: ${alert?.name}, Theme:${alert?.message}`}
                key={'left'}
            />
            <Snackbar open={!!error} autoHideDuration={6000} onClose={errorCloseHandler}>
                <Alert onClose={handleClose} severity="error" sx={{width: '100%'}}>
                    {error}
                </Alert>
            </Snackbar>
        </div>
    );
}