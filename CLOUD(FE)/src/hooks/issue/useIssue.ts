import react, {useEffect, useState} from 'react';
import { toast } from 'react-toastify';
import { getIssues, getIssue, deleteIssue } from '../../lib/api';
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
            const {data} = await getIssues();
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
            await deleteIssue(id);
        }catch(e){
            const error = e as SystemError;
            toast.error('오류가 발생했습니다', {
                position: toast.POSITION.TOP_RIGHT
            });
            console.log(error.response);
        }       
    }

    

    return {
        issues, onChangeInput, loading, handleDeleteIssue, open, onClickModal, modals, id
    }
}