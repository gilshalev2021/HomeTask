import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

const initialState: any = {
  pastQueries: [],
  queryResults: [],
  currentQueryString: '',
  currentTerm: '',
  currentPage: 0,
};

const queriesSlice = createSlice({
  name: 'queries',
  initialState,
  reducers: {
    setQueryResults: (state, action: PayloadAction<[]>): void => {
      state.queryResults = action.payload;
    },
    setCurrentQueryString: (state, action: PayloadAction<string>): void => {
      state.currentQueryString = action.payload;
    },
    setPastQueries: (state, action: PayloadAction<string>): void => {
      state.pastQueries = action.payload;
    },
    addQuery: (state, action: PayloadAction<string>): void => {
      state.pastQueries = [...state.pastQueries, action.payload];
    },
    setCurrentTerm: (state, action: PayloadAction<string>): void => {
      state.currentTerm = action.payload;
    },
    setCurrentPage:(state, action: PayloadAction<number>): void => {
      state.currentPage = action.payload;
    },
  },
});

export const {setQueryResults, setCurrentQueryString, setPastQueries, addQuery, setCurrentTerm, setCurrentPage} = queriesSlice.actions;
export const selectQueriesState = (state: RootState) => state.queries;
export default queriesSlice.reducer;
