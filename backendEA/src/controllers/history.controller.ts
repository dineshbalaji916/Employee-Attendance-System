import { Request, Response } from 'express';
import { db } from '../db';

export const getEmployeeHistory = (req: Request, res: Response): void => {
  const { employeeId } = req.params;

  if (!employeeId) {
    res.status(400).json({ message: 'Employee ID is required' });
    return;
  }

  const sql = `
    SELECT
    employee_name,
    DATE(check_in_time) AS date,
    department,
    check_in_time,
    check_out_time
  FROM attendance
  WHERE employee_id = ?
  ORDER BY check_in_time DESC
  `;

  db.query(sql, [employeeId], (err, results) => {
    if (err) {
      console.error('History Fetch Error:', err);
      res.status(500).json({ message: 'Database error' });
      return;
    }

    res.status(200).json(results);
  });
};
