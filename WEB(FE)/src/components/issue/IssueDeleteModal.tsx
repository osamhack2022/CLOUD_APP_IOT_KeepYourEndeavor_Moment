import React from 'react';
import { Button, Checkbox, Form, Input, Modal } from 'semantic-ui-react';
import styled from 'styled-components';
const IssueDeleteModalBlock = styled.div`
    
`;

const IssueDeleteModal = ({open, onClickModal, onChangeInput, name}) => (
    <IssueDeleteModalBlock>
        <Modal
            onClose={() => onClickModal(name)}
            onOpen={() => onClickModal(name)}
            open={open}
        >
            <Modal.Header>삭제하시겠습니까?</Modal.Header>
            <Modal.Content>
                삭제한 시험은 복구할 수 없습니다.
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
                    onClick={() => onClickModal(name)}
                    negative 
                />
            </Modal.Actions>
        </Modal>
    </IssueDeleteModalBlock>
)

export default IssueDeleteModal;