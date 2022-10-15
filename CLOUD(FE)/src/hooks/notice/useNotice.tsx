import react, {useCallback, useEffect, useState} from 'react';
import { createNotice, getNotices } from '../../lib/api';

export type noticeType =  {
    name: string;
    issue_id: string;
    test_date: string;
    apply_date: string;
    created_at: string;
    description: string;
    id: string;
};

export default function useNotice(){
    const [notices, setNotices] = useState<noticeType[]>([]);
    const [input, setInput] = useState({});

    useEffect(()=>{
        getNoticeList();
    }, []);

    const onChangeInput = (e, target?) => {
        const {name, value} = target ? target : e.target;
        
        setInput({
            ...input,
            [name]: value,
        })
    }

    const handleCreateNotice = async() => {
        await createNotice(input);
    }

    const getNoticeList = async() => {
        const {data} = await getNotices();

        setNotices(data);
    }
    return {
        notices, onChangeInput, handleCreateNotice, input
    }
}