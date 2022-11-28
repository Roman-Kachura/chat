import React from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';
import {Login} from './Login';
import {Chat} from './Chat';
import {useSelector} from 'react-redux';
import {RootState} from '../store/store';

export const AppRoutes: React.FC = () => {
    const id = useSelector<RootState, number>(state => state.profile.user.id);
    return (
        <Routes>
            <Route path="/login" element={<Login/>}/>
            <Route path={`/chat/${id}`} element={<Chat/>}/>
            <Route path="/*" element={<Navigate to={`/chat/${id}`}/>}/>
        </Routes>
    )
}