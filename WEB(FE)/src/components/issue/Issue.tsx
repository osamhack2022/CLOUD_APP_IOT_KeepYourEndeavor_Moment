import React from 'react';
import { Button, Table } from 'semantic-ui-react';
import styled from 'styled-components';
import useIssue, { issueType } from '../../hooks/issue/useIssue';
import useModal from '../../hooks/issue/useModal';
import IssueModal from './issueModal';
const IssueBlock = styled.div`
    padding: 2rem;
    .sub-header{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
`;

const Issue = () => {

    const {issues, onChangeInput } = useIssue();
    const {open, setOpen, onClickOpenModal} = useModal();
    const issueList = issues.map((issue: issueType) => {
        const {type, subject, created_at} = issue;
        return (
            <Table.Row>
                <Table.Cell>{subject}</Table.Cell>
                <Table.Cell>{created_at}</Table.Cell>
            </Table.Row>
        )
    })
    return (
        <IssueBlock>
            <div className='sub-header'>
                <h1>시험관리</h1>
                <Button primary onClick={onClickOpenModal}>시험 추가</Button>
            </div>
             <Table celled>
                <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>이름</Table.HeaderCell>
                    <Table.HeaderCell>생성일</Table.HeaderCell>
                </Table.Row>
                </Table.Header>

                <Table.Body>
                    {issueList}
                </Table.Body>
            </Table>
            <IssueModal open={open} setOpen={setOpen} onChangeInput={onChangeInput}></IssueModal>
        </IssueBlock>
    )
}

export default Issue;