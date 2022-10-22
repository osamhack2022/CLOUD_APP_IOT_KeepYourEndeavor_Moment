import {useState} from 'react';
import { toast } from 'react-toastify';
import { System } from 'typescript';
import api from '../../lib/api';
import { SystemError } from '../../lib/error';

import { useRouter } from '../common/useRouter';

export default function useSignin(){
    const router = useRouter();
    const [input, setInput] = useState({
        id: '',
        pwd: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const onChange = (e) => {
        const {name, value} = e.target;

        setInput({
            ...input,
            [name]: value
        })
    }

    const handdleSignin = async(input) => {
        try{
            setLoading(true);
            const {data} = await api.signin(input);
            localStorage.setItem('token', data.token);
            router.history.push('/');
            setLoading(false);
        }catch(e){
            const err = e as SystemError;
            console.log(err.response)
            setError(err.response?.data?.message ?? "예기치 못한 오류가 발생했습니다.");
            setLoading(false);
        }
    }

    const handleLogout = async() => {
        try{
            const token: string = localStorage.getItem('token') ?? '';
            await api.logout(token);
            localStorage.removeItem('token');
            router.history.push('/login');
        }catch(e){
            const error = e as SystemError;
            const message = error.response?.data?.message ?? "예기치 못 한 오류가 발생했습니다."
            toast.error(message, {
                position: toast.POSITION.TOP_CENTER
            });
        }

    }


    return {
        handdleSignin, onChange, input, error, handleLogout, loading
    }
}