import { summmerizer } from '../Controllers/summerizerController.js';
import getdatafromredis from '../Controllers/checkeredis.js'
import {clearSummarizationHistory} from '../Controllers/summerizerController.js'
import {getSummarizationHistoryByid} from '../Controllers/summerizerController.js'
import {getSummarizationHistory} from '../Controllers/summerizerController.js'
import express from 'express';
import loginornot from '../middlewares/loginedornot.js';
const router=express.Router();

router.post('/summarizetext', loginornot,summmerizer);
router.get('/getsummarizationhistory', loginornot,getSummarizationHistory);
router.get('/getsummarizationhistoryByid/:id',getSummarizationHistoryByid)
router.delete('/clearsummarizationhistory/:id',clearSummarizationHistory);
router.get('/redisdata',getdatafromredis);

export default router;