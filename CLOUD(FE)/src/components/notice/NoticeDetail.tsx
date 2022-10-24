import moment from 'moment';
import React from 'react';
import { toast } from 'react-toastify';
import { Button, Dimmer, Icon, Label, Loader, Pagination, Table } from 'semantic-ui-react';
import styled from 'styled-components';
import useModal from '../../hooks/common/useModal';
import useNoticeDetail from '../../hooks/notice/useNoticeDetail';
import ResultModal from './ResultModal';
const NoticeDetailBlock = styled.div`
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

const NoticeDetail = () => {
    const {open, onClickModal, modals, id} = useModal();
    const {onChangeInput, input, notice, loading, applicants, createBlock} = useNoticeDetail();

    const memberList = applicants.map(applicant => {
        const {members, onChain} = applicant;
        const {user_id, user_name} = members;
        console.log(onChain);
        return (
            <Table.Row key={user_id} onClick={
                () => {
                    if(onChain === '0'){
                        onClickModal(modals.resultNotice, user_id)
                    }else {
                        toast.warn('이미 블록체인에 등록된 데이터는 수정할 수 없습니다.', {
                            position: toast.POSITION.TOP_CENTER
                        });
                    }
                }
            }>
                    <Table.Cell>{user_id}</Table.Cell>
                    <Table.Cell>{user_name}</Table.Cell>
                    <Table.Cell><Label size="medium" color="violet">1급</Label></Table.Cell>
                    <Table.Cell textAlign='left'>
                        {onChain === '1' ? 
                            <Icon color='green' name='checkmark' size='large' /> : 
                            <Icon color='red' name='x' size='large' />
                        }
                    </Table.Cell>
            </Table.Row>
        )
    })

    return (
        <NoticeDetailBlock>
            { loading && 
                (<Dimmer active inverted>
                    <Loader size='large'>일정 불러오는 중...</Loader>
                </Dimmer>)
            }
            <header>
                <h1>{notice.title}</h1>
                <Label color="blue">{notice.subject}</Label>
            </header>
            <Table definition>
                <Table.Body>
                    <Table.Row>
                        <Table.Cell width={2}>담당 간부</Table.Cell>
                        <Table.Cell>{notice.notice_author_id}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>평가 일시</Table.Cell>
                        <Table.Cell>{moment(notice.test_date).format('YYYY-MM-DD hh:ss')}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>시험 설명</Table.Cell>
                        <Table.Cell>{notice.description}</Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table>
            <h3>
                응시 인원
            </h3>
            {
                memberList.length === 0 ? <div className='member-list-none'>아직 응시한 인원이 없습니다.</div> :
       
            (
                <>
                    <Table celled>
                    <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell textAlign='left'>군번</Table.HeaderCell>
                        <Table.HeaderCell>이름</Table.HeaderCell>
                        <Table.HeaderCell>점수</Table.HeaderCell>
                        <Table.HeaderCell width={2}>블록체인 인증</Table.HeaderCell>
                    </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {memberList}
                    </Table.Body>
                </Table>
                <footer>
                    <Pagination
                        boundaryRange={0}
                        defaultActivePage={1}
                        ellipsisItem={null}
                        firstItem={null}
                        lastItem={null}
                        siblingRange={1}
                        totalPages={10}
                    />
                </footer>
                </>
            )
            }
            <ResultModal user={id} createBlock={createBlock} onChangeInput={onChangeInput} open={open.resultNotice} onClickModal={onClickModal} name={modals.resultNotice} input={input}/>
        </NoticeDetailBlock>
    )
}

export default NoticeDetail;