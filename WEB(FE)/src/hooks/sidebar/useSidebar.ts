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
            case '/data/analysis' :
                setSelect(1);
                setSubSelect(1);
                break;
            case '/data/country' :
                setSelect(1);
                setSubSelect(2);
                break;   
            case '/data/age' :
                setSelect(1);
                setSubSelect(3);
                break;   
            case '/user' :
                setSelect(2);
                break;
            case '/user/:id' :
                setSelect(2);
                break;
            case '/tooth/list' : case '/tooth/list/:id' : case '/tooth/create' :
                setSelect(3);
                setSubSelect(1);
                break;
            case '/tooth/bundle':
                setSelect(3);
                setSubSelect(2);
                break;
            case '/info' : case '/info/:id' :
                setSelect(4)
                break;
            case '/notice': case '/notice/:id' :
                setSelect(5)
                break;
        }
    }, []);

    useEffect(()=>{
        if ( sessionStorage.getItem('logged') !== "로그인"){
            router.history.push('/login');
        }
    },[]);
    
    return {
        chagneSelect, setSubSelect, select, subSelect
    }
}