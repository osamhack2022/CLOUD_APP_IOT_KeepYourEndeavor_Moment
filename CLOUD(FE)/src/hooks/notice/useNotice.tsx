import react, {useCallback, useEffect, useState} from 'react';
import { toast } from 'react-toastify';
import { createNotice, deleteNotice, getNotices } from '../../lib/api';
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
    const {open, onClickModal, modals, id} = useModal();

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
            await createNotice({
                manager_id: 'supervisor',
                ...input,
            });
            onClickModal(modals.addNotice);
        }catch(e){
            const error = e as SystemError;
            toast.error('오류가 발생했습니다', {
                position: toast.POSITION.TOP_RIGHT
            });
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
            toast.error('오류가 발생했습니다', {
                position: toast.POSITION.TOP_RIGHT
            });
        }        
    }

    const handleDeleteNotice = async(id: string) => {
        try{
            await deleteNotice(id);
        }catch(e){
            const error = e as SystemError;
            toast.error('오류가 발생했습니다', {
                position: toast.POSITION.TOP_RIGHT
            });
        }       
    }

    return {
        notices, onChangeInput, handleCreateNotice, input, loading, search, onChangeSearch, issues, open, onClickModal, modals, handleDeleteNotice, id
    }
}