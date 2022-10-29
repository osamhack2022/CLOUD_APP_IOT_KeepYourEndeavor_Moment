import { Router } from "express";
import qs from "qs";

const router: Router = Router();

//TODO: SDK랑 DB 따로 export 해서 router에서 사용 가능하도록 변경

router.post('/', async(req: any, res) => {
    try {
        const data = req.body.data;
        console.log(data);
        if (!data) throw Error('Invalid block data.');
        await req.sdk.sendNewBlock(data);
        return res.json(true);
    } catch(err) {
        console.log(err);
    }
});

router.get('/', async(req: any, res) => {
    const data = qs.parse(req.query);
    const offset =  req.header('offset');
    const limit = req.header('limit');
    try{
        const blocks = await req.db.getBlock(data.user, offset, limit);

        return res.json({
            blocks: blocks
        });
    }catch(err){
        console.log(err);
    }
});

router.get('/least', async(req: any, res) => {
    try{
        const block = await req.db.getLeastBlock();

        return res.json({
            block
        });
    }catch(err){
        console.log(err);
    }
});


export default router;