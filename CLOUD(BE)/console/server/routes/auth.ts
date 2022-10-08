import { Router } from "express";

const router: Router = Router();

router.post('/login', (req, res) => {
    const {id, password} = req.body;

    if(id === process.env.PEERID && password === process.env.PASSWORD ){
        res.send(true);
    }
    else{
        res.send(false);
    }
})

export default router;