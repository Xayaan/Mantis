import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import store from '../store';
import { Dispatch, RootState, Thunk } from '../store';

interface DashboardState {
    cumulativeChartInterval: '1h' | '24h' | '7d' | '1m' | '3m' | '1y',
    tagChartsNumberOfPages: number
    tagChartsPostsPerPage: number
    tagChartsCurrentPage: number
}

const initialState: DashboardState = {
    cumulativeChartInterval: '7d',
    tagChartsNumberOfPages: 0,
    tagChartsPostsPerPage: 0,
    tagChartsCurrentPage: 0             // real page number, not an index.
}

const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {
        setInterval: (state, action: PayloadAction<'1h' | '24h' | '7d' | '1m' | '3m' | '1y'>) => {
            const { payload } = action;
            state.cumulativeChartInterval = payload;
        },
        setPostsPerPage: (state, action: PayloadAction<number>) => {

        },
        setNumberOfPages: (state, action: PayloadAction<number>) => {

        },
        setCurrentPage: (state, action: PayloadAction<number>) => {
            const { payload } = action;
            state.tagChartsCurrentPage = payload;
        }
    }
})

export default dashboardSlice.reducer

export const batchUploadIndexSelector = (state: RootState) => state.dashboard;

const { setInterval, setCurrentPage } = dashboardSlice.actions;

// thunks
export const changeInterval = (new_interval: '1h' | '24h' | '7d' | '1m' | '3m' | '1y'): Thunk => (dispatch: Dispatch) => {
    dispatch(setInterval(new_interval))
}

export const changeCurrentPage = (new_page: number): Thunk => (dispatch: Dispatch) => {
    dispatch(setCurrentPage(new_page))
}

export const nextPage = (): Thunk => (dispatch: Dispatch) => {
    const { tagChartsCurrentPage, tagChartsNumberOfPages } = store.getState().dashboard;
    
    if (tagChartsNumberOfPages != 0 && tagChartsCurrentPage > 0 && tagChartsCurrentPage < tagChartsNumberOfPages) {
        dispatch(setCurrentPage(tagChartsCurrentPage + 1))
    }
}

export const prevPage = (): Thunk => (dispatch: Dispatch) => {
    const { tagChartsCurrentPage, tagChartsNumberOfPages } = store.getState().dashboard;
    
    if (tagChartsNumberOfPages != 0 && tagChartsCurrentPage > 1) {
        dispatch(setCurrentPage(tagChartsCurrentPage - 1))
    }
}