import React from 'react';
import styled from 'styled-components';
import Responsive from './Responsive';
import {Link} from 'react-router-dom';
import { Dropdown, Icon, Button } from 'semantic-ui-react'
import { useRouter } from '../../hooks/common/useRouter';
import home from "../../img/ic_home_black.png";
declare module "*.png";

const HeaderBlock = styled.div`
    position : fixed;
    width: 100%;
    z-index : 100;
    box-shadow : 0px 2px 4px rgba(0, 0, 0, 0.08);
    background :rgb(158, 158, 158);
`;

const Wrapper = styled(Responsive)`
    height: 4rem;
    display : flex;
    flex-direction: row;
    align-items: center;
    justify-content : space-between;
    color: white;
    a{
        color: white;
        text-decoration: none;
    }
`
const Spacer = styled.div`
    height : 4rem;
`;

function Header({setVisible}) {
    const router = useRouter()
    return (
        <>
        <HeaderBlock>
            <Wrapper>
            <Icon name='align justify' color='black' onClick={()=>setVisible(true)}></Icon>
            <Link to='/'>
                <img src={home}/>
            </Link>
            </Wrapper>
        </HeaderBlock>
        <Spacer/>
        </>
    )
}

export default Header;
