import React from 'react';
import styled from 'styled-components';

const ResponsiveBlock = styled.div`
    padding-left : 1rem;
    padding-right : 1rem;
    width: 360px;
    margin : 0 auto;
`;

const Responsive = ({children, ...rest}) => {
    return (
        <ResponsiveBlock {...rest}>{children}</ResponsiveBlock>
    )
}

export default Responsive;