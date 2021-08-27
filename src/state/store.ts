import { Action, combineReducers, configureStore } from '@reduxjs/toolkit';
import { ThunkAction } from 'redux-thunk';

import acceptGuidelinesReducer from './acceptGuidelines';
import batchUploadIndexReducer from './batchUpload/batchUploadIndex'
import dashboardReducer from './dashboard';
import verifyIndexReducer from './verify/verifyIndex'

const rootReducer = combineReducers({
    verifyIndex: verifyIndexReducer,
    batchUploadIndex: batchUploadIndexReducer,
    acceptGuidelines: acceptGuidelinesReducer,
    dashboard: dashboardReducer
});

const store = configureStore({
  reducer: rootReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export type Dispatch = typeof store.dispatch;
export type Thunk = ThunkAction<void, RootState, null, Action<string>>;

export default store;