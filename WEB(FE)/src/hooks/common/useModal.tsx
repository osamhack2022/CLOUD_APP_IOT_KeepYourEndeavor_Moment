import react, {useEffect, useState} from 'react';
import { getIssues, getIssue } from '../../lib/api';

export default function useModal(){
    const modals = {
        addIssue: 'addIssue',
        deleteIssue: 'deleteIssue',
        addNotice: 'addNotice',
        resultNotice: 'resultNotice',
        deleteNotice: 'deleteNotice'
    }

    const [open, setOpen] = useState({
        [modals.addIssue]: false,
        [modals.addNotice]: false,
        [modals.deleteIssue]: false,
        [modals.resultNotice]: false,
        [modals.deleteNotice]: false,
    });

    const onClickModal = (name) => {
        setOpen({
            ...open,
            [name] : !open[name]
        });
    }

    return {
        open, setOpen, onClickModal, modals
    }
}