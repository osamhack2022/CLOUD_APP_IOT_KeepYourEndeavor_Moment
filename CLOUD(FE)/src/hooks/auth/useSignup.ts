import react, {useCallback, useEffect, useState} from 'react';
import { toast } from 'react-toastify';
import api from '../../lib/api';
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
    const [loading, setLoading] = useState(false);
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
        console.log(input)
    }

    const handdleSignup = async(input: SignupInputType) => {
        if(!input.id){
            toast.error('군번은 필수 입력사항입니다.', {
                position: toast.POSITION.TOP_CENTER
            });
            return;
        }
        else if(!input.name){
            toast.error('이름은 필수 입력사항입니다.', {
                position: toast.POSITION.TOP_CENTER
            });
            return;
        }
        
        else if(!input.pwd){
            toast.error('비밀번호는 필수 입력사항입니다.', {
                position: toast.POSITION.TOP_CENTER
            });
            return;
        }
        try{
            setLoading(true);
            await api.signup(input);
            toast.success('회원가입이 완료되었습니다.', {
                position: toast.POSITION.TOP_CENTER
            });
            setLoading(false);
            router.history.push('/login');
        }catch(e){
            const error = e as SystemError;
            const message = error.response?.data?.message ?? "예기치 못 한 오류가 발생했습니다."
            setLoading(false);
            toast.error(message, {
                position: toast.POSITION.TOP_CENTER
            });
        }
    }

    return {
        handdleSignup, onChange, input, error, isLoading, loading
    }
}