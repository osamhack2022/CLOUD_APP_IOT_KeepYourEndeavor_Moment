import React, { useState } from 'react';
import Header from '../components/common/Header';
import {Link} from 'react-router-dom';
import {
    Checkbox,
    Grid,
    Icon,
    Image,
    Menu,
    Segment,
    Sidebar,
  } from 'semantic-ui-react'
import Auth from '../components/main/Auth';

function AuthPage() {
    return (
        <div>
            <Auth></Auth>
        </div>
    )
}

export default AuthPage;
