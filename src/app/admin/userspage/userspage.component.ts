import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/auth.service';
import { CreateEmployeeComponent } from '../create-employee/create-employee.component';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { ToastService } from 'src/app/toast.service';
import { EmployeeDataService } from 'src/app/services/employee-data.service';
import { MatInput } from '@angular/material/input';


export interface PeriodicElement {
  ID: number;
  NAME: string;
  EMAIL: string;
  MOBILE: string;
  EmployeeActivateDate: Date;
  EmployeeDOB: Date;
  TaskId: number;
  TaskStartDate: Date;
  TaskEndDate: Date;
}

@Component({
  selector: 'app-userspage',
  templateUrl: './userspage.component.html',
  styleUrls: ['./userspage.component.css']
})
export class UserspageComponent {

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
    // fetching the username from the local storage and store in getUsername
    const getUsername = localStorage.getItem('session');
    if (getUsername) {
      this.loggedIn = true;
      this.loggedInUser = JSON.parse(getUsername);
    }
  }


  candidate_details() {
    // this.http.get<any[]>('../../../assets/json-data/dummy-details.json').subscribe((data:any) => {
    //   this.dataSourceList = data;
    //   localStorage.setItem('canidateDetails',JSON.stringify(data));

    // });

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
    let dialogRef = this.dialog.open(CreateEmployeeComponent, {
      height: '58%',
      width: '50%',
    });
    dialogRef.afterClosed().subscribe(()=>{
      console.log('close event');
      this.candidate_details();
      // this.dataSourceList = JSON.parse(localStorage.getItem('canidateDetails')  || '{}');
    });
  }


  // for the local storage DataList
  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
  //   this.details = this.details.filter((item) => {
  //     return (
  //       item.Name.toLowerCase().includes(filterValue) ||
  //       item.Email.toLowerCase().includes(filterValue) ||
  //       item.Mobile.includes(filterValue)
  //     );
  //   });
  // }


  applyFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSourceList.filter = filterValue;
  }



  // deleteEmployee(Id: number){
  //   const confirmed = confirm('Do you want to delete this employee?');
  //   if (confirmed) {
  //     const storedData = localStorage.getItem('canidateDetails');
  //     if (storedData) {
  //       const employees = JSON.parse(storedData);
  //       console.log(employees)
  //       const index = employees.findIndex((employee: any) => employee.Id === Id);
  //       if (index !== -1) {
  //         // Remove the employee from the array
  //         employees.splice(index, 1);
  //         this._toastService.openSnackBar('employee deleted', 'done');
  //            // Update the localStorage with the modified array
  //       localStorage.setItem('canidateDetails', JSON.stringify(employees));
  //       // Update your local variable (this.details) with the latest data
  //       this.candidate_details();
  //     }
  //     }
  //   }
  // }
  deleteEmployee(id: number){
    this._empService.deleteEmployeeList(id).subscribe({
      next: (res) => {
        console.log(res);
        this._toastService.openSnackBar('employee deleted', 'done');
        this.candidate_details();
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  UpdateEmployee( data: any){
    const dialogRef = this.dialog.open(CreateEmployeeComponent, {
    data,
   });
   dialogRef.afterClosed().subscribe({
    next: (val) => {
      if(val){
        this.candidate_details();
      }
    },
   });
 }
}
