import React from 'react';
import { Table } from 'semantic-ui-react';
import styled from 'styled-components';
const NoticeBlock = styled.div`
    padding: 2rem;
`;

const Notice = () => {
    return (
        <NoticeBlock>
            <h1>일정관리</h1>
             <Table celled>
                <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>이름</Table.HeaderCell>
                    <Table.HeaderCell>작성일</Table.HeaderCell>
                    <Table.HeaderCell>시험일</Table.HeaderCell>
                    <Table.HeaderCell>설명</Table.HeaderCell>
                </Table.Row>
                </Table.Header>

                <Table.Body>
                    
                </Table.Body>
            </Table>
        </NoticeBlock>
    )
}

export default Notice;