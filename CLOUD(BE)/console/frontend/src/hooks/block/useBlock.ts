import react, {useCallback, useEffect, useState} from 'react';
import { getBlocks } from '../../lib/api';

export default function useBlock(){
    const [blocks, setBlocks] = useState([]);

    useEffect(()=>{
        getBlockList();
    }, []);

    const getBlockList = async() => {
        const {data} = await getBlocks();

        setBlocks(data.blocks.rows);
    }
    return {
        blocks
    }
}