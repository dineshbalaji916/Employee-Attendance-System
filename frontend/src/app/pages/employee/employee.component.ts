import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckInFormComponent } from '../../components/check-in-form/check-in-form.component';
import { CheckOutFormComponent } from '../../components/check-out-form/check-out-form.component';
import { HistoryComponent } from '../../components/history/history.component';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    CheckInFormComponent,
    CheckOutFormComponent,
    HistoryComponent,
    MatIconModule
  ],
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent {
  activeTab: 'checkin' | 'checkout' | 'history' = 'checkin';
}
