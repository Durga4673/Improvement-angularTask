// data.effects.ts

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as DataActions from './data.actions';
import { EmployeeDataService } from 'src/app/services/employee-data.service';

@Injectable()
export class DataEffects {


  constructor(
    private actions$: Actions,
    private employeeDataService: EmployeeDataService
  ) {}

  loadData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DataActions.loadData),
      switchMap(() =>
        this.employeeDataService.getEmployeeList().pipe(
          map((data) => DataActions.loadDataSuccess({ data })),
          catchError((error) => of(DataActions.loadDataFailure({ error })))
        )
      )
    )
  );


}
