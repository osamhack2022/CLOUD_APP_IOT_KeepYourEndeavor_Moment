import React, { useState, } from 'react';
import { Button, Input } from 'semantic-ui-react';
import styled from 'styled-components';
import {useHistory} from 'react-router-dom';
import useSignin from '../../hooks/auth/useSignin';
import {Link} from 'react-router-dom';
const LoginBlock = styled.div`
    height: 100vh;
    
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    img{
        width: 400px;
        margin-bottom: 1.5rem;
    }
    .container{
        h1{
            color: #5A9AFA;
            font-weight: 100;
            span{
                font-weight: bold;
            }
            margin-bottom: 2rem;
        }
        margin-bottom: 5rem;
        margin-top: 1rem;
        box-shadow : 0px 0px 8px rgba(0, 0, 0, 0.125);
        //border: 3px solid rgba(0, 0, 0, 0.01);
        padding: 2rem;
        display: flex;
        flex-direction: column;
        //align-items: center;
        justify-content: center;
        width: 520px;
        .input{
            width: 100%;
            margin-bottom: 1rem;
            
        }
        .button{
            width: 100%;
            background: #5A9AFA;
            &:hover{
                background: #3C78D0;
            }
        }
    }
    .error-message{
        color: red;
        margin-bottom: 1rem;
    }
    .footer{
        text-align: center;
        margin-top: .75rem;
        a{
            color: #3C78D0;
        }
    }
`;

const Login = () => {
    const {onChange, handdleSignin, input, error} = useSignin();
    return (
        <LoginBlock>
            <img src='undraw_logic_re_nyb4.svg'></img>
            <div className='container'>
                <h1>Keep Your <span>Endeavor</span></h1>
             
                <Input placeholder='군번을 입력해주세요' name='id' onChange={onChange} ></Input>
                <Input placeholder='비밀번호를 입력해주세요' type='password' name='pwd' onChange={onChange} ></Input>
                <div className='error-message'>{error}</div>
                <Button secondary onClick={()=>handdleSignin(input)}>로그인</Button>
                <div className='footer'>계정이 없다면? <Link to='/register'>회원가입</Link></div>
            </div>
        </LoginBlock>
    )
}

export default Login;