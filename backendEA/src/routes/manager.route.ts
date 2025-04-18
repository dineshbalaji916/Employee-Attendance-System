import express from 'express';
import { getFilteredReports, downloadExcelReport } from '../controllers/manager.controller';

const router = express.Router();

router.post('/reports', getFilteredReports);
router.get('/download', downloadExcelReport);

export default router;
