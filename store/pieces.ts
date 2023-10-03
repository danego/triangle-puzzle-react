import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Half, Piece, TrackingArray } from '../types';
import puzzle from '../birds';


// controls actual position of pieces in bank or on board, from solution or user drag&drop
interface PiecesState {
    board: {
        // spot#
        [key: string]: {
            piece:  Piece | null;
            rotation: number | null;
        }
    };
    bank: {
        piece:  Piece;
        rotation: number | null;
    } [];
    isDragging: {
        piece: Piece,
        rotation: number,
        spot: number,
        bank?: boolean
    } | null;
}

const initialSpotState = {
    piece: null,
    rotation: 1,
};
const initialBoardState = {
    spot0: initialSpotState,
    spot1: initialSpotState,
    spot2: initialSpotState,
    spot3: initialSpotState,
    spot4: initialSpotState,
    spot5: initialSpotState,
    spot6: initialSpotState,
    spot7: initialSpotState,
    spot8: initialSpotState,
    // spot9: initialSpotState,
    spot9: {
        piece: {
            id: 1,
            edge1: {
                type: 'F',
                half: 'top' as Half
            },
            edge2: {
                type: 'V',
                half: 'top' as Half
            },
            edge3: {
                type: 'C',
                half: 'top' as Half
            },
        },
        rotation: 1
    },
    spot10: initialSpotState,
    spot11: initialSpotState,
    spot12: initialSpotState,
    spot13: initialSpotState,
    spot14: initialSpotState,
    spot15: initialSpotState,
};
const initialState: PiecesState = {
    board: initialBoardState,
    bank: [],
    isDragging: null
};

const pieces = createSlice({
    name: 'pieces',
    initialState,
    reducers: {
        rotate(state, action: PayloadAction<{ id: number, bank?: boolean }>) {
            let newRotation;
            const spotId = 'spot' + action.payload.id;
            // let newRotation;
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
        loadSolution(state, action: PayloadAction<TrackingArray>) {
            const trackingArray = action.payload;

            for (let i = 0; i < trackingArray.length; i++) {
                const piece = puzzle.pieces.find(p => p.id === trackingArray[i].id) as Piece;
                state.board['spot' + i] = {
                    piece,
                    rotation: trackingArray[i].firstEdge || 1,
                };
            }
        },
        loadDefault(state) {
            for (const key in state.board) {
                const spotNumber = +key.replace('spot', '');
                state.board[key] = {
                  piece: puzzle.pieces[spotNumber],
                  rotation: 1,
                };
            }
        },
        loadEmpty(state) {
            state.board = initialBoardState;
        },

        // --------------------------------
        // DRAG & DROP
        // source and target

        dragEndedInBank(state) {
            state.bank.push({
                piece: state.isDragging!.piece,
                rotation: 1
            });
            state.board['spot' + state.isDragging?.spot] = initialSpotState;

            // reset isDragging
            state.isDragging = null;
        },
        dragEndedInSpot(state, action: PayloadAction<number>) {
            const spotNumber = action.payload;

            // deal with spot already filled - eventually
            // check if spot is free for drop
            if (state.board['spot' + spotNumber].piece) {
                // reset isDragging
                state.board['spot' + state.isDragging!.spot] = {
                    piece: state.isDragging!.piece,
                    rotation: 1
                };
                state.isDragging = null;
                return;
            }


            state.board['spot' + spotNumber] = {
                piece: state.isDragging?.piece!,
                rotation: 1
            };

            // reset source spot
            if (state.isDragging?.bank) {
                state.bank.splice(state.isDragging?.spot, 1);
            }
            else {
                state.board['spot' + state.isDragging?.spot] = initialSpotState;
            }
            // reset isDragging
            state.isDragging = null;
        },
        // event comes from drag element
        dragEnded(state) {
            if (state.isDragging) {
                console.log('drag enedeed in STORE');
                // reset isDragging
                state.board['spot' + state.isDragging!.spot] = {
                    piece: state.isDragging!.piece,
                    rotation: 1
                };
                state.isDragging = null;
                return;
            }
        },

        // started from spot/bank
        dragStarted(state, action: PayloadAction<{ piece: Piece, rotation: any, spot: number, bank?: boolean }>) {
            const spotNumber = action.payload.spot;

            // ^ store spot location in state
            // then restore if cancelled


            console.log(action.payload.piece);
            console.log(action.payload.spot);

            // remove piece from source spot
            // state.board['spot' + spotNumber] = initialSpotState;

            state.isDragging = {
                piece: action.payload.piece,
                rotation: action.payload.rotation,
                spot: action.payload.spot,
                bank: action.payload.bank
            }
        }
    }
});

export default pieces.reducer;
export const actions = pieces.actions;