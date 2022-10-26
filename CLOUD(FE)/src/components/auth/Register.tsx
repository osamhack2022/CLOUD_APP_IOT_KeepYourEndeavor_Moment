import React from 'react';
import { Button, Dimmer, Divider, Dropdown, Form, Loader } from 'semantic-ui-react';
import styled from 'styled-components';
import useSignup from '../../hooks/auth/useSignup';
const RegisterBlock = styled.div`
    height: 100vh;
    
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    img{
        width: 400px;
        margin-right: 4rem;
    }
    .container{
        margin-top: 1rem;
        box-shadow : 0px 0px 8px rgba(0, 0, 0, 0.125);
        //border: 3px solid rgba(0, 0, 0, 0.01);
        padding: 2rem;
        display: flex;
        flex-direction: column;
        //align-items: center;
        //justify-content: center;
        width: 720px;
        .input{
            width: 100%;
            margin-bottom: 1rem;
        }
        .button{
            width: 100%;
            background: #5A9AFA;
        }
        .sub-header{
            width: 100%;
            text-align: left;
            margin-bottom: 1rem;
        }
    }
    .error-message{
        color: red;
        margin-bottom: 1rem;
    }
`;

const options = [
    { key: 1, text: '군무원', value: "군무원" },
    { key: 2, text: '병사', value: "병사", disabled: true},
    { key: 3, text: '간부', value: "간부"},
    { key: 4, text: '등록자', value: "등록자" },
    { key: 5, text: '개설자', value: "개설자"},
  ]


const Register = () => {
    const {onChange, handdleSignup, input, error, isLoading, loading} = useSignup();

 
    return (
        <RegisterBlock>
            { loading && 
                (<Dimmer active inverted>
                    <Loader size='large'>블록체인 계정 생성중</Loader>
                </Dimmer>)
            }
           <img src='undraw_reminder_re_fe15.svg'></img>
            <div className='container'>
                <h1>회원가입</h1>
                <Divider></Divider>
                <Form>
                    <h3>기본정보</h3>
                    <Form.Field>
                        <label>군번</label>
                        <input placeholder='군번을 입력해주세요' name='id' onChange={onChange} />
                    </Form.Field>
                    <Form.Field>
                        <label>이름</label>
                        <input placeholder='이름을 입력해주세요' name='name' onChange={onChange} />
                    </Form.Field>
                    <Form.Field>
                        <label>계급</label>
                        <input placeholder='계급을 입력해주세요' name='class' onChange={onChange} />
                    </Form.Field>
                    <Form.Field>
                        <label>비밀번호</label>
                        <input placeholder='블록체인에 사용된 비밀번호를 입력해주세요' name='pwd' type="password"onChange={onChange} />
                    </Form.Field>
                    <Form.Field>
                        <label>권한</label>
                        <Dropdown clearable defaultValue='개설자' onChange={onChange} options={options} name="authority" selection />
                    </Form.Field>
                    <h3>소속</h3>
                    <Form.Group widths='equal'>
                        <Form.Input fluid label="사령부" placeholder='00사령부' name="cmd" onChange={onChange} />
                        <Form.Input fluid label='군단' placeholder='00군단' name="cps" onChange={onChange}/>
                        <Form.Input fluid label="사단" placeholder='00사단' name="division" onChange={onChange}/>
                        <Form.Input fluid label='여단' placeholder='00여단' name="br" onChange={onChange} />
                    </Form.Group>
                    <Form.Group widths='equal'>
                        <Form.Input fluid label='대대' placeholder='00대대' name="bn" onChange={onChange} />
                        <Form.Input fluid label='중대 / 부서' placeholder='00중대 / 00과' name="co" onChange={onChange}/>
                        <Form.Input fluid label='담당직책' placeholder='00부사관' name="position"onChange={onChange}/>
                    </Form.Group>
                    <Form.Field>
                        <label>추가입력사항</label>
                        <input placeholder="etc. 00소대, 00분대" name='etc' onChange={onChange} />
                    </Form.Field>
                </Form>
                <div className='sub-header'>
                    
                </div>
                <Button primary onClick={()=>handdleSignup(input)}>회원가입</Button>
            </div>
            
        </RegisterBlock>
    )
}

export default Register;