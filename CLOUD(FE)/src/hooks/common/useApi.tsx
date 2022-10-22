import react, {useEffect, useState} from 'react';
import { toast } from 'react-toastify';
import { decodedTextSpanIntersectsWith } from 'typescript';
import api from '../../lib/api';
import { SystemError } from '../../lib/error';

export default function useQuery(name: string) {    
    const [loading, setLoading] = useState(false);
    // const [error, setError] = useState(false);
    const [result, setResult] = useState<any>();

    useEffect(()=>{
        query();
    }, []);

    const query = async() => {
        setLoading(true);
        try{
            const {data} = await api[name]();
            setResult(data);
        } catch(e) {
            const error = e as SystemError;
            const errorMessage = error.response?.data?.message ?? "예기치 못 한 오류가 발생했습니다.";
            
            toast.error(errorMessage, {
                position: toast.POSITION.TOP_CENTER
            });
            setLoading(false);
        } finally {
            setLoading(false);
        }
    }

    return {
        result, loading
    }
}