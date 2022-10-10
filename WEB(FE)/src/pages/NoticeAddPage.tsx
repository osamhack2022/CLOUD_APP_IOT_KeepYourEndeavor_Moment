import React, { useState } from 'react';
import Header from '../components/common/Header';
import Sidebar from '../components/common/Sidebar';
import NoticeAdd from '../components/main/NoticeAdd';

function MainPage() {
    return (
        <>
            <Header></Header>
            <Sidebar>
                <NoticeAdd></NoticeAdd>
            </Sidebar>
        </>
    )
}

export default MainPage;
