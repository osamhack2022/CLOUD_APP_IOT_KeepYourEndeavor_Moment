import React from 'react';
import { Button, Checkbox, Dropdown, Form, Input, Modal } from 'semantic-ui-react';
import styled from 'styled-components';
const NoticeModalBlock = styled.div`

`;
const options = [
    { key: 1, text: '체력 측정', value: 1 },
    { key: 2, text: '화생방 평가', value: 2 },
    { key: 3, text: '경계 평가', value: 3 },
    { key: 3, text: '구급법 평가', value: 3 },
    { key: 3, text: '정신전력 평가', value: 3 },
    { key: 3, text: '사격 평가', value: 3 },
  ]
const NoticeModal = ({open, onClickModal, onChangeInput, name}) => (
    
    <NoticeModalBlock>
        <Modal
            onClose={() => onClickModal(name)}
            onOpen={() => onClickModal(name)}
            open={open}
        >
            <Modal.Header>일정 추가</Modal.Header>
            <Modal.Content>
                <Form>
                     <Form.Field>
                        <label>일정 이름</label>
                        <input placeholder='일정 이름' onChange={onChangeInput} />
                    </Form.Field>
                    <Form.Field>
                        <label>과목 선택</label>
                        <Dropdown clearable options={options} selection />
                    </Form.Field>
                    <Form.Field>
                        <label>평가일정</label>
                        <input placeholder='일정 이름' onChange={onChangeInput} type='date' />
                    </Form.Field>
                    <Form.Field>
                        <label>평가 상세정보</label>
                        <textarea placeholder='평가 상세정보' onChange={onChangeInput}/>
                    </Form.Field>
                </Form>
            </Modal.Content>
            <Modal.Actions>
                <Button
                    content="추가하기"
                    labelPosition='right'
                    icon='checkmark'
                    onClick={() => onClickModal(name)}
                    positive />
            </Modal.Actions>
        </Modal>
    </NoticeModalBlock>
)

export default NoticeModal;