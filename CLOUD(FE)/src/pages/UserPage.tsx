import React, { useState } from 'react';
import Header from '../components/common/Header';
import Sidebar from '../components/common/Sidebar';
import User from '../components/user/User';

function MainPage() {
    return (
        <>
            <Header></Header>
            <Sidebar>
                <User></User>
            </Sidebar>
        </>
    )
}

export default MainPage;
