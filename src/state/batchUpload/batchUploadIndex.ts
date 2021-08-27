import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import store from '../store';
import { Dispatch, RootState, Thunk } from '../store';

interface BatchUploadIndexState {
    currentBatchUploadIndex: number
    currentBatchSize: number
}

const initialState: BatchUploadIndexState = {
    currentBatchUploadIndex: 0,
    currentBatchSize: 0
}

const batchUploadIndexSlice = createSlice({
    name: 'batchUploadIndex',
    initialState,
    reducers: {
        prevBatchUploadIndex: (state, action: PayloadAction<number>) => {
            if (state.currentBatchUploadIndex != 0) {
                state.currentBatchUploadIndex = state.currentBatchUploadIndex - 1 
            }
        },
        nextBatchUploadIndex: (state, action: PayloadAction<number>) => {
            if (state.currentBatchUploadIndex < state.currentBatchSize - 1) {
                state.currentBatchUploadIndex = 1
            }
        },
        setBatchUploadIndex: (state, action: PayloadAction<number>) => {
            const { payload } = action;
            state.currentBatchUploadIndex = payload;
        }
    }
})

export default batchUploadIndexSlice.reducer

export const batchUploadIndexSelector = (state: RootState) => state.batchUploadIndex;

const { prevBatchUploadIndex, nextBatchUploadIndex } = batchUploadIndexSlice.actions;


export const toggleNextBatchUploadIndex = (): Thunk => (dispatch: Dispatch) => {
    const { currentBatchUploadIndex } = store.getState().batchUploadIndex;

    dispatch(nextBatchUploadIndex())
}

export const togglePrevBatchUploadIndex = (): Thunk => (dispatch: Dispatch) => {
    dispatch(prevBatchUploadIndex())
}