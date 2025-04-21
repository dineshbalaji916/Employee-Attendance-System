import express from 'express';
import { checkOutEmployee } from '../controllers/checkout.controller';

const router = express.Router();

router.post('/', checkOutEmployee);

export default router;
