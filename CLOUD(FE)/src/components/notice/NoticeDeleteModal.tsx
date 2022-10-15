import React from 'react';
import { Button, Checkbox, Form, Input, Modal } from 'semantic-ui-react';
import styled from 'styled-components';
const NoticeDeleteModalBlock = styled.div`
    
`;

const NoticeDeleteModal = ({open, onClickModal, handleDeleteNotice, name, id}) => (
    <NoticeDeleteModalBlock>
        <Modal
            onClose={() => onClickModal(name)}
            onOpen={() => onClickModal(name)}
            open={open}
        >
            <Modal.Header>삭제하시겠습니까?</Modal.Header>
            <Modal.Content>
                삭제한 일정은 복구할 수 없습니다.
            </Modal.Content>
            <Modal.Actions>
                <Button
                    content="취소하기"
                    onClick={() => onClickModal(name)} 
                    secondary
                />
                <Button
                    content="삭제하기"
                    labelPosition='right'
                    icon='trash alternate'
                    onClick={() => handleDeleteNotice(id)}
                    negative 
                />
            </Modal.Actions>
        </Modal>
    </NoticeDeleteModalBlock>
)

export default NoticeDeleteModal;