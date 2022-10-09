import react, {useCallback, useEffect, useState} from 'react';
import { login } from '../../lib/api';
import { useRouter } from '../common/useRouter';

export default function useAuth(){
    const router = useRouter();
    const [input, setInput] = useState({
        id: '',
        password: ''
    });
    const [error, setError] = useState('');

    const onChange = (e) => {
        const {name, value} = e.target;

        setInput({
            ...input,
            [name]: value
        })
    }

    const handdleLogin = async(input) => {
        const {data} = await login(input);
        if(data === true){
            localStorage.setItem('login', 'true');
            router.history.push('/')
        }
        else{
            setError('로그인 정보를 다시 확인해주세요');
        }
    }

    const handleLogout = () => {
        localStorage.removeItem('login');
        router.history.push('/login');
    }


    return {
        handdleLogin, onChange, input, error, handleLogout
    }
}