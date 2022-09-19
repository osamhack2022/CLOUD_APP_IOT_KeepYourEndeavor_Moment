import { Router } from "express";

const router: Router = Router();

//TODO: SDK랑 DB 따로 export 해서 router에서 사용 가능하도록 변경

router.post('/', async(req: any, res) => {
    try {
        const data = req.body.data;
        if (!data) throw Error('Invalid block data.');
        await req.sdk.sendNewBlock(data);
        return res.json(true);
    } catch(err) {
        console.log(err);
    }
});

router.get('/', async(req: any, res) => {
    try{
        const blocks = await req.db.getBlock();

        return res.json({
            blocks: blocks
        });
    }catch(err){
        console.log(err);
    }
});

export default router;