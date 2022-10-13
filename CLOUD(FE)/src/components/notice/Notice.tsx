import React from 'react';
import { Button, Input, Table } from 'semantic-ui-react';
import styled from 'styled-components';
import useModal from '../../hooks/common/useModal';
import useNotice from '../../hooks/notice/useNotice';
import { noticeType } from '../../hooks/notice/useNotice';
import NoticeModal from './NoticeModal';
import {Link} from 'react-router-dom';
import NoticeDeleteModal from './NoticeDeleteModal';
const NoticeBlock = styled.div`
    padding: 2rem;
    .sub-header{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
`;

const Notice = () => {

    const {open, setOpen, onClickModal, modals} = useModal();
    const {notices, onChangeInput} = useNotice();

    const noticeList = notices.map((notice: noticeType) => {
        const {name, apply_date, test_date, description, id} = notice;
        return (
            <Table.Row>
                    <Table.Cell selectable textAlign='left'><Link to={`/notice/${id}`}>{name}</Link></Table.Cell>
                    <Table.Cell>{apply_date}</Table.Cell>
                    <Table.Cell>{test_date}</Table.Cell>
                    <Table.Cell>{description}</Table.Cell>
                    <Table.Cell textAlign='center'><Button basic color='red' icon="delete" onClick={()=>onClickModal(modals.deleteNotice)}></Button></Table.Cell>
            </Table.Row>
        )
    })
    return (
        <NoticeBlock>
            <div className='sub-header'>
                <h1>일정관리</h1>
                <Button primary onClick={()=>onClickModal(modals.addNotice)}>일정 추가</Button>
            </div>
            <Input fluid icon='search' placeholder='검색어를 입력해주세요...' />
             <Table celled>
                <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>이름</Table.HeaderCell>
                    <Table.HeaderCell>작성일</Table.HeaderCell>
                    <Table.HeaderCell>시험일</Table.HeaderCell>
                    <Table.HeaderCell>설명</Table.HeaderCell>
                    <Table.HeaderCell textAlign='center'>설정</Table.HeaderCell>
                </Table.Row>
                </Table.Header>

                <Table.Body>
                    {noticeList}
                </Table.Body>
            </Table>
            <NoticeDeleteModal onChangeInput={onChangeInput} open={open.deleteNotice} onClickModal={onClickModal} name={modals.deleteNotice} ></NoticeDeleteModal>
            <NoticeModal onChangeInput={onChangeInput} open={open.addNotice} onClickModal={onClickModal} name={modals.addNotice} ></NoticeModal>
        </NoticeBlock>
    )
}

export default Notice;