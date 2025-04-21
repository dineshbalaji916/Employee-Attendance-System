import { Request, Response } from 'express';
import { db } from '../config/db';
import ExcelJS from 'exceljs';

export const getFilteredReports = (req: Request, res: Response): void => {
  const { employeeName, department, startDate, endDate } = req.body;

  let sql = `
    SELECT 
      DATE_FORMAT(check_in_time, '%Y-%m-%d') AS date,
      DATE_FORMAT(check_in_time, '%H:%i:%s') AS check_in_time,
      DATE_FORMAT(check_out_time, '%H:%i:%s') AS check_out_time,
      employee_name,
      employee_id,
      department
    FROM attendance
    WHERE 1=1
  `;

  const values: any[] = [];

  if (employeeName) {
    sql += ' AND employee_name LIKE ?';
    values.push(`%${employeeName}%`);
  }

  if (department) {
    sql += ' AND department = ?';
    values.push(department);
  }

  if (startDate) {
    sql += ' AND DATE(check_in_time) >= ?';
    values.push(startDate);
  }

  if (endDate) {
    sql += ' AND DATE(check_in_time) <= ?';
    values.push(endDate);
  }

  sql += ' ORDER BY check_in_time DESC';

  db.query(sql, values, (err, results) => {
    if (err) {
      console.error('Manager report error:', err);
      res.status(500).json({ message: 'Database error' });
      return;
    }

    res.status(200).json(results);
  });
};
export const downloadExcelReport = async (req: Request, res: Response) => {
  const { employeeName, department, startDate, endDate } = req.body;

  let sql = `
    SELECT 
      DATE_FORMAT(check_in_time, '%Y-%m-%d') AS date,
      DATE_FORMAT(check_in_time, '%H:%i:%s') AS check_in_time,
      DATE_FORMAT(check_out_time, '%H:%i:%s') AS check_out_time,
      employee_name,
      employee_id,
      department
    FROM attendance
    WHERE 1=1
  `;

  const values: any[] = [];

  if (employeeName) {
    sql += ' AND employee_name LIKE ?';
    values.push(`%${employeeName}%`);
  }

  if (department) {
    sql += ' AND department = ?';
    values.push(department);
  }

  if (startDate) {
    sql += ' AND DATE(check_in_time) >= ?';
    values.push(startDate);
  }

  if (endDate) {
    sql += ' AND DATE(check_in_time) <= ?';
    values.push(endDate);
  }

  sql += ' ORDER BY check_in_time DESC';

  db.query(sql, values, async (err, rows) => {
    if (err) {
      console.error('Download Excel error:', err);
      return res.status(500).send('Failed to fetch data');
    }

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Attendance Report');

    worksheet.columns = [
      { header: 'Date', key: 'date', width: 15 },
      { header: 'Name', key: 'employee_name', width: 20 },
      { header: 'Employee ID', key: 'employee_id', width: 15 },
      { header: 'Department', key: 'department', width: 15 },
      { header: 'Check-In Time', key: 'check_in_time', width: 20 },
      { header: 'Check-Out Time', key: 'check_out_time', width: 20 },
    ];

    worksheet.addRows(rows as any[]);

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=filtered_attendance.xlsx');

    await workbook.xlsx.write(res);
    res.end();
  });
};

