import react, {useCallback, useEffect, useState} from 'react';
import { getNotices } from '../../lib/api';

export type noticeType =  {
    name: string;
    issue_id: string;
    test_date: string;
    apply_date: string;
    description: string;
};

export default function useNotice(){
    const [notices, setNotices] = useState<noticeType[]>([]);

    useEffect(()=>{
        getNoticeList();
    }, []);

    const getNoticeList = async() => {
        const {data} = await getNotices();

        setNotices(data);
    }
    return {
        notices
    }
}