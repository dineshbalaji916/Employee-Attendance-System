import { Request, Response, NextFunction } from 'express';
import { db } from '../db';
import { Handler } from 'express'; 

export const checkOutEmployee = (req: Request, res: Response): void => {

  const { employeeId } = req.body;

  if (!employeeId) {
     res.status(400).json({ message: 'Employee ID is required' });
  }

  const checkQuery = `
    SELECT * FROM attendance
    WHERE employee_id = ? AND DATE(check_in_time) = CURDATE() AND check_out_time IS NULL
  `;

  db.query(checkQuery, [employeeId], (err, results) => {
    if (err) {
      console.error('Check-out lookup failed:', err);
      return res.status(500).json({ message: 'Database error' });
    }

    if ((results as any[]).length === 0) {
      return res.status(404).json({ message: 'No check-in found today or already checked out' });
    }

    const checkOutTime = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const updateQuery = `
      UPDATE attendance
      SET check_out_time = ?
      WHERE employee_id = ? AND DATE(check_in_time) = CURDATE() AND check_out_time IS NULL
    `;

    db.query(updateQuery, [checkOutTime, employeeId], (err2) => {
      if (err2) {
        console.error('Check-out update failed:', err2);
        return res.status(500).json({ message: 'Database error' });
      }

      res.status(200).json({ message: 'Check-Out successful', checkOutTime });
    });
  });
};
