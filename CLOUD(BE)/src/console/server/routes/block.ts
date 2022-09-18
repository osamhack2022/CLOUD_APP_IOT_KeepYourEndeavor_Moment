import { Router } from "express";

const router: Router = Router();

router.get('/block', (req, res) => {
    res.send('ok');
})

export default router;