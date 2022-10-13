import React from 'react';
import styled from 'styled-components';
const NotFoundBlock = styled.div`
    display : flex;
    flex-direction: column;
    justify-content : center;
    align-items : center;
    height: 100vh;
    h1{
        color : white;
    }
    h3{
        color : white;
    }
    background : black;
`;

const NotFound = () => {
    return (
        <NotFoundBlock>
            <h1>404 NotFound</h1>
            <h3>없는 페이지 입니다!</h3>
            
        </NotFoundBlock>
    )
}

export default NotFound;