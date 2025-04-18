import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

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

  constructor(private http: HttpClient) {}

  fetchHistory(): void {
    if (!this.employeeId.trim()) return;

    this.http.get<any[]>(`http://localhost:3000/api/history/${this.employeeId}`).subscribe({
      next: data => {
        if (data.length > 0) {
          this.employeeName = data[0].employee_name; // ✅ capture name from first row
          this.dataSource = data;
          this.showTable = true;
        } else {
          this.employeeName = '';
          this.dataSource = [];
          this.showTable = false;
        }
      }
    });
  }
}
