import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EmployeeDataService } from 'src/app/services/employee-data.service';
import { ToastService } from 'src/app/services/toast.service';
import { IEmployeeDetails } from '../employee-interface';
@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css'],
})
export class CreateEmployeeComponent implements OnInit {
  employeeForm: FormGroup;
  employees: any[] = [];
  constructor(
    private fb: FormBuilder,
    private _toastService: ToastService,
    private _dialogRef: MatDialogRef<CreateEmployeeComponent>,
    private _empService: EmployeeDataService,
    @Inject(MAT_DIALOG_DATA) public data: IEmployeeDetails
  ) {
    this.employeeForm = this.fb.group({
      Id: ['', Validators.required],
      Name: ['', Validators.required],
      Email: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
      Mobile: [
        '',
        [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')],
      ],
      EmployeeActivateDate: ['', Validators.required],
      EmployeeDOB: ['', Validators.required],
      TaskId: ['', Validators.required],
      TaskStartDate: ['', Validators.required],
      TaskEndDate: ['', Validators.required],
    });
  }


  // In this code, if there is data in 'canidateDetails' in localStorage, it will be parsed as an array, and if there is no data, this.employees will be initialized as an empty array.

  ngOnInit(): void {
    const storedData = localStorage.getItem('canidateDetails');
    this.employees = storedData ? JSON.parse(storedData) : [];
    this.employeeForm.patchValue(this.data);
  }

  // onSubmit() {
  //   if (this.employeeForm.valid) {
  //     // console.log(this.employeeForm.value);
  //     this.employees.push(this.employeeForm.value);
  //     localStorage.setItem('canidateDetails', JSON.stringify(this.employees));
  //     this._empService.updateEmployee(this.employeeForm.value).subscribe({
  //       next: (val: any) => {
  //         this._toastService.openSnackBar('Employee Added Successfully', 'done');
  //         this._dialogRef.close();
  //       },
  //       error: (err: any) => {
  //         console.error(err)
  //       },
  //     })

  //   } else {
  //     // Show an error message when the form is invalid
  //     this._toastService.openSnackBar('Please fill out all required fields.', 'close');
  //   }
  // }

  onSubmit() {
    if (this.employeeForm.valid) {
      if (this.data) {
        this.employees.push(this.employeeForm.value);
        localStorage.setItem('canidateDetails', JSON.stringify(this.employees));
        this._empService
          .updateEmployee(this.data.id, this.employeeForm.value)
          .subscribe({
            next: (val: any) => {
              console.log('update employee')
              this._toastService.openSnackBar(
                'Employee updated Successfully',
                'done'
              );
              this._dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      } else {
        this.employees.push(this.employeeForm.value);
        localStorage.setItem('canidateDetails', JSON.stringify(this.employees));
        this._empService.addEmployee(this.employeeForm.value).subscribe({
          next: (val: any) => {
            this._toastService.openSnackBar(
              'Employee Added Successfully',
              'done'
            );
            this._dialogRef.close();
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      }
    }
  }
}
