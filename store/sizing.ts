import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const STARTING_TRIANGLE_SIZE = 201;
const HEIGHT_TO_TRIANGLE_RATIO = .866;
const TRIANGLE_INNER_CIRCLE_DIAMETER = .577;
const EDGE_TO_TRIANGLE_RATIO = 1/4;

// Spacing/margin CONSTANTS
export const GRAB_HANDLE_MARGIN_RATIO = -.0372;
export const GRAB_HANDLE_TOP_RATIO = .269;
export const GRAB_HANDLE_TOP_RATIO_ODD = -.02;
export const TRIANGLE_CLASS_RIGHT_RATIO = -.21;


interface SizingState {
    screenWidth: number;
    triangleSize: number;
    triangleHeight: number;
    grabHandleDiameter: number;
    edgeSize: number;
    boardRowsTop: { [key: string]: number };
    pieceBorderHeight: number;
}

const initialState: SizingState = {
    screenWidth: 0,
    triangleSize: STARTING_TRIANGLE_SIZE,
    triangleHeight: STARTING_TRIANGLE_SIZE * HEIGHT_TO_TRIANGLE_RATIO,
    grabHandleDiameter: STARTING_TRIANGLE_SIZE * TRIANGLE_INNER_CIRCLE_DIAMETER -.1,
    edgeSize: STARTING_TRIANGLE_SIZE * EDGE_TO_TRIANGLE_RATIO,
    boardRowsTop: {
        child1: -2,
        child2: -1,
        child3: 0,
        child4: 1
    },
    pieceBorderHeight: 2,

};

const sizingSlice = createSlice({
    name: 'sizing',
    initialState,
    reducers: {
        changeSize(state, action: PayloadAction<number>) {
            state.screenWidth = action.payload;

            // calculate triangle size based on space available / 7
            // state.triangleSize += 5;
            state.triangleHeight = state.triangleSize * HEIGHT_TO_TRIANGLE_RATIO;
            state.grabHandleDiameter = state.triangleSize * TRIANGLE_INNER_CIRCLE_DIAMETER -.1;
            state.edgeSize = state.triangleSize * EDGE_TO_TRIANGLE_RATIO;
        },
    }
});

export default sizingSlice.reducer;
export const sizingActions = sizingSlice.actions;