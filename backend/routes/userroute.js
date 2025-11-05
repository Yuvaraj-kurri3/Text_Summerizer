import { Router } from 'express';
import * as user from '../Controllers/usercontroller.js';

const router = Router();

router.post('/signup',user.signup);
router.post('/login',user.login);
router.get('/logout',user.logout);

export default router;