import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { AttendanceService } from '../../services/attendance.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-manager',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatButtonModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule
  ],
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent implements OnInit {
  displayedColumns: string[] = ['date', 'employeeName', 'employeeId', 'department', 'checkIn', 'checkOut'];

  dataSource: any[] = [];

  departments = ['HR', 'IT', 'Finance', 'Marketing'];

  filters = {
    employeeName: '',
    department: '',
    startDate: '',
    endDate: ''
  };

  constructor(
    private attendanceService: AttendanceService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadUnfilteredData();
  }

  applyFilters(): void {
    this.attendanceService.getManagerReports(this.filters).subscribe({
      next: (data: any[]) => {
        this.dataSource = data;
      },
      error: (err: any) => {
        console.error('Filter fetch error:', err);
        this.snackBar.open('Failed to apply filters.', 'Close', { duration: 3000 });
      }
    });
  }

  resetFilters(): void {
    this.filters = {
      employeeName: '',
      department: '',
      startDate: '',
      endDate: ''
    };
    this.loadUnfilteredData();
  }

  loadUnfilteredData(): void {
    this.attendanceService.getManagerReports({}).subscribe({
      next: (data: any[]) => {
        this.dataSource = data;
      },
      error: (err: any) => {
        console.error('Initial fetch error:', err);
        this.snackBar.open('Failed to load data.', 'Close', { duration: 3000 });
      }
    });
  }

  downloadFilteredExcel(): void {
    this.attendanceService.downloadExcel(this.filters).subscribe({
      next: blob => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'filtered_attendance.xlsx';
        link.click();
        window.URL.revokeObjectURL(url);
      },
      error: err => {
        console.error('Download failed:', err);
        this.snackBar.open('Excel download failed.', 'Close', { duration: 3000 });
      }
    });
  }
}
