import React, { useState } from 'react';
import Header from '../components/common/Header';
import Sidebar from '../components/common/Sidebar';

import Main from '../components/main/Main';

function MainPage() {
    return (
        <>
            <Header></Header>
            <Sidebar>
                <Main></Main>
            </Sidebar>
        </>
    )
}

export default MainPage;
