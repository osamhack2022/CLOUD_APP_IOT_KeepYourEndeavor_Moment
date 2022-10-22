import react, {useCallback, useEffect, useState} from 'react';
import { toast } from 'react-toastify';
import api from '../../lib/api';
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
            await api.createNotice({
                manager_id: 'supervisor',
                ...input,
            });
            onClickModal(modals.addNotice);
            getNoticeList();
        }catch(e){
            const error = e as SystemError;
            const message = error.response?.data?.message ?? "예기치 못 한 오류가 발생했습니다."
            toast.error(message, {
                position: toast.POSITION.TOP_CENTER
            });
        }
    }

    const getNoticeList = async() => {
        try{
            setLoading(true);
            const {data} = await api.getNotices();
            setNotices(data.notices);
            setLoading(false);
        }catch(e){
            const error = e as SystemError;
            const message = error.response?.data?.message ?? "예기치 못 한 오류가 발생했습니다."
            toast.error(message, {
                position: toast.POSITION.TOP_CENTER
            });
        }        
    }

    const handleDeleteNotice = async(id: string) => {
        try{
            await api.deleteNotice(id);
            onClickModal(modals.deleteNotice);
            getNoticeList();
        }catch(e){
            const error = e as SystemError;
            const message = error.response?.data?.message ?? "예기치 못 한 오류가 발생했습니다."
            toast.error(message, {
                position: toast.POSITION.TOP_CENTER
            });
        }       
    }

    return {
        notices, onChangeInput, handleCreateNotice, input, loading, search, onChangeSearch, issues, open, onClickModal, modals, handleDeleteNotice, id
    }
}