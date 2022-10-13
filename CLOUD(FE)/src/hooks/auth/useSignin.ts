import react, {useCallback, useEffect, useState} from 'react';
import { signin } from '../../lib/api';

import { useRouter } from '../common/useRouter';

export default function useSignin(){
    const router = useRouter();
    const [input, setInput] = useState({
        id: '',
        pwd: ''
    });
    const [error, setError] = useState('');

    const onChange = (e) => {
        const {name, value} = e.target;

        setInput({
            ...input,
            [name]: value
        })
    }

    const handdleSignin = async(input) => {
        const response = await signin(input);
        console.log(response);
    }

    const handdleSignup = async(input) => {
        const response = await signin(input);
        console.log(response);
    }

    const handleLogout = () => {
        localStorage.removeItem('login');
        router.history.push('/login');
    }


    return {
        handdleSignin, handdleSignup, onChange, input, error, handleLogout
    }
}