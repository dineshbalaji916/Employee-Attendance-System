import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AttendanceService } from '../../services/attendance.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule
  ],
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent {
  employeeId: string = '';
  employeeName: string = '';
  displayedColumns: string[] = ['date', 'department', 'checkIn', 'checkOut'];
  dataSource: any[] = [];
  showTable = false;

  constructor(
    private attendanceService: AttendanceService,
    private snackBar: MatSnackBar
  ) {}

  fetchHistory(): void {
    if (!this.employeeId.trim()) {
      this.snackBar.open('Please enter an Employee ID', 'Close', {
        duration: 3000,
        panelClass: 'snackbar-error'
      });
      return;
    }

    this.attendanceService.getHistory(this.employeeId).subscribe({
      next: data => {
        if (data.length > 0) {
          this.employeeName = data[0].employee_name;
          this.dataSource = data;
          this.showTable = true;
        } else {
          this.employeeName = '';
          this.dataSource = [];
          this.showTable = false;
          this.snackBar.open('No records found.', 'Close', { duration: 3000 });
        }
      },
      error: err => {
        console.error('History fetch error:', err);
        this.snackBar.open('Error fetching history', 'Close', { duration: 3000 });
      }
    });
  }
}
