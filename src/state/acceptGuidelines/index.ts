import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import store from '../store';
import { Dispatch, RootState, Thunk } from '../store';

interface AcceptedState {
  acceptedUpload: boolean,
}

const initialState: AcceptedState = {
  acceptedUpload: false,
};

const acceptGuidelinesSlice = createSlice({
    name: 'acceptGuidelines',
    initialState,
    reducers: {
      setAcceptedUpload: (state, action: PayloadAction<boolean>) => {
        const { payload } = action;
        console.log(`[state] setting accepted upload to ${payload}...`)
        state.acceptedUpload = payload;
      }
    }
  });

export default acceptGuidelinesSlice.reducer;

// Selectors
export const acceptGuidelinesSelector = (state: RootState) => state.acceptGuidelines;
  
// Actions
const { setAcceptedUpload } = acceptGuidelinesSlice.actions;

// Thunks
export const toggleAcceptedUpload = (): Thunk => (dispatch: Dispatch) => {
  const { acceptedUpload } = store.getState().acceptGuidelines;
  const acceptedStatus = acceptedUpload === acceptedUpload ? true : false;
  console.log(`[state] toggling accepted upload from ${acceptedUpload} to ${!acceptedStatus}...`)

  dispatch(setAcceptedUpload(acceptedStatus));
};