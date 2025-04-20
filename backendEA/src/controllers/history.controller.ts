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
    DATE_FORMAT(check_in_time, '%Y-%m-%d') AS date,
    department,
    DATE_FORMAT(check_in_time, '%H:%i:%s') AS check_in_time,
    DATE_FORMAT(check_out_time, '%H:%i:%s') AS check_out_time
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
