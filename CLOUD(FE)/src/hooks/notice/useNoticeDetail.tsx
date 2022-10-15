import react, {useCallback, useEffect, useState} from 'react';
import { getApplication, getNotice } from '../../lib/api';
import { SystemError } from '../../lib/error';
import { useRouter } from '../common/useRouter';

type NoticeType = {
    notice_id: string,
    title: string,
    notice_author_id: string,
    test_date: string,
    apply_date: string,
    notice_created_at: string,
    notice_updated_at: string,
    description: string,
    issue_id: string,
    type: string,
    subject: string,
    issuer_id: string
}
export default function useNoticeDetail(){
    const [input, setInput] = useState({
        result: 0
    });
    const [notice, setNotice] = useState<NoticeType>({
        notice_id: "",
        title: "",
        notice_author_id: "",
        test_date: "",
        apply_date: "",
        notice_created_at: "",
        notice_updated_at: "",
        description: "",
        issue_id: "",
        type: "",
        subject: "",
        issuer_id: ""
    });
    const [members, setMemebers] = useState([]);
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        handleNotice();
        handleApplication();
    }, []);

    const handleNotice = async () => {
        try{
            setLoading(true);
            const id = router.match.params.id;
            const {data} = await getNotice(id);
            setNotice(data.notice);
            setLoading(false)
        }catch(e){
            const error = e as SystemError;
            console.log(error);
        }
    }

    const handleApplication = async() => {
        try{
            const id = router.match.params.id;
            const {data} = await getApplication(id);   
            console.log(data);
            setMemebers(data.members ?? []);
        }catch(e){
            const error = e as SystemError;
            console.log(error.response);
        }
    }
    
    const onChangeInput = (e) => {
        const {name, value} = e.target;

        setInput({
            ...input,
            [name]: value,
        })
    }
    return {
        onChangeInput, input, notice, loading, members
    }
}