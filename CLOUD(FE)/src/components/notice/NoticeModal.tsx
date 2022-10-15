import React from 'react';
import { Button, Checkbox, Dropdown, Form, Input, Modal } from 'semantic-ui-react';
import styled from 'styled-components';
import { issueType } from '../../hooks/issue/useIssue';
const NoticeModalBlock = styled.div`

`;

const NoticeModal = ({open, onClickModal, onChangeInput, name, handleCreateNotice, input, issues}) => {
    const options = issues.map((issue: issueType) => {
        const {id, subject} = issue;
        return { 
            key: id, 
            text: subject, 
            value: id 
        };
    });

    return (
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
                            <input placeholder='일정 이름' name="title" onChange={onChangeInput} />
                        </Form.Field>
                        <Form.Field>
                            <label>과목 선택</label>
                            <Dropdown clearable onChange={onChangeInput} options={options} name="issue_id" selection />
                        </Form.Field>
                        <Form.Field>
                            <label>접수 마감일</label>
                            <input placeholder='일정 이름' name="apply_date" onChange={onChangeInput} type='date' />
                        </Form.Field>
                        <Form.Field>
                            <label>평가일</label>
                            <input placeholder='일정 이름' name="test_date" onChange={onChangeInput} type='date' />
                        </Form.Field>
                        <Form.Field>
                            <label>평가 상세정보</label>
                            <textarea placeholder='평가 상세정보' name="description" onChange={onChangeInput}/>
                        </Form.Field>
                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button
                        content="추가하기"
                        labelPosition='right'
                        icon='checkmark'
                        onClick={() => handleCreateNotice(input)}
                        positive />
                </Modal.Actions>
            </Modal>
        </NoticeModalBlock>
    )
}

export default NoticeModal;