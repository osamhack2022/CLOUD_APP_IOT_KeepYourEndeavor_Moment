import React from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette'
import Button from './Button';
export const AskModalBlock = styled.div`
    width: 320px;
    background : white;
    padding : 1.5rem;
    border-radius: 4px;
    box-shadow : 0px 0px 8px rgba(0, 0, 0, 0.125);
    h3{
        margin-top : 0;
        padding-bottom :.6rem;
        margin-bottom : .6rem;
        border-bottom : 1px solid ${palette.gray[4]}
    }
    p {
        margin-bottom : 3rem;
    }
    .buttons{
        display : flex;
        justify-content : flex-end;
    }
`;

export const FullScreen = styled.div`
    position : fixed;
    z-index : 30;
    top : 0;
    left : 0;
    width : 100%;
    height : 100%;
    background : rgba(0, 0, 0, 0.25);
    display : flex;
    justify-content : center;
    align-items : center;
`;

const StyledButton = styled(Button)`
    height: 2rem;
    & + & {
        margin-left : 0.5rem;
    }
`
const AskModal = ({
    visible,
    title,
    desc,
    confirmText = "확인",
    cancelText = "취소",
    onConfirm,
    onCancel,
    type
}) => {
    if (!visible) return null;
    return (
        <FullScreen>
            <AskModalBlock>
                <h3>{title}</h3>
                <p>{desc}</p>
                <div className="buttons">
                    {type === "remove" && <StyledButton onClick={onCancel}>{cancelText}</StyledButton> }
                    <StyledButton cyan onClick={() => onConfirm()}>
                        {confirmText}
                    </StyledButton>     
                </div>
            </AskModalBlock>
        </FullScreen>
    )
}

export default AskModal;