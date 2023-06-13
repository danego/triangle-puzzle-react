import { createSlice } from '@reduxjs/toolkit';

import { Piece } from '../types';
import puzzle from '../birds';


interface PiecesState {
    board: {
        // spot#
        [key: string]: {
            piece:  Piece | null;
            rotation: number | null;
        }
    },
}

const initialSpotState = {
    piece: null,
    rotation: 1,
  };
const initialState: PiecesState = {
    board: {
        spot0: initialSpotState,
        spot1: initialSpotState,
        spot2: initialSpotState,
        spot3: initialSpotState,
        spot4: initialSpotState,
        spot5: initialSpotState,
        spot6: initialSpotState,
        spot7: initialSpotState,
        spot8: initialSpotState,
        spot9: initialSpotState,
        spot10: initialSpotState,
        spot11: initialSpotState,
        spot12: initialSpotState,
        spot13: initialSpotState,
        spot14: initialSpotState,
        spot15: initialSpotState,
    }
};

const pieces = createSlice({
    name: 'pieces',
    initialState,
    reducers: {
        start(state) {
            for (const key in state.board) {
              const spotNumber = +key.replace('spot', '');
              state.board[key] = {
                piece: puzzle.pieces[spotNumber],
                rotation: 1,
              };
            }
        },
        rotate(state, action) {
            const spotId = 'spot' + action.payload;
            let newRotation;
            if (!state.board[spotId].rotation) {
                newRotation = 3;
            }
            else {
                newRotation = state.board[spotId]!.rotation! - 1;
            }
            if (newRotation < 1) {
                newRotation = 3;
            }
            state.board[spotId]!.rotation = newRotation;
        },

        loadSolution(state, action) {
            const trackingArray = action.payload;

            for (let i = 0; i < trackingArray.length; i++) {
                const piece = puzzle.pieces.find(p => p.id === trackingArray[i].id) as Piece;
                state.board['spot' + i] = {
                    piece,
                    rotation: trackingArray[i].firstEdge || 1,
                };
            }
        }
    }
});

export default pieces.reducer;
export const actions = pieces.actions;