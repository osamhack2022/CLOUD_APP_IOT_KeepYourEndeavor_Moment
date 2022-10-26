import React from 'react';
import { Button, Checkbox, Form, Input, Modal } from 'semantic-ui-react';
import styled from 'styled-components';
import useAddIssue from '../../hooks/issue/useAddIssue';
const IssueModalBlock = styled.div`
    
`;

const IssueModal = ({open, onClickModal, name, getIssueList}) => {
    const {input, onChangeInput, handleCreateIssue} = useAddIssue();

    const grandeType = (
        <>
            <p>4단계로 등급을 나눠서 측정하게됩니다. 3급 이하의 점수를 받으면 불합격 처리됩니다.</p>
            <Form.Field>
                <label>특급</label>
                <input placeholder='85' onChange={onChangeInput} type='text' name='s'/>
            </Form.Field>
            <Form.Field>
                <label>1급</label>
                <input placeholder='70' onChange={onChangeInput} type='text' name='a'/>
            </Form.Field>
            <Form.Field>
                <label>2급</label>
                <input placeholder='60' onChange={onChangeInput} type='text' name='b'/>
            </Form.Field>
            <Form.Field>
                <label>3급</label>
                <input placeholder='50'onChange={onChangeInput} type='text' name='c'/>
            </Form.Field>
        </>
    )

    const pnpType = (
        <>
            <p>PASS or No PASS 로 나눠서 측정합니다.</p>
        </>
    )

    return (
        <IssueModalBlock>
            <Modal
                onClose={() => onClickModal(name)}
                onOpen={() => onClickModal(name)}
                open={open}
            >
                <Modal.Header>자격 추가</Modal.Header>
                <Modal.Content>
                    <Form>
                    <h3>자격 정보</h3>
                        <Form.Field>
                            <label>자격 이름</label>
                            <input placeholder='과목이름' name='subject' onChange={onChangeInput} />
                        </Form.Field>
                        <Form.Field>
                        <Form.Group inline>
                            <label>자격 형식</label>
                            <Form.Radio
                                label='강연'
                                value='강연'
                                name='type'
                                checked={input.type === '강연'}
                                onChange={onChangeInput}
                            />
                            <Form.Radio
                                label='측정시험'
                                value='측정시험'
                                name='type'
                                checked={input.type === '측정시험'}
                                onChange={onChangeInput}
                            />
                            </Form.Group>
                        </Form.Field>
                        <Form.Field>
                            <Checkbox label='필수응시 자격' name="mandatory" onChange={onChangeInput} />
                        </Form.Field>

                        <h3>평가기준</h3>
                        {
                            input.type === '측정시험' ? grandeType : input.type === '강연' ? pnpType : <p>아직 기준을 선택하지 않았습니다.</p>
                        }
                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button
                        content="추가하기"
                        labelPosition='right'
                        icon='checkmark'
                        onClick={async() => {
                            await handleCreateIssue(input);
                            onClickModal(name);
                            await getIssueList();
                        }}
                        positive />
                </Modal.Actions>
            </Modal>
        </IssueModalBlock>
    )
}

export default IssueModal;