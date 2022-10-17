import react, {useCallback, useEffect, useState} from 'react';
import { toast } from 'react-toastify';
import api from '../../lib/api';
import { SystemError } from '../../lib/error';


export type userType =  {
    user_id: string;
    class: string;
    user_name: string;
    position: string;
    cmd: string,
    cps: string,
    division: string,
    br: string,
    bn: string,
    co: string,
    etc: string
};

export default function useUser(){
    const [users, setUsers] = useState<userType[]>([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('');

    useEffect(()=>{
        getUserList();
    }, []);

    const onChangeSearch = (e) => {
        setSearch(e.target.value);
    }

    const getUserList = async() => {
        try{
            setLoading(true);
            const {data} = await api.getUsers();
            setUsers(data.userInfo);
            setLoading(false);
        }catch(e){
            const error = e as SystemError;
            console.log(error.response.data.message)
            const message = error.response?.data?.message ?? "예기치 못 한 오류가 발생했습니다."
            toast.error(message, {
                position: toast.POSITION.TOP_CENTER
            });
            setLoading(false);
        }        
    }

    return {
        onChangeSearch, loading, users, search
    }
}