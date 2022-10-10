import React from 'react';
import { Table } from 'semantic-ui-react';
import styled from 'styled-components';
import useNotice from '../../hooks/notice/useNotice';
import { noticeType } from '../../hooks/notice/useNotice';
const NoticeBlock = styled.div`
    padding: 2rem;
`;

const Notice = () => {

    const {notices} = useNotice();
    const noticeList = notices.map((notice: noticeType) => {
        const {name, apply_date, test_date, description} = notice;
        return (
            <Table.Row>
                <Table.Cell>{name}</Table.Cell>
                <Table.Cell>{apply_date}</Table.Cell>
                <Table.Cell>{test_date}</Table.Cell>
                <Table.Cell>{description}</Table.Cell>
            </Table.Row>
        )
    })
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
                    {noticeList}
                </Table.Body>
            </Table>
        </NoticeBlock>
    )
}

export default Notice;