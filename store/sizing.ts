import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";

const STARTING_TRIANGLE_SIZE = 101;
const HEIGHT_TO_TRIANGLE_RATIO = .866;
const TRIANGLE_INNER_CIRCLE_DIAMETER = .577;
const EDGE_TO_TRIANGLE_RATIO = 1/4;
const FRAME_SIZE_INCREASE_RATIO = 1.008;
const FRAME_HEIGHT_TO_TRIANGLE_RATIO = 3/8;
const FRAME_POSITION_ADJUSTMENT_RATIO = .0027;
const STARTING_GRAB_HANDLE_MARGIN_RATIO = -.0372;
// Spacing / Margin
export const GRAB_HANDLE_TOP_RATIO = .269;
export const GRAB_HANDLE_TOP_RATIO_ODD = -.02;
export const TRIANGLE_CLASS_RIGHT_RATIO = -.2145;


export interface SizingState {
    screenWidth: number;
    triangleSize: number;  // triangle side
    triangleHeight: number;
    grabHandleDiameter: number;
    edgeSize: number;
    boardRowsTop: { [key: string]: number };
    pieceBorderHeight: number;
    frameBorderHeight: number;
    grabHandleMarginRatio: number;
    meshingFactor: number;
    frameWidth: number;
    frameHeight: number;
    frameEdgeLeftPosition: number;
    frameEdgeRightPosition: number;
    frameEdgeLRPositionBottom: number;  // for left, right frame edge - bottom value
    frameEdgeBottomPositionBottom: number;  // for bottom frame edge - bottom value, range -1 -> 1
}

const initialState: SizingState = {
    screenWidth: 0,
    triangleSize: STARTING_TRIANGLE_SIZE,
    triangleHeight: +(STARTING_TRIANGLE_SIZE * HEIGHT_TO_TRIANGLE_RATIO).toFixed(4),
    grabHandleDiameter: +(STARTING_TRIANGLE_SIZE * TRIANGLE_INNER_CIRCLE_DIAMETER).toFixed(1) -.1,
    edgeSize: +(STARTING_TRIANGLE_SIZE * EDGE_TO_TRIANGLE_RATIO).toFixed(1),
    boardRowsTop: {
        child1: -2,
        child2: -1,
        child3: 0,
        child4: 1
    },
    pieceBorderHeight: 2,
    frameBorderHeight: 4,
    grabHandleMarginRatio: STARTING_GRAB_HANDLE_MARGIN_RATIO,
    meshingFactor: 1,
    frameWidth: +(STARTING_TRIANGLE_SIZE * 4 * FRAME_SIZE_INCREASE_RATIO).toFixed(0),
    frameHeight: +(STARTING_TRIANGLE_SIZE * FRAME_HEIGHT_TO_TRIANGLE_RATIO).toFixed(0),
    frameEdgeLeftPosition: +(STARTING_TRIANGLE_SIZE * FRAME_SIZE_INCREASE_RATIO * (1 - FRAME_POSITION_ADJUSTMENT_RATIO)).toFixed(1),
    frameEdgeRightPosition: +(STARTING_TRIANGLE_SIZE * FRAME_SIZE_INCREASE_RATIO * (1 + FRAME_POSITION_ADJUSTMENT_RATIO)).toFixed(1),
    frameEdgeLRPositionBottom: +(
        (STARTING_TRIANGLE_SIZE * HEIGHT_TO_TRIANGLE_RATIO * 2 * FRAME_SIZE_INCREASE_RATIO + STARTING_TRIANGLE_SIZE * FRAME_HEIGHT_TO_TRIANGLE_RATIO) *
        (1 + FRAME_POSITION_ADJUSTMENT_RATIO)).toFixed(1),
    frameEdgeBottomPositionBottom: +(-1 + (STARTING_TRIANGLE_SIZE - 100) / 100).toFixed(1),
};

const sizingSlice = createSlice({
    name: 'sizing',
    initialState,
    reducers: {
        changeSize(state, action: PayloadAction<number>) {
            state.screenWidth = action.payload;
        },
        // create function for updating all vars - or make triangleSize a getter
        setTriangleSize(state, action: PayloadAction<number>) {
            const newTriangleSize = action.payload;
            state.triangleSize = newTriangleSize;
            state.triangleHeight = +(newTriangleSize * HEIGHT_TO_TRIANGLE_RATIO).toFixed(4);
            state.grabHandleDiameter = +(newTriangleSize * TRIANGLE_INNER_CIRCLE_DIAMETER).toFixed(1) -.1;
            state.edgeSize = +(newTriangleSize * EDGE_TO_TRIANGLE_RATIO).toFixed(1);
            state.frameWidth = +(newTriangleSize * 4 * FRAME_SIZE_INCREASE_RATIO).toFixed(0);
            state.frameHeight = +(newTriangleSize * FRAME_HEIGHT_TO_TRIANGLE_RATIO).toFixed(0);
            state.frameEdgeLeftPosition = +(newTriangleSize * FRAME_SIZE_INCREASE_RATIO * (1 - FRAME_POSITION_ADJUSTMENT_RATIO)).toFixed(1);
            state.frameEdgeRightPosition = +(newTriangleSize * FRAME_SIZE_INCREASE_RATIO * (1 + FRAME_POSITION_ADJUSTMENT_RATIO)).toFixed(1);
            state.frameEdgeLRPositionBottom = +((state.triangleHeight * 2 * FRAME_SIZE_INCREASE_RATIO + state.frameHeight) * (1 + FRAME_POSITION_ADJUSTMENT_RATIO)).toFixed(1);
            state.frameEdgeBottomPositionBottom = +(-1 + (newTriangleSize - 100) / 100).toFixed(1);
        },
        increaseMeshingFactor(state, action) {
            const meshingFactorDifference = state.meshingFactor - action.payload;
            state.grabHandleMarginRatio = +(state.grabHandleMarginRatio + meshingFactorDifference / 1000).toFixed(4);
            state.meshingFactor = action.payload;
        },
    }
});

export default sizingSlice.reducer;
export const sizingActions = sizingSlice.actions;


export const changeSize = () => {
    return (dispatch: Dispatch<any>) => {
        const maximumTriangleSizeByWidth = window.innerWidth / 5;
        const maximumTriangleSizeByHeight = window.innerHeight / HEIGHT_TO_TRIANGLE_RATIO / 5;

        let maximumTriangleSize = maximumTriangleSizeByWidth < maximumTriangleSizeByHeight ? maximumTriangleSizeByWidth : maximumTriangleSizeByHeight;
        maximumTriangleSize = Math.floor(maximumTriangleSize);
        if (maximumTriangleSize % 2 === 0) maximumTriangleSize -= 1;

        dispatch(sizingActions.setTriangleSize(maximumTriangleSize));
    };
}