import react, {useCallback, useEffect, useState} from 'react';
import { signin, signup } from '../../lib/api';

import { useRouter } from '../common/useRouter';

export default function useSignup(){
    const router = useRouter();
    const [input, setInput] = useState({
        authority: "간부",
        position: "전산병",
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const onChange = (e) => {
        const {name, value} = e.target;

        setInput({
            ...input,
            [name]: value
        });
    }

    const handdleSignup = async(input) => {
        const response = await signup(input);
        console.log(response);
    }

    return {
        handdleSignup, onChange, input, error, isLoading
    }
}