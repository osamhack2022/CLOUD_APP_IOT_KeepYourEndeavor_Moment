import React from 'react';
import { Button, Icon, Label, Pagination, Table } from 'semantic-ui-react';
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
`;

const NoticeDetail = () => {
    const {open, onClickModal, modals} = useModal();
    const {onChangeInput, input} = useNoticeDetail();
    return (
        <NoticeDetailBlock>
            <header>
                <h1>정보통신대대 22년도 제 3차 화생방평가</h1>
                <Label color="blue">화생방 평가</Label>
            </header>
            <Table definition>
                <Table.Body>
                    <Table.Row>
                        <Table.Cell width={2}>담당 간부</Table.Cell>
                        <Table.Cell>황창현</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>평가 일시</Table.Cell>
                        <Table.Cell>2022-10-30</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>시험 설명</Table.Cell>
                        <Table.Cell>09: 00 까지 교육관앞으로 방독면 필수</Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table>
            <h3>
                응시 인원
            </h3>
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
                <Table.Row>
                    <Table.Cell>21-76045289</Table.Cell>
                    <Table.Cell>강은솔</Table.Cell>
                    <Table.Cell><Label size="medium" color="blue">특급</Label></Table.Cell>
                    <Table.Cell textAlign='left'>
                        <Icon color='green' name='checkmark' size='large' />
                    </Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Cell>21-76045289</Table.Cell>
                    <Table.Cell>성서윤</Table.Cell>
                    <Table.Cell><Label size="medium" color="violet">1급</Label></Table.Cell>
                    <Table.Cell textAlign='left'>
                        <Icon color='green' name='checkmark' size='large' />
                    </Table.Cell>
                </Table.Row>
                <Table.Row href=''>
                    <Table.Cell textAlign="left" selectable onClick={()=>onClickModal(modals.resultNotice)}> 21-76045289</Table.Cell>
                    <Table.Cell>성서윤</Table.Cell>
                    <Table.Cell>미등록</Table.Cell>
                    <Table.Cell textAlign='left' >
                        <Icon color='red' name='x' size='large' />
                    </Table.Cell>
                </Table.Row>
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
            <ResultModal onChangeInput={onChangeInput} open={open.resultNotice} onClickModal={onClickModal} name={modals.resultNotice} input={input}/>
        </NoticeDetailBlock>
    )
}

export default NoticeDetail;