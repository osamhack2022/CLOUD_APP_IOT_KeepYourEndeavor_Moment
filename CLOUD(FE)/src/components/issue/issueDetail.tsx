import moment from 'moment';
import React from 'react';
import { Button, Dimmer, Icon, Label, Loader, Pagination, Table } from 'semantic-ui-react';
import styled from 'styled-components';
const IssueDetailBlock = styled.div`
    padding: 2rem;
    header{
        display: flex;
        align-items: flex-start;
        flex-direction: column;
        justify-content: flex-start;
    }
    footer{
        display: flex;
        justify-content: center;
    }
    .member-list-none{
        font-size: 1.25rem;
        color: #bcbcbc;
        font-weight: bold;
        width: 100%;
        margin-top: 1.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
    }
`;

const IssueDetail = () => {
    //const {open, onClickModal, modals} = useModal();
    //const {onChangeInput, input, notice, loading, members} = useNoticeDetail();


    return (
        <IssueDetailBlock>
            <header>
                <h1></h1>
                <Label color="blue"></Label>
            </header>
            <Table definition>
                <Table.Body>
                    <Table.Row>
                        <Table.Cell width={2}>담당 간부</Table.Cell>
                        <Table.Cell></Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>평가 일시</Table.Cell>
                        <Table.Cell></Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>시험 설명</Table.Cell>
                        <Table.Cell></Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table>
        </IssueDetailBlock>
    )
}

export default IssueDetail;