import React, { useState } from 'react';
import Header from '../components/common/Header';
import Sidebar from '../components/common/Sidebar';
import Issue from '../components/issue/Issue';

function IssuePage() {
    return (
        <>
            <Header></Header>
            <Sidebar>
                <Issue></Issue>
            </Sidebar>
        </>
    )
}

export default IssuePage;
