import {useState} from 'react';
import { System } from 'typescript';
import { logout, signin } from '../../lib/api';
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
            const {data} = await signin(input);
            localStorage.setItem('token', data.token);
            router.history.push('/');
            setLoading(false);
        }catch(e){
            const err = e as SystemError;
            setError(err.response.data.message);
            setLoading(false);
        }
    }

    const handleLogout = async() => {
        try{
            const token: string = localStorage.getItem('token') ?? '';
            await logout(token);
            localStorage.removeItem('token');
            router.history.push('/login');
        }catch(e){
            const err = e as SystemError;
            
        }

    }


    return {
        handdleSignin, onChange, input, error, handleLogout, loading
    }
}