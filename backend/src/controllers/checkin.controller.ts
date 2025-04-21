import { Request, Response } from 'express';
import { db } from '../config/db';

export const checkInEmployee = (req: Request, res: Response): void => {

  const { employeeName, employeeId, department } = req.body;

  if (!employeeName || !employeeId || !department) {
    res.status(400).json({ message: 'All fields are required' });
    return;
  }

  const checkIfExistsQuery = `
    SELECT * FROM attendance
    WHERE employee_id = ? AND DATE(check_in_time) = CURDATE()
  `;

  db.query(checkIfExistsQuery, [employeeId], (err, results) => {
    if (err) {
      console.error('Check-in lookup failed:', err);
      return res.status(500).json({ message: 'Database error' });
    }

    if ((results as any[]).length > 0) {
      return res.status(409).json({ message: 'Already checked in today' });
    }

    const now = new Date();
    const istOffset = 5.5 * 60 * 60 * 1000;
    const istDate = new Date(now.getTime() + istOffset);
    const checkInTime = istDate.toISOString().slice(0, 19).replace('T', ' ');

    const insertQuery = `
      INSERT INTO attendance (employee_name, employee_id, department, check_in_time)
      VALUES (?, ?, ?, ?)
    `;

    db.query(insertQuery, [employeeName, employeeId, department, checkInTime], (err2) => {
      if (err2) {
        console.error('Check-in insert failed:', err2);
        return res.status(500).json({ message: 'Database error' });
      }

      res.status(200).json({ message: 'Check-In successful', checkInTime });
    });
  });
};
