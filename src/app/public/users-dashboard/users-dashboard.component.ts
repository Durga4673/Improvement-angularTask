import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatInput } from '@angular/material/input';
import { MatTableDataSource } from '@angular/material/table';
import { CreateEmployeeComponent } from 'src/app/admin/create-employee/create-employee.component';
import { AuthService } from 'src/app/services/auth.service';
import { EmployeeDataService } from 'src/app/services/employee-data.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-users-dashboard',
  templateUrl: './users-dashboard.component.html',
  styleUrls: ['./users-dashboard.component.css']
})
export class UsersDashboardComponent {

  value = '';

  @ViewChild('input') filterInput!: MatInput;
  // details:any[]=[];
  employees:any[]=[];
  // filteredDetails: any[] = [];
  displayedColumns: string[] = ['Id', 'Name', 'Email', 'Mobile','EmployeeActivateDate', 'EmployeeDOB', 'TaskId', 'TaskStartDate','TaskEndDate','icon'];
  dataSourceList!: MatTableDataSource<any[]>;
  loggedIn = false; // Initially, the user is not logged in
  loggedInUser: any; // To store user details when logged in

  constructor( private authService: AuthService,
    private http: HttpClient,
    public dialog: MatDialog,
    private _empService: EmployeeDataService,
    private _toastService: ToastService){ }

  logout(){
    this._toastService.openSnackBar('Logout Successfully', 'done');
    this.authService.logout();

  }
  ngOnInit() {
    this.candidate_details();
    const getUsername = localStorage.getItem('session');
    if (getUsername) {
      this.loggedIn = true;
      this.loggedInUser = JSON.parse(getUsername);
    }
  }
  candidate_details() {
      this._empService.getEmployeeList().subscribe({
        next: (res) => {
          console.log(res);
          this.dataSourceList = new MatTableDataSource(res);
        },
         error:(err) => {
          console.log(err);
         }
      })
  }
  openDialog() {
    // Allow only admin to open the dialog for creating/editing employees
    if (this.canEditOrDelete()) {
      let dialogRef = this.dialog.open(CreateEmployeeComponent, {
        height: '58%',
        width: '50%',
      });
      dialogRef.afterClosed().subscribe(() => {
        console.log('close event');
        this.candidate_details();
      });
    } else {
      // Display a message or perform some other action for non-admin users
      console.log('Permission denied');
      this._toastService.openSnackBar('Permission denied', '');

    }
  }
  applyFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSourceList.filter = filterValue;
  }
  deleteEmployee(id: number) {
    // Allow only admin to delete employees
    if (this.canEditOrDelete()) {
      this._empService.deleteEmployeeList(id).subscribe({
        next: (res) => {
          console.log(res);
          this._toastService.openSnackBar('employee deleted', 'done');
          this.candidate_details();
        },
        error: (err) => {
          console.log(err);
        }
      });
    } else {
      // Display a message or perform some other action for non-admin users
      console.log('Permission denied');
      this._toastService.openSnackBar('Permission denied', '');
    }
  }
  UpdateEmployee(data: any) {
    if (this.canEditOrDelete()) {
      const dialogRef = this.dialog.open(CreateEmployeeComponent, {
        data,
      });
      dialogRef.afterClosed().subscribe({
        next: (val) => {
          if (val) {
            this.candidate_details();
          }
        },
        error: (err) => {
          console.log(err);
          this._toastService.openSnackBar('Permission denied', '');
        }
      });
    }
  }

 canEditOrDelete(): boolean {
  // Check if the logged-in user is an admin
  return this.authService.isLoggedIn && this.authService.loggedInUser.role === 'admin';
}

}
