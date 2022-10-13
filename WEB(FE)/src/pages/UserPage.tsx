import React, { useState } from 'react';
import Header from '../components/common/Header';
import Sidebar from '../components/common/Sidebar';

import Main from '../components/main/Main';
import User from '../components/main/User';

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
