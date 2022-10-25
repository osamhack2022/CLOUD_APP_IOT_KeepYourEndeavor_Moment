import React from 'react';
import { Button, Checkbox, Dropdown, Form, Input, Modal, Progress } from 'semantic-ui-react';
import styled from 'styled-components';
const ResultModalBlock = styled.div`

`;
const ResultModal = ({result, open, onClickModal, onChangeInput, input, name, createBlock, user}) => {
    
    return (
    <ResultModalBlock>
        <Modal
            onClose={() => onClickModal(name)}
            onOpen={() => onClickModal(name)}
            open={open}
        >
            <Modal.Header>시험결과 등록</Modal.Header>
            <Modal.Content>
                <Form>
                     <Form.Field>
                        <label>응시자 이름</label>
                        <input placeholder='일정 이름' value='강은솔' disabled />
                    </Form.Field>
                    <Form.Field>
                        <label>점수</label>
                        <input placeholder='점수' defaultValue='0' name='record' onChange={onChangeInput} />
                    </Form.Field>
                    <Form.Field>
                        <Progress value={input.record} color={result === 0 ? 'red' : result === 1 ? "yellow" : result === 2 ? "blue" : "green"  } total='100' progress='ratio' >{result === 0 ? '불합격' : result === 1 ? "2급" : result === 2 ? "1급" : "특급" }</Progress>
                    </Form.Field>
                </Form>
            </Modal.Content>
            <Modal.Actions>
                <Button
                    content="등록하기"
                    labelPosition='right'
                    icon="lock"
                    onClick={() => createBlock(input, user)}
                    positive />
            </Modal.Actions>
        </Modal>
    </ResultModalBlock>);
}

export default ResultModal;