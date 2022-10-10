import React from 'react';
import { Button, Checkbox, Form, Input, Modal } from 'semantic-ui-react';
import styled from 'styled-components';
const IssueModalBlock = styled.div`
    
`;

const IssueModal = ({open, setOpen, onChangeInput}) => (
    
    <IssueModalBlock>
        <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
        >
            <Modal.Header>시험추가</Modal.Header>
            <Modal.Content>
                <Form>
                <h3>과목정보</h3>
                    <Form.Field>
                        <label>과목 이름</label>
                        <input placeholder='과목이름' onChange={onChangeInput} />
                    </Form.Field>
                    <Form.Field>
                    <Form.Group inline>
                        <label>과목 형식</label>
                        <Form.Radio
                            label='강연'
                            value='sm'
                            //checked={value === 'sm'}
                            //onChange={this.handleChange}
                        />
                        <Form.Radio
                            label='평가'
                            value='md'
                            //checked={value === 'md'}
                            //onChange={this.handleChange}
                        />
                        <Form.Radio
                            label='활동'
                            value='lg'
                            //checked={value === 'lg'}
                            //onChange={this.handleChange}
                        />
                        </Form.Group>
                    </Form.Field>
                    <Form.Field>
                        <Checkbox label='필수응시 과목' />
                    </Form.Field>

                    <h3>평가기준</h3>
                    <Form.Field>
                        <label>특급</label>
                        <input placeholder='85' type='number' />
                    </Form.Field>
                    <Form.Field>
                        <label>1급</label>
                        <input placeholder='70' type='number' />
                    </Form.Field>
                    <Form.Field>
                        <label>2급</label>
                        <input placeholder='60' type='number' />
                    </Form.Field>
                    <Form.Field>
                        <label>3급</label>
                        <input placeholder='50'type='number' />
                    </Form.Field>
                </Form>
            </Modal.Content>
            <Modal.Actions>
                <Button
                    content="추가하기"
                    labelPosition='right'
                    icon='checkmark'
                    onClick={() => setOpen(false)}
                    positive />
            </Modal.Actions>
        </Modal>
    </IssueModalBlock>
)

export default IssueModal;