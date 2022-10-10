import React, { useState } from 'react';
import Header from '../components/common/Header';
import Sidebar from '../components/common/Sidebar';
import IssueAdd from '../components/issue/IssueAdd';

function IssueAddPage() {
    return (
        <>
            <Header></Header>
            <Sidebar>
                <IssueAdd></IssueAdd>
            </Sidebar>
        </>
    )
}

export default IssueAddPage;
