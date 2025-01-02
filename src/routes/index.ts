import express from 'express';
import apiRoutes from './api/index.js'; 

const router = express.Router();

router.use('/api', apiRoutes);
router.use((_, res) => res.status(404).send('Route 404'));

export default router;