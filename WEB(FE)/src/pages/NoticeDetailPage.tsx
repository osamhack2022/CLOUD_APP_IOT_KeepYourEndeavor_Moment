import React, { useState } from 'react';
import Header from '../components/common/Header';
import Sidebar from '../components/common/Sidebar';
import NoticeDetail from '../components/notice/NoticeDetail';

function NoticeDetailPage() {
    return (
        <>
            <Header></Header>
            <Sidebar>
                <NoticeDetail></NoticeDetail>
            </Sidebar>
        </>
    )
}

export default NoticeDetailPage;
