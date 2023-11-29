import { createReducer, on } from '@ngrx/store';
import * as DataActions from './data.actions';

export interface DataState {
  data: any[];
  loading: boolean;
  error: any;
}
export const initialState: DataState = {
  data: [],
  loading: false,
  error: null,
};

  export const userReducer = createReducer(
    initialState,
    on(DataActions.loadData, (state) => ({ ...state, loading: true, error: null })),
    on(DataActions.loadDataSuccess, (state, { data }) => ({ ...state, data, loading: false })),
    on(DataActions.loadDataFailure, (state, { error }) => ({ ...state, loading: false, error }))
  );
