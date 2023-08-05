import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const STARTING_TRIANGLE_SIZE = 201;
const HEIGHT_TO_TRIANGLE_RATIO = .866;
const TRIANGLE_INNER_CIRCLE_DIAMETER = .577;
const EDGE_TO_TRIANGLE_RATIO = 1/4;

// Spacing / Margin
export const GRAB_HANDLE_TOP_RATIO = .269;
export const GRAB_HANDLE_TOP_RATIO_ODD = -.02;
export const TRIANGLE_CLASS_RIGHT_RATIO = -.2145;


interface SizingState {
    screenWidth: number;
    triangleSize: number;  // = triangle side
    triangleHeight: number;
    grabHandleDiameter: number;
    edgeSize: number;
    boardRowsTop: { [key: string]: number };
    pieceBorderHeight: number;
    grabHandleMarginRatio: number;  // meshing factor
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
    grabHandleMarginRatio: -.0372,
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

        // TESTING - manual changes
        // create function for updating all vars - or make triangleSize a getter
        setTriangleSize(state, action: PayloadAction<number>) {
            state.triangleSize = action.payload;
            state.triangleHeight = state.triangleSize * HEIGHT_TO_TRIANGLE_RATIO;
            state.grabHandleDiameter = state.triangleSize * TRIANGLE_INNER_CIRCLE_DIAMETER -.1;
            state.edgeSize = state.triangleSize * EDGE_TO_TRIANGLE_RATIO;
        },
        decrement(state) {
            // DOUBLE CHECK that this state change is immediate
            state.triangleSize -= 5;
            state.triangleHeight = state.triangleSize * HEIGHT_TO_TRIANGLE_RATIO;
            state.grabHandleDiameter = state.triangleSize * TRIANGLE_INNER_CIRCLE_DIAMETER -.1;
            state.edgeSize = state.triangleSize * EDGE_TO_TRIANGLE_RATIO;
        },
        increment(state) {
            state.triangleSize += 5;
            state.triangleHeight = state.triangleSize * HEIGHT_TO_TRIANGLE_RATIO;
            state.grabHandleDiameter = state.triangleSize * TRIANGLE_INNER_CIRCLE_DIAMETER -.1;
            state.edgeSize = state.triangleSize * EDGE_TO_TRIANGLE_RATIO;
        },
        increaseGrabHandleMargin(state, action) {
            state.grabHandleMarginRatio = +(state.grabHandleMarginRatio + action.payload).toFixed(4);
        },
    }
});

export default sizingSlice.reducer;
export const sizingActions = sizingSlice.actions;