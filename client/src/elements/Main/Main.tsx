import React, { Children, useState } from 'react';
import { ReactNode } from 'react';
import Topbar from '../Topbar/Topbar'; 
import Header from '../Header/Header';
import style from "./Main.module.css"

interface Props {
    children: ReactNode;
}

const Main: React.FC<Props> = ({ children }) => {
    return (
        <div className={`bg-light ${style.mainScroll}`} >
            <Topbar />
            <Header />
            {children}
        </div>
    );
};

export default Main;
