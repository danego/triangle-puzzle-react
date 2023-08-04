import { createSlice } from "@reduxjs/toolkit";

interface ControlsState {
    borders: boolean;
    frame: boolean;
}

const initialState: ControlsState = {
    borders: true,
    // pieceIds,
    frame: true
};

const controls = createSlice({
    name: 'controls',
    initialState,
    reducers: {
        toggleBorders(state) {
            state.borders = !state.borders;
        },
        toggleFrame(state) {
            state.frame = !state.frame;
        }
    }
});

export default controls.reducer;
export const controlsActions = controls.actions;