import react, {useEffect, useState} from 'react';
import { getIssues, getIssue } from '../../lib/api';
import { SystemError } from '../../lib/error';

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
    return {
        issues, onChangeInput, loading
    }
}