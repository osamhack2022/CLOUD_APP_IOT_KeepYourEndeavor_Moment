import React, { useState } from 'react';
import Header from '../components/common/Header';
import Sidebar from '../components/common/Sidebar';
import Notice from '../components/main/Notice';

function NoticePage() {
    return (
        <>
            <Header></Header>
            <Sidebar>
                <Notice></Notice>
            </Sidebar>
        </>
    )
}

export default NoticePage;
