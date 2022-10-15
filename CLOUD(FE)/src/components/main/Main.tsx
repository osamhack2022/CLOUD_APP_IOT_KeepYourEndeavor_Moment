import React from 'react';
import styled from 'styled-components';

import {
    Button,
    Input,
    Pagination,
    Table,
  } from 'semantic-ui-react'
import {Redirect} from 'react-router-dom';
import useAuth from '../../hooks/auth/useSignin';

const MainBlock = styled.div`
    background-color: rgba(0, 0, 0, 0.03);
    
    header{
        padding: 2rem;
        background-color: white;
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        img{
            width: 40rem;
        }
    }
    .card-group{
        background-color: white;
        display: flex;
        flex-direction: row;
        margin-top: 1.5rem;
        padding: 2rem;
        margin-bottom: 1.5rem;
        .card{
            margin-right: 1.5rem;
            padding: 2.5rem;
            padding-bottom: 2.2rem;
            box-shadow : 0px 0px 8px rgba(0, 0, 0, 0.125);
            font-size: 3rem;
            font-weight: bold;
            min-width: 15rem;
            span{
                font-weight: lighter;
                font-size: 1.5rem;
            }
        }
        
    }
    .list{
        padding: 2rem;
        background-color: white;
    }
    footer{
        background-color: white;
        display: flex;
        justify-content: center;
    }
    
`;
const Main = () => {
    const {handleLogout} = useAuth();

    if(!localStorage.getItem('token')){
        return (<Redirect to='/login'></Redirect>)
    }

    return (
        <MainBlock>
            <div>
                
            </div>      
        </MainBlock>
    )
}

export default Main;