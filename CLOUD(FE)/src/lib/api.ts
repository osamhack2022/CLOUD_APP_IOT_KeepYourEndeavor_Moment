import axios from 'axios';

axios.defaults.withCredentials = true;

const guestApi = axios.create({
    baseURL: `https://api-server.run.goorm.io`,
});

const client = () => axios.create({
    baseURL: `https://api-server.run.goorm.io`,
    headers: {'Authorization': `${localStorage.getItem('token')}`},
});

const api = {
    signin:(user) => {
        return guestApi.post(`auth/signin`, user);
    },
    signup:(user) => {
        console.log(user);
        return guestApi.post(`auth/signup`, user)
    },
    logout:(token: string) => {
        return client().post(`auth/logout`)
    },
    createNotice :(notice) => {
        return client().post(`/notice/regist`, notice);
    },
    getNotice:(id: string) => {
        return client().get(`notice/${id}`)
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
    },
    getNotices:() => {
        return client().get(`notice/`)
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
    },
    deleteNotice:(id: string) => {
        return client().delete(`/notice/${id}`);
    },
    getIssues:() => {
        return client().get(`issue/`)
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
    },
    createIssue: (issue) => {
        return client().post(`/issue/regist`, issue);
    },
    getIssue:(id: string) => {
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
    },
    deleteIssue:(id: string) => {
        console.log(id)
        return client().delete(`/issue/${id}`);
    },
    getApplications:(noticeId: string) => {
        return client().get(`/application/${noticeId}`)
    },
    createStandard: (standard) => {
        return client().post(`/standard/post`, standard);
    },
    getUsers: () => {
        return client().post(`/profile`);
    },
}

export default api;