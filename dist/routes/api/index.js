import { Router } from 'express';
import users from './users.js';
import thoughts from './thoughts.js';
const router = Router();
router.use('/users', users);
router.use('/thoughts', thoughts);
export default router;
