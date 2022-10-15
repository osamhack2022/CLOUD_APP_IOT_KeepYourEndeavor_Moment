import react, {useCallback, useEffect, useState} from 'react';
import { createNotice, getNotices } from '../../lib/api';
import { SystemError } from '../../lib/error';
import useModal from '../common/useModal';
import useIssue from '../issue/useIssue';

export type noticeType =  {
    title: string;
    subject: string;
    issue_id: string;
    test_date: string;
    apply_date: string;
    notice_created_at: string;
    description: string;
    notice_id: string;
};

export default function useNotice(){
    const [notices, setNotices] = useState<noticeType[]>([]);
    const {issues} = useIssue();
    const [input, setInput] = useState({});
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('');
    const {open, onClickModal, modals} = useModal();

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

    const onChangeSearch = (e) => {
        setSearch(e.target.value);
    }

    const handleCreateNotice = async(notice) => {
        console.log(notice);
        try{
            await createNotice(input);
            onClickModal(modals.addNotice);
        }catch(e){
            const error = e as SystemError;
            console.log(error.response);
        }
    }

    const getNoticeList = async() => {
        try{
            setLoading(true);
            const {data} = await getNotices();
            console.log(data);
            setNotices(data.notices);
            setLoading(false);
        }catch(e){
            const error = e as SystemError;
            console.log(error);
        }

        
    }
    return {
        notices, onChangeInput, handleCreateNotice, input, loading, search, onChangeSearch, issues, open, onClickModal, modals
    }
}