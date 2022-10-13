import react, {useEffect, useState} from 'react';
import { getIssues, getIssue } from '../../lib/api';

export type issueType =  {
    id: string;
    type: string;
    subject: string;
    issuer_id: string;
    created_at: string;
    updated_at: string;
};

export default function useIssue(){
    const [issues, setIssues] = useState<issueType[]>([]);
    const [input, setInput] = useState({});

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
        const {issues} = await getIssues();
        setIssues(issues);
    }
    return {
        issues, onChangeInput
    }
}