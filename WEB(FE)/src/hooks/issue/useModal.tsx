import react, {useEffect, useState} from 'react';
import { getIssues, getIssue } from '../../lib/api';

export default function useModal(){
    const [open, setOpen] = useState(false);

    const onClickOpenModal = () => {
        setOpen(true);
    }

    return {
        open, setOpen, onClickOpenModal
    }
}