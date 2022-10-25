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
        record: ''
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
    const [standard, setStandard] = useState<any>();
    const [applicants, setApplicants] = useState([]);
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(0);

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
            setStandard(data.standard);
            setLoading(false);
        }catch(e){
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
            setApplicants(data.applicants);
        }catch(e){
            const error = e as SystemError;
            const message = error.response?.data?.message ?? "예기치 못 한 오류가 발생했습니다."
            toast.error(message, {
                position: toast.POSITION.TOP_CENTER
            });
        }
    }

    const createBlock = async(input, user) => {
        try{
            await api.createBlock({
                ...input,
                user,
                issue_id: notice.issue_id,
            });
            toast.success('시험 결과 등록이 완료되었습니다!', {
                position: toast.POSITION.TOP_CENTER
            });
        } catch(e){
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
        if(name === 'record'){
            if(parseInt(standard['특']) <= value){
                setResult(3);
            }else if(parseInt(standard['특']) > value && parseInt(standard['1급']) <= value){
                setResult(2);
            }else if(parseInt(standard['1급']) > value && parseInt(standard['2급']) <= value){
                setResult(1);
            }else if(parseInt(standard['2급']) > value ){
                setResult(0);
            }
        }
        setInput({
            ...input,
            [name]: value,
        })
    }
    return {
        onChangeInput, input, notice, loading, applicants, createBlock, result
    }
}