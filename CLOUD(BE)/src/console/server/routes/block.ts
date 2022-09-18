import { Router } from "express";

const router: Router = Router();

router.post('/', async(req: any, res) => {
    try {
        const data = req.body.data;
        if (!data) throw Error('Invalid block data.');
        await req.sdk.sendNewBlock(data);
        return res.json(true);
    } catch(err) {
        console.log(err);
    }
})

export default router;