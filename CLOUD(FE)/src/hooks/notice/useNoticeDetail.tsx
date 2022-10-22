import react, {useCallback, useEffect, useState} from 'react';
import { toast } from 'react-toastify';
import api from '../../lib/api';
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
    const [applicants, setApplicants] = useState([]);
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
            const {data} = await api.getNotice(id);
            console.log(data);
            setNotice(data.notice);
            setLoading(false);
        }catch(e){
            console.log(e);
            const error = e as SystemError;
            const message = error.response?.data?.message ?? "예기치 못 한 오류가 발생했습니다."
            toast.error(message, {
                position: toast.POSITION.TOP_CENTER
            });
        }
    }

    const handleApplication = async() => {
        try{
            const id = router.match.params.id;
            const {data} = await api.getApplications(id); 
            console.log(data);
            setApplicants(data.applicants[0]?.members ?? []);
        }catch(e){
            const error = e as SystemError;
            console.log(e);
            const message = error.response?.data?.message ?? "예기치 못 한 오류가 발생했습니다."
            toast.error(message, {
                position: toast.POSITION.TOP_CENTER
            });
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
        onChangeInput, input, notice, loading, applicants
    }
}