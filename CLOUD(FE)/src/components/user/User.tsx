import React from 'react';
import { Dimmer, Input, Loader, Table } from 'semantic-ui-react';
import styled from 'styled-components';
import useUser, { userType } from '../../hooks/user/useUser';

const UserBlock = styled.div`
    padding: 2rem;
    .sub-header{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
`;

const User = () => {
    
    const {
        onChangeSearch, loading, users, search
    } = useUser();

    const userList = users.filter((user) => user.user_name.indexOf(search) !== -1).map((user: userType) => {
        const {user_id, class: user_class, user_name, position} = user;
        return (
            <Table.Row key={user_id}>
                    <Table.Cell>{user_id}</Table.Cell>
                    <Table.Cell>{user_name}</Table.Cell>
                    <Table.Cell>{user_class}</Table.Cell>
                    <Table.Cell>{position}</Table.Cell>
            </Table.Row>
        )
    })
    
    return (
        <UserBlock>
            
            <h1>유저 관리</h1>
            <Input fluid icon='search' onChange={onChangeSearch} placeholder='검색어를 입력해주세요...' />
             <Table celled>
                <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>군번</Table.HeaderCell>
                    <Table.HeaderCell>이름</Table.HeaderCell>
                    <Table.HeaderCell>계급</Table.HeaderCell>
                    <Table.HeaderCell>직책</Table.HeaderCell>
                </Table.Row>
                </Table.Header>

                <Table.Body>
                    { loading && 
                        (<Dimmer active inverted>
                            <Loader size='large'>유저 목록 불러오는 중...</Loader>
                        </Dimmer>)
                    }
                    {userList}
                </Table.Body>
            </Table>
        </UserBlock>
    )
}

export default User;