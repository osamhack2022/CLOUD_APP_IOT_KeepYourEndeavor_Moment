import React, { useState, useEffect } from 'react';
import styled, {css} from 'styled-components';
import { NavLink } from 'react-router-dom';
import { useRouter } from '../../hooks/common/useRouter';
import useSidebar from '../../hooks/sidebar/useSidebar';


const SidebarBlock = styled.div`
    
    /* position : a; */
    display: flex;
    flex-direction: row;
    
    .sidebar{
        position : fixed;
        height: calc(100vh - 4rem);
        border : 1px solid black;
        min-width: 165px;
        /* margin-right : 4rem; */
        background : rgb(64, 64, 64);
        color: white;
        padding : 1rem;
        padding-top: 0rem;
        padding-bottom : 0rem;
        font-weight : normal;
        padding-top : 1rem;
    }
    .main{
        margin-left: 165px;
    }
`;

const Nav = styled.div`
    padding-top : .5rem;
    padding-bottom : .5rem;
    .main-nav{
        font-size : 1.025rem;
        cursor: pointer;
        color: rgb(255, 255, 255, 0.85);
        text-decoration: none;
        ${props=>
            props.select && 
            css`
                font-weight : bold;
                color: white;
            `
        }
        &:hover{
            font-weight : bold;
            color: white;
        }
        
    }
    .sub-nav{
        padding-left : 1rem;
        padding-top : .25rem;
        /* padding-bottom : .25rem; */
        display : none;
        ${props=>
            props.select && 
            css`
                display : block;
            `
        }
        
    }
`
const NavList = styled(NavLink)`
    display: block;
    text-decoration: none;
    color: rgb(255, 255, 255, 0.65);
    cursor: pointer;
    font-size : 1.025rem;
    padding-top : .5rem;
    padding-bottom : .5rem;
    list-style : none;
    ${props=>
        props.subselect && 
        css`
            /* font-weight : bold; */
            color: white;
        `
    }
    &:hover{
        /* font-weight : bold; */
        color: white;
    }
`

const Sidebar = ({children}) => {
    
    const {select, subSelect, setSubSelect, chagneSelect} = useSidebar();
    return (
        <SidebarBlock>
            <div className="sidebar">
                <Nav select={select === 1 ? true : false } >
                    <NavLink to='/data/analysis' className="main-nav" onClick={()=>{chagneSelect(1)}}>
                        - 통계 데이터
                    </NavLink>
                    <div className="sub-nav" > 
                        <NavList to='/data/analysis' onClick={()=>{setSubSelect(1)}} subselect={subSelect === 1 ? 1 : undefined }>
                            - 분석 데이터
                        </NavList>
                        <NavList to='/data/country' onClick={()=>{setSubSelect(2)}} subselect={subSelect === 2 ? 2 : undefined }>
                            - 국가별 데이터
                        </NavList>
                        <NavList to='/data/age' onClick={()=>{setSubSelect(3)}} subselect={subSelect === 3 ? 3 : undefined }>
                            - 연령별 데이터
                        </NavList>
                    </div>
                </Nav>
                <Nav select={select === 2 ? true : false }>
                    <NavLink to='/user' className="main-nav" onClick={()=>{chagneSelect(2)}}>
                        - 회원 데이터
                    </NavLink>
                </Nav>
                <Nav select={select === 3 ? true : false }>
                    <NavLink to='/tooth/list' className="main-nav" onClick={()=>{chagneSelect(3)}}>
                        - 치약관리
                    </NavLink>
                    <div className="sub-nav" > 
                        <NavList to='/tooth/list'onClick={()=>{setSubSelect(1)}} subselect={subSelect === 1 ? 1 : undefined }>
                            - 치약 목록
                        </NavList>
                        <NavList to='/tooth/bundle' onClick={()=>{setSubSelect(2)}} subselect={subSelect === 2 ? 2 : undefined }>
                            - 치약 일괄등록
                        </NavList>
                    </div>
                </Nav>
                <Nav select={select === 4 ? true : false }>
                    <NavLink to='/info' className="main-nav" onClick={()=>{chagneSelect(4)}}>
                        - 구강관리 정보
                    </NavLink>
                </Nav>
                <Nav select={select === 5 ? true : false }>
                    <NavLink to='/notice' className="main-nav" onClick={()=>{chagneSelect(5)}}>
                        - 공지사항
                    </NavLink>
                </Nav>
            </div>
            <div className="main">
                {children}
            </div>
        </SidebarBlock>
    )
}

export default Sidebar;