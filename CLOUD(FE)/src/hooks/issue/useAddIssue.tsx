import react, {useEffect, useState} from 'react';
import { toast } from 'react-toastify';
import api from '../../lib/api';
import { SystemError } from '../../lib/error';

export default function useAddIssue(){
    const [input, setInput] = useState({
        type: ''
    });

    const onChangeInput = (e, target?) => {
        const {name, value} = target ?? e.target;

        setInput({
            ...input,
            [name]: value,
        });
    }

    const handleCreateIssue = async(input) => {  
        console.log(input)
        const issue = {
            type: input.type,
            subject: input.subject,
            mandatory: input.subject ? "1" : "0"
        }
        try{
            await api.createIssue(issue);
        }catch(e){
            const error = e as SystemError;
            const message = error.response?.data?.message ?? "예기치 못 한 오류가 발생했습니다."
            toast.error(message, {
                position: toast.POSITION.TOP_CENTER
            });
        }

        try{
            if(input.type === '강연'){
                const standard = {
                    type : input.type,
                    subject : input.subject,
                    standard : {PASS:"PASS",FAIL:"FAIL"}
                }
                await api.createStandard(standard);
            }
            else if(input.type === '측정시험'){
                const standard = {
                    type : input.type,
                    subject : input.subject,
                    standard : {
                        "특": input.s,
                        "1급": input.a,
                        "2급": input.b,
                        "3급": input.c
                    }
                }
                await api.createStandard(standard);
            }
        }catch(e){
            const error = e as SystemError;
            const message = error.response?.data?.message ?? "예기치 못 한 오류가 발생했습니다."
            
            toast.error(message, {
                position: toast.POSITION.TOP_CENTER
            });
        }
    }

    return {
        input, onChangeInput, handleCreateIssue
    }
}