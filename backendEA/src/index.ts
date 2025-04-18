import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import checkInRoutes from './routes/checkin.route';
import checkOutRoutes from './routes/checkout.route';
import historyRoutes from './routes/history.route';
import managerRoutes from './routes/manager.route';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

app.use('/api/checkin', checkInRoutes);
app.use('/api/checkout', checkOutRoutes);
app.use('/api/history', historyRoutes);
app.use('/api/manager', managerRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
