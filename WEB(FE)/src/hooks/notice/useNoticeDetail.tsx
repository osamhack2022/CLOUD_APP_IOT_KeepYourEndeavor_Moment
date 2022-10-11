import react, {useCallback, useEffect, useState} from 'react';
import { getNotices } from '../../lib/api';

export default function useNoticeDetail(){
    const [input, setInput] = useState({
        result: 0
    });
    
    const onChangeInput = (e) => {
        const {name, value} = e.target;

        setInput({
            ...input,
            [name]: value,
        })
    }
    return {
        onChangeInput, input
    }
}