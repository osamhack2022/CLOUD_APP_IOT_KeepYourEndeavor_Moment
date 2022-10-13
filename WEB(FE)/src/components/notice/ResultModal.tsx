import React from 'react';
import { Button, Checkbox, Dropdown, Form, Input, Modal, Progress } from 'semantic-ui-react';
import styled from 'styled-components';
const ResultModalBlock = styled.div`

`;
const options = [
    { key: 1, text: '체력 측정', value: 1 },
    { key: 2, text: '화생방 평가', value: "화생방 평가" },
    { key: 3, text: '경계 평가', value: 3 },
    { key: 3, text: '구급법 평가', value: 3 },
    { key: 3, text: '정신전력 평가', value: 3 },
    { key: 3, text: '사격 평가', value: 3 },
  ]
const ResultModal = ({open, onClickModal, onChangeInput, input, name}) => (
    
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
                        <input placeholder='일정 이름' value='성서윤' disabled />
                    </Form.Field>
                    <Form.Field>
                        <label>응시 과목</label>
                        <Dropdown options={options} value="화생방 평가" disabled selection />
                    </Form.Field>
                    <Form.Field>
                        <label>점수</label>
                        <input placeholder='점수' defaultValue='0' name='result' onChange={onChangeInput} />
                    </Form.Field>
                    <Form.Field>
                        <Progress value={input.result} success total='100' progress='ratio' >Label</Progress>
                    </Form.Field>
                </Form>
            </Modal.Content>
            <Modal.Actions>
                <Button
                    content="등록하기"
                    labelPosition='right'
                    icon="lock"
                    onClick={() => onClickModal(name)}
                    positive />
            </Modal.Actions>
        </Modal>
    </ResultModalBlock>
)

export default ResultModal;