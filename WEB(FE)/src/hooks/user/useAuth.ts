import react, {useCallback, useEffect, useState} from 'react';

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
        
    }

    const handleLogout = () => {
        localStorage.removeItem('login');
        router.history.push('/login');
    }


    return {
        handdleLogin, onChange, input, error, handleLogout
    }
}