import express from 'express';
import { getEmployeeHistory } from '../controllers/history.controller';

const router = express.Router();

router.get('/:employeeId', getEmployeeHistory);

export default router;
