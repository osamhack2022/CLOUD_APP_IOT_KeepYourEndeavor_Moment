import react, {useCallback, useEffect, useState} from 'react';
import { signin, signup } from '../../lib/api';
import { SystemError } from '../../lib/error';

import { useRouter } from '../common/useRouter';

type SignupInputType = {
    id: string,
    pwd: string,
    class: string,
    name: string,
    authority: string;
    position: string;
    cmd: string;
    cps: string;
    division: string;
    br: string;
    bn: string;
    co: string;
    etc: string;
}
export default function useSignup(){
    
    const router = useRouter();
    const [input, setInput] = useState<SignupInputType>({
        id: '',
        pwd: '',
        class: '',
        name: '',
        authority: '',
        position: '',
        cmd: "",
        cps: "",
        division: "",
        br: "",
        bn: "",
        co: "",
        etc: "",
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const onChange = (e, target?) => {
        const {name, value} = target ?? e.target;

        setInput({
            ...input,
            [name]: value
        });
    }

    const handdleSignup = async(input: SignupInputType) => {
        if(!input.name){
            alert('이름을 입력해주세요!')
        }
        try{
            await signup(input);
            router.history.pushState('/login');
        }catch(e){
            const error = e as SystemError;
            
        }
    }

    return {
        handdleSignup, onChange, input, error, isLoading
    }
}