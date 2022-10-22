import react, {useEffect, useState} from 'react';
import { toast } from 'react-toastify';
import api from '../../lib/api';
import { SystemError } from '../../lib/error';
import useModal from '../common/useModal';

export type issueType =  {
    id: string;
    type: string;
    subject: string;
    issuer_id: string;
    created_at: string;
    updated_at: string;
    mandatory: number;
};

export default function useIssue(){
    const [issues, setIssues] = useState<issueType[]>([]);
    const [input, setInput] = useState({});
    const [loading, setLoading] = useState(false);
    const {open, onClickModal, modals, id} = useModal();

    useEffect(()=>{
        getIssueList();
    }, []);

    const onChangeInput = (e) => {
        const {name, value} = e.target;

        setInput({
            ...input,
            [name]: value,
        })
    }

    const getIssueList = async() => {
        try{
            setLoading(true);
            const {data} = await api.getIssues();
            console.log(data);
            setIssues(data.issues);
            setLoading(false);
        }catch(e){
            const error = e as SystemError;
            console.log(error);
        }
    }

    const handleDeleteIssue = async(id: string) => {
        try{
            await api.deleteIssue(id);
            onClickModal(modals.deleteIssue);
            getIssueList();
        }catch(e){
            const error = e as SystemError;
            const message = error.response?.data?.message ?? "예기치 못 한 오류가 발생했습니다."
            toast.error(message, {
                position: toast.POSITION.TOP_CENTER
            });
        }       
    }

    

    return {
        issues, onChangeInput, loading, handleDeleteIssue, open, onClickModal, modals, id, getIssueList
    }
}