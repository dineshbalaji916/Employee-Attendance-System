import { Request, Response } from 'express';
import { db } from '../db';

export const checkOutEmployee = (req: Request, res: Response): void => {
  const { employeeId } = req.body;

  if (!employeeId) {
    res.status(400).json({ message: 'Employee ID is required' });
    return;
  }

  const checkOutTime = new Date().toISOString().slice(0, 19).replace('T', ' ');

  const sql = `
    UPDATE attendance
    SET check_out_time = ?
    WHERE employee_id = ?
      AND DATE(check_in_time) = CURDATE()
      AND check_out_time IS NULL
  `;

  db.query(sql, [checkOutTime, employeeId], (err, result) => {
    if (err) {
      console.error('Check-Out Error:', err);
      res.status(500).json({ message: 'Database error' });
      return;
    }

    if ((result as any).affectedRows === 0) {
      res.status(404).json({ message: 'No matching check-in found for today' });
    } else {
      res.status(200).json({ message: 'Check-Out successful', checkOutTime });
    }
  });
};
