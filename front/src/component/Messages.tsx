import React, {MouseEvent, useState} from 'react';
import {ResponseMessageType} from '../store/reducers/profileReducer';
import {Grid, Paper} from '@material-ui/core';
import {AccountCircle} from '@material-ui/icons';
import s from './style.module.css';

export const Messages: React.FC<{ messages: ResponseMessageType[] }> = ({messages}) => {
    return (
        <div className={s.messages}>
            {messages.map(m => <Message key={m.id} message={m.message} name={m.name} theme={m.theme}/>)}
        </div>
    )
}

export const Message: React.FC<MessagePropsType> = ({name, theme, message}) => {
    const [showText, setShowText] = useState(false);
    const onClickHandler = (e: MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault()
        setShowText(!showText);
    }
    return (
        <Paper className={s.message} style={{background: 'azure'}}>
            <Grid container className={s.messageContainer}>
                <div className={s.iconBlock}>
                    <AccountCircle className={s.icon}/>
                </div>
                <div>
                    <h3 className={s.name}>{name}</h3>
                    <div className={s.theme}>
                        <i><b>Theme</b>: <a href="" onClick={onClickHandler}>{theme}</a></i>
                    </div>
                </div>
            </Grid>
            {
                showText && <div>
                    <h4 className={s.messageTitle}>-- Message --</h4>
                    <div className={s.text}>{message}</div>
                </div>
            }
        </Paper>
    )
}

type MessagePropsType = {
    name: string,
    theme: string,
    message: string
}