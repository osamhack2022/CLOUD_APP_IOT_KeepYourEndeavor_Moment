import React from 'react';
import { Button, Dimmer, Input, Loader, Table } from 'semantic-ui-react';
import styled from 'styled-components';
import useModal from '../../hooks/common/useModal';
import useNotice from '../../hooks/notice/useNotice';
import { noticeType } from '../../hooks/notice/useNotice';
import NoticeModal from './NoticeModal';
import {Link} from 'react-router-dom';
import NoticeDeleteModal from './NoticeDeleteModal';
import moment from 'moment';
import { ToastContainer } from 'react-toastify';
const NoticeBlock = styled.div`
    padding: 2rem;
    .sub-header{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
`;

const Notice = () => {
    const {notices, onChangeInput, input, handleCreateNotice, loading, onChangeSearch, search, issues, open, onClickModal, modals, handleDeleteNotice, id} = useNotice();

    const noticeList = notices.filter((notice) => notice.title.indexOf(search) !== -1).map((notice: noticeType) => {
        const {subject, apply_date, test_date, description, notice_id, notice_created_at, title} = notice;
        return (
            <Table.Row key={notice_id}>
                    <Table.Cell selectable textAlign='left'><Link to={`/notice/${notice_id}`}>{title}</Link></Table.Cell>
                    <Table.Cell>{moment(notice_created_at).format('YYYY-MM-DD hh:mm')}</Table.Cell>
                    <Table.Cell>{moment(apply_date).format('YYYY-MM-DD hh:mm')}</Table.Cell>
                    <Table.Cell>{moment(test_date).format('YYYY-MM-DD hh:mm')}</Table.Cell>
                    <Table.Cell>{description}</Table.Cell>
                    <Table.Cell textAlign='center'><Button basic color='red' icon="delete" onClick={()=>onClickModal(modals.deleteNotice, notice_id)}></Button></Table.Cell>
            </Table.Row>
        )
    })
    
    return (
        <NoticeBlock>
            { loading && 
                (<Dimmer active inverted>
                    <Loader size='large'>일정 불러오는 중...</Loader>
                </Dimmer>)
            }
            <div className='sub-header'>
                <h1>일정관리</h1>
                <Button primary onClick={()=>onClickModal(modals.addNotice)}>일정 추가</Button>
            </div>
            <Input fluid icon='search' onChange={onChangeSearch} placeholder='검색어를 입력해주세요...' />
             <Table celled>
                <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>이름</Table.HeaderCell>
                    <Table.HeaderCell>생성일</Table.HeaderCell>
                    <Table.HeaderCell>접수마감</Table.HeaderCell>
                    <Table.HeaderCell>시험일</Table.HeaderCell>
                    <Table.HeaderCell>설명</Table.HeaderCell>
                    <Table.HeaderCell textAlign='center'>설정</Table.HeaderCell>
                </Table.Row>
                </Table.Header>

                <Table.Body>
                    {noticeList}
                </Table.Body>
            </Table>
            <NoticeDeleteModal id={id} handleDeleteNotice={handleDeleteNotice} open={open.deleteNotice} onClickModal={onClickModal} name={modals.deleteNotice} ></NoticeDeleteModal>
            <NoticeModal issues={issues} input={input} handleCreateNotice={handleCreateNotice} onChangeInput={onChangeInput} open={open.addNotice} onClickModal={onClickModal} name={modals.addNotice} ></NoticeModal>
 
        </NoticeBlock>
    )
}

export default Notice;