import { Request, Response } from 'express';
import { db } from '../db';

export const checkInEmployee = (req: Request, res: Response): void => {
  const { employeeName, employeeId, department } = req.body;

  if (!employeeName || !employeeId || !department) {
    res.status(400).json({ message: 'Missing required fields' });
    return;
  }

  const checkInTime = new Date().toISOString().slice(0, 19).replace('T', ' ');

  const sql = 'INSERT INTO attendance (employee_name, employee_id, department, check_in_time) VALUES (?, ?, ?, ?)';
  const values = [employeeName, employeeId, department, checkInTime];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error during check-in:', err);
      return res.status(500).json({ message: 'Database error' });
    }

    res.status(200).json({ message: 'Check-In successful', checkInTime });
  });
};
