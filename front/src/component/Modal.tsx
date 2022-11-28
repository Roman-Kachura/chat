import * as React from 'react';
import {useState} from 'react';
import {Button, Modal, Paper} from '@material-ui/core';
import {RootState, useAppDispatch} from '../store/store';
import {sendMessageDataType} from '../store/reducers/usersReducer';
import {MessageType} from '../api/wsApi';
import {useSelector} from 'react-redux';
import {UserType} from '../api/api';
import s from './style.module.css';
import {setError} from '../store/reducers/profileReducer';
import {AppForm} from './AppForm';


export const AppModal: React.FC<{ sendMessageCallBack: (msg: sendMessageDataType) => void }> = ({sendMessageCallBack}) => {
    const [open, setOpen] = useState(false);
    const {id,name} = useSelector<RootState, UserType>(state => state.profile.user);
    const users = useSelector<RootState, UserType[]>(state => state.users.users);
    const dispatch = useAppDispatch();
    const sendMessage = (msg: MessageType) => {
        const u = users.find(f => f.name === msg.name);
        if (u) {
            const data: sendMessageDataType = {
                name,
                recipient: u.id,
                sender: id,
                theme: msg.theme,
                message: msg.message
            }
            sendMessageCallBack(data);
            handleClose();
        } else {
            dispatch(setError('User is not found'));
        }
    }
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button onClick={handleOpen}>Send message</Button>
            <Modal
                className={s.modal}
                open={open}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Paper className={s.modalContainer}>
                    <h2 id="parent-modal-title">Send message</h2>
                    <AppForm sendMessage={sendMessage}/>
                </Paper>
            </Modal>
        </div>
    );
}