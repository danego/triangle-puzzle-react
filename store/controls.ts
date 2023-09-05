import { createSlice } from "@reduxjs/toolkit";

interface ControlsState {
    borders: boolean;
    frame: boolean;
    pieceIds: boolean;
}

const initialState: ControlsState = {
    borders: true,
    frame: true,
    pieceIds: true,
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
        },
        togglePieceIds(state) {
            state.pieceIds = !state.pieceIds;
        }
    }
});

export default controls.reducer;
export const controlsActions = controls.actions;