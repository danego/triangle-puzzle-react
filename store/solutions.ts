import { createSlice } from '@reduxjs/toolkit';

import { TrackingArray, SolutionTypes } from '../types';
import { actions as boardActions } from './pieces';

type SolutionType = SolutionTypes.default | SolutionTypes.framed | SolutionTypes.frameless;

export interface SolutionsState {
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
        setSolution(state, action) {
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
        storeSolutions(state, action) {
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
    //@ts-ignore
    return (dispatch, getState) => {
        const solutionsState = getState().solutions;
        dispatch(solutionsActions.setSolution(payload));

        if (payload.type === SolutionTypes.default) {
        }
        else if (payload.type === SolutionTypes.framed) {
            // fix rotation values from triangle here
            dispatch(boardActions.loadSolution(solutionsState.allSolutionsFramed[payload.number]));
        }
        else if (payload.type === SolutionTypes.frameless) {
            dispatch(boardActions.loadSolution(solutionsState.allSolutionsFrameless[payload.number]));
        }
    }
}