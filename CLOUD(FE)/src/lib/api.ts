import axios from 'axios';
import { noticeType } from '../hooks/notice/useNotice';

axios.defaults.withCredentials = true;

const guestApi = axios.create({
    baseURL: `https://api-server.run.goorm.io`,
});

const api = () => axios.create({
    baseURL: `https://api-server.run.goorm.io`,
    headers: {'Authorization': `${localStorage.getItem('token')}`},
});


// 계정 API
export const signin = (user) => {
    console.log(user);
    return guestApi.post(`auth/signin`, user);
}

export const signup = (user) => {
    console.log(user);
    return guestApi.post(`auth/signup`, user)
}

export const logout = (token: string) => {
    return api().post(`auth/logout`)
}


export const createNotice = (notice) => {
    console.log(notice);
    return api().post(`/notice/regist`, notice);
}

export const getNotice = (id: string) => {
    return api().get(`notice/${id}`)
   /*
   return {
        data:{
            notices: [
                {
                    title: "3차 화생방 평가",
                    subject: '화생방',
                    issue_id: "123123123",
                    test_date: "2022-10-17 17:30:00",
                    notice_created_at: "2022-10-17 17:30:00",
                    apply_date: "2022-10-12 15:30:00",
                    description: "화생방 시험 평가 준비물 방독면",
                    notice_id: "123123"
                }
            ]
        }
    }*/
}

export const getNotices = () => {
    return api().get(`notice/`)
   /*
   return {
        data:{
            notices: [
                {
                    title: "3차 화생방 평가",
                    subject: '화생방',
                    issue_id: "123123123",
                    test_date: "2022-10-17 17:30:00",
                    notice_created_at: "2022-10-17 17:30:00",
                    apply_date: "2022-10-12 15:30:00",
                    description: "화생방 시험 평가 준비물 방독면",
                    notice_id: "123123"
                }
            ]
        }
    }*/
}

export const deleteNotice = (id: string) => {
    console.log(id)
    return api().post(`/notice/delete/${id}`);
}


export const getIssues = () => {
    return api().get(`issue/`)
    /*return {
        data: {
            issues: [
                {
                    id: "OvEuiS6MscL+J99q",
                    type: "test",
                    subject: "팔굽혀펴기",
                    issuer_id: "supervisor",
                    created_at: "2022-10-06T23:10:07.000Z",
                    updated_at: "2022-10-06T23:10:07.000Z",
                    mandatory:1,
                },
                {
                    id: "OvEuiS6MscL+2q",
                    type: "test",
                    subject: "화생방 평가",
                    issuer_id: "supervisor",
                    created_at: "2022-10-06T23:10:07.000Z",
                    updated_at: "2022-10-06T23:10:07.000Z",
                    mandatory:1,
                },
                {
                    id: "OvEuiS6M12+J99q",
                    type: "test",
                    subject: "경계평가",
                    issuer_id: "supervisor",
                    created_at: "2022-10-06T23:10:07.000Z",
                    updated_at: "2022-10-06T23:10:07.000Z",
                    mandatory:1,
                }
            ]
        }
    }*/
}

export const getIssue = (id: string) => {
    return {
        message: "등록된 issue를 성공적으로 전송했습니다.",
        issue: [
            {
                id: "OvEuiS6MscL+J99q",
                type: "test",
                subject: "팔굽혀펴기",
                issuer_id: "supervisor",
                created_at: "2022-10-06T23:10:07.000Z",
                updated_at: "2022-10-06T23:10:07.000Z"
            }
        ],
        standard: {
            fail_grade: {
                stringValue: "20",
                valueType: "stringValue"
            },
            special_grade: {
                stringValue: "80",
                valueType: "stringValue"
            },
            first_grade: {
                stringValue: "75",
                valueType: "stringValue"
            },
            third_grade: {
                stringValue: "40",
                valueType: "stringValue"
            },
            second_grade: {
                stringValue: "50",
                valueType: "stringValue"
            }
        }
    }
}

export const deleteIssue = (id: string) => {
    console.log(id)
    return api().delete(`/issue/${id}`);
}

//Aplication

export const getApplication = (noticeId: string) => {
    return api().get(`/application/${noticeId}`)
}
