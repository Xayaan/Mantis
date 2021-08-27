import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import store from '../store';
import { Dispatch, RootState, Thunk } from '../store';

interface VerifyIndexState {
    currentVerifyIndex: number
    currentBatchSize: number
}

const initialState: VerifyIndexState = {
    currentVerifyIndex: 0,
    currentBatchSize: 0
}

const VerifyIndexSlice = createSlice({
    name: 'VerifyIndex',
    initialState,
    reducers: {
        prevVerifyIndex: (state, action: PayloadAction<number>) => {
            if (state.currentVerifyIndex != 0) {
                state.currentVerifyIndex = state.currentVerifyIndex - 1 
            }
        },
        nextVerifyIndex: (state, action: PayloadAction<number>) => {
            if (state.currentVerifyIndex < state.currentBatchSize - 1) {
                state.currentVerifyIndex = 1
            }
        },
        setVerifyIndex: (state, action: PayloadAction<number>) => {
            const { payload } = action;
            state.currentVerifyIndex = payload;
        }
    }
})

export default VerifyIndexSlice.reducer

export const VerifyIndexSelector = (state: RootState) => state.verifyIndex;

const { prevVerifyIndex, nextVerifyIndex } = VerifyIndexSlice.actions;


export const toggleNextVerifyIndex = (): Thunk => (dispatch: Dispatch) => {
    const { currentVerifyIndex } = store.getState().verifyIndex;

    dispatch(nextVerifyIndex())
}

export const togglePrevVerifyIndex = (): Thunk => (dispatch: Dispatch) => {
    dispatch(prevVerifyIndex())
}