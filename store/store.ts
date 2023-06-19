import { configureStore } from '@reduxjs/toolkit';

import piecesReducer from './pieces';
import solutionsReducer from './solutions';

const store = configureStore({
  reducer: {
    pieces: piecesReducer,
    solutions: solutionsReducer,
    // controls (ie show frame)
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
