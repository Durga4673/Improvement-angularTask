import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeDataService {

  constructor(private _http: HttpClient) { }


  addEmployee(data: any): Observable<any>{
    return this._http.post('http://localhost:3000/employeesData', data);
  }
  updateEmployee(id: number, data: any): Observable<any>{
    return this._http.put(`http://localhost:3000/employeesData/${id}`, data);
  }

  getEmployeeList(): Observable<any>{
    return this._http.get('http://localhost:3000/employeesData');
  }

  deleteEmployeeList(Id: number){
    return this._http.delete(`http://localhost:3000/employeesData/${Id}`)
  }
}
