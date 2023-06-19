import { generateHorizontalTrackingArray } from '@/RowLoaderService';
import { Action, ActionCreator, createSlice, Dispatch, PayloadAction, ThunkAction, ThunkDispatch } from '@reduxjs/toolkit';

import { TrackingArray, SolutionTypes } from '../types';
import { actions as pieceActions } from './pieces';

type SolutionType = SolutionTypes.default | SolutionTypes.framed | SolutionTypes.frameless;

interface PayloadType {
    type: SolutionType;
    number: number
}

interface SolutionsState {
    type: SolutionType | '';
    solutionNumber: number;
    solution: TrackingArray;
    allSolutionsFramed: TrackingArray[];
    allSolutionsFrameless: TrackingArray[];
}

const initialState: SolutionsState = {
    type: '',
    solutionNumber: -1,
    solution: [],
    allSolutionsFramed: [],
    allSolutionsFrameless: [],
};

const solutions = createSlice({
    name: 'solutions',
    initialState,
    reducers: {
        setSolution(state, action: PayloadAction<PayloadType>) {
            state.type = action.payload.type;
            state.solutionNumber = action.payload.number;

            if (action.payload.type === SolutionTypes.default) {
                // state.solution =
                // load in no pieces
                // or load in 0 -> 15
            }
            else if (action.payload.type === SolutionTypes.framed) {
                state.solution = state.allSolutionsFramed[action.payload.number];
            }
            else if (action.payload.type === SolutionTypes.frameless) {
                state.solution = state.allSolutionsFrameless[action.payload.number];
            }
        },
        storeSolutions(state, action: PayloadAction<{type: SolutionType, solutions: TrackingArray[]}>) {
            if (action.payload.type === SolutionTypes.framed) {
                state.allSolutionsFramed = action.payload.solutions;
            }
            else if (action.payload.type === SolutionTypes.frameless) {
                state.allSolutionsFrameless = action.payload.solutions;
            }
        }
    }
});

export default solutions.reducer;
export const solutionsActions = solutions.actions;


export const loadSolution = (payload: any) => {
    return (dispatch: Dispatch<any>, getState: any) => {
        const solutionsState = getState().solutions;
        dispatch(solutionsActions.setSolution(payload));

        if (payload.type === SolutionTypes.default) {
            if (payload.number === -1) {
                dispatch(pieceActions.loadEmpty());
            }
            else if (payload.number === 0) {
                dispatch(pieceActions.loadDefault());
            }
        }
        else if (payload.type === SolutionTypes.framed) {
            const trackingArray = solutionsState.allSolutionsFramed[payload.number];
            const trackingArrayHorizontal = generateHorizontalTrackingArray(trackingArray);
            dispatch(pieceActions.loadSolution(trackingArrayHorizontal));
        }
        else if (payload.type === SolutionTypes.frameless) {
            dispatch(pieceActions.loadSolution(solutionsState.allSolutionsFrameless[payload.number]));
        }
    }
}