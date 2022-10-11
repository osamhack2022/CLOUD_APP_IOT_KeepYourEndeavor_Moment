import react, {useEffect, useState} from 'react';
import { useRouter } from '../common/useRouter';

export default function useSidebar() { 
    const [select, setSelect] = useState(0);
    const [subSelect, setSubSelect] = useState(0);
    const router = useRouter()
    const chagneSelect = (id) =>{
        setSelect(id)
        setSubSelect(1);
    }
    useEffect(() => {
        console.log(router.match.path);
        switch (router.match.path) {
            case '/user' :
                setSelect(1);
                break;
            case '/user/:id' :
                setSelect(1);
                break;
            case '/issue' : case '/issue/detail/:id' : case '/issue/add' :
                setSelect(2);
                setSubSelect(1);
                break;
            case '/issue/bundle':
                setSelect(2);
                setSubSelect(2);
                break;
            case '/notice' : case '/notice/:id' : case '/notice/add' :
                setSelect(3)
                break;
        }
    }, []);

    useEffect(()=>{
        /*if ( sessionStorage.getItem('logged') !== "로그인"){
            router.history.push('/login');
        }*/
    },[]);
    
    return {
        chagneSelect, setSubSelect, select, subSelect
    }
}