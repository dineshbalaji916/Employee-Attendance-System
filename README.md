# Employee Attendance System

A full-stack web application to manage employee check-ins and check-outs.  
Designed to monitor attendance efficiently using Angular + Node.js + MySQL.

---

## Tech Stack

- **Frontend**: Angular 16
- **Backend**: Node.js + Express (written in TypeScript)
- **Database**: MySQL
- **Styling**: Angular Material + CSS

---

## How to Run This Project (Step-by-Step)

> Clone this repo and follow the instructions. You’ll have the app running locally in 10 minutes.

### Folder Structure

```
employee-attendance-system/
├── frontend/
├── backend/
└── README.md
```

---

## Step 1: MySQL Setup

1. Create a database named: `employeeattendancesystem`
2. Create a table with the following structure:

```sql
CREATE TABLE attendance (
  id INT PRIMARY KEY AUTO_INCREMENT,
  employee_name VARCHAR(100),
  employee_id VARCHAR(20),
  department VARCHAR(50),
  check_in_time DATETIME,
  check_out_time DATETIME
);
```

---

## Step 2: Backend Setup (backend)

### Install dependencies
```bash
cd backend
npm install
```

### Set up TypeScript (only once)
```bash
npx tsc --init
```

### Update DB credentials

In `backend/src/config`, add .env file:

```ts
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=employeeattendancesystem
```

### Run the server
```bash
npm run dev
```

🟢 The backend will start on: http://localhost:3000

---

## Step 3: Frontend Setup (frontend)

### Install Angular CLI (if not installed)
```bash
npm install -g @angular/cli
```

### Install project dependencies
```bash
cd ../frontend
npm install
```

### Start Angular app
```bash
ng serve --open
```

🌐 This opens the frontend at: http://localhost:4200

---

## Features

### Employee View
- Check-In (once per day)
- Check-Out (only if checked in)
- View Attendance History by Employee ID

### Manager View
- Filter records by:
  - Employee Name
  - Department
  - Date Range
- Download filtered records as Excel file

### System Enhancements
- Validates Employee ID format (e.g., EMP001)
- Prevents duplicate check-ins
- Prevents invalid check-outs
- Friendly error messages and success toasts
- Excel export with proper formatting

---

## API Documentation

### POST /api/checkin
Check-in an employee  
**Body**:
```json
{ "employeeName": "John", "employeeId": "EMP001", "department": "IT" }
```

### POST /api/checkout
Check-out employee  
**Body**:
```json
{ "employeeId": "EMP001" }
```

### GET /api/history/:employeeId
Get all records for one employee

### POST /api/manager/reports
Get filtered records (used in Manager view)

### POST /api/manager/download
Download filtered records as Excel

---

##  Useful Commands

| Command             | Purpose                  |
|---------------------|--------------------------|
| `npm run dev`       | Run backend with nodemon |
| `ng serve --open`   | Run Angular frontend     |

---

## Notes

Default ports:

- Angular: http://localhost:4200  
- Backend: http://localhost:3000

You can change them in `angular.json` and `server.js` respectively.
