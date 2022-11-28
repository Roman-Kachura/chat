import React from 'react';
import {AppRoutes} from './AppRoutes';
import {AppAlert} from './AppAlert';
import s from './style.module.css';

export const App: React.FC = () => {
    return (
        <div className={s.app}>
            <AppRoutes/>
            <AppAlert/>
        </div>
    )
}
