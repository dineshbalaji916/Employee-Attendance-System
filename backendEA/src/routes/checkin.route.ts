import express from 'express';
import { checkInEmployee } from '../controllers/checkin.controller';

const router = express.Router();

router.post('/', checkInEmployee);

export default router;
