import { configureStore } from '@reduxjs/toolkit';

import piecesReducer from './pieces';
import solutionsReducer from './solutions';
import controlsReducer from './controls';
import sizingReducer from './sizing';

const store = configureStore({
  reducer: {
    pieces: piecesReducer,
    solutions: solutionsReducer,
    // controls (ie show frame, show piece IDs, ...),
    controls: controlsReducer,
    sizing: sizingReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
