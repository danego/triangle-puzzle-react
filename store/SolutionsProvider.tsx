import { useContext, useState } from 'react';

import RowContext from './row-context';
import SolutionsContext from './solutions-context';
import { Edge, Piece, Puzzle, TrackingArray } from '@/types';

const SolutionsProvider = (props: any) => {
    const [allSolutions, setAllSolutions] = useState<TrackingArray[]>([]);
    const [allSolutionsCount, setAllSolutionsCount] = useState(0);

    const generateSolutions = (puzzle: Puzzle) => {
        const allPuzzlePieces: Piece[] = puzzle.pieces;

        const solutions: TrackingArray[] = [];
        const trackingArray: TrackingArray = [
            { id: 0 },
            { id: 1 },
            { id: 2 },
            { id: 3 },
            { id: 4 },
            { id: 5 },
            { id: 6 },
            { id: 7 },
            { id: 8 },
            { id: 9 },
            { id: 10 },
            { id: 11 },
            { id: 12 },
            { id: 13 },
            { id: 14 },
            { id: 15 }
        ];

        let row1PermCounter = 0;
        let perfectRow1 = 0;
        let perfectRow2 = 0;
        let row2PermCounter = 0;

        row1Permutations(0, 0, trackingArray);

        console.log('ROW !!!!111', perfectRow1, ' / ', row1PermCounter);
        console.log('ROW 22222', perfectRow2, ' / ', row2PermCounter);
        // console.log('ROW 1 UNIQUE', row1UniqueCornerSolutions);
        // console.log('SPECIFIC solns for piece 9', _741535Counter);

        return solutions;


        function row1Permutations(switchSpot: number, switchCandidate: number, trackingArray: TrackingArray, pieceRotation?: number) {
            row1PermCounter++;

            let availableBranches: boolean = true;

            // switch each of n pieces in row to match tracking array
            // trackingA[] & allPPieces need to be synced for entire 16 length
            for (let i = 0; i < 16; i++) {
                // go through bank of pieces and rearrange to match trackingArray
                if (allPuzzlePieces[i].id !== trackingArray[i].id) {
                    // piece found out of tA order - switch
                    for (let j = i; j < 16; j++) { // allPuzzlePieces.length
                        if (allPuzzlePieces[j].id === trackingArray[i].id) switchPieces(i, j);
                    }
                }
            }

            // check if fits - switchSpot & puzzlePieces index (ie switchCandidate)
            const fitsRow1Check = fitsRow1(switchSpot, allPuzzlePieces[switchCandidate], pieceRotation);

            if (fitsRow1Check) {
                if (pieceRotation) {
                    trackingArray[switchCandidate] = {
                        ...trackingArray[switchCandidate],
                        firstEdge: pieceRotation,

                        // to test new obects through call stack
                        [row1PermCounter]: true
                    };
                }

                if (switchSpot !== switchCandidate) {
                    switchPieces(switchSpot, switchCandidate);
                    // switch indexes for trackingArray too
                    let previousPieceIndex = trackingArray[switchSpot];
                    trackingArray[switchSpot] = trackingArray[switchCandidate];
                    trackingArray[switchCandidate] = previousPieceIndex;
                }

                if (switchSpot === 8) {
                    availableBranches = false;
                    perfectRow1++;
                    return row2Permutations(9, 9, trackingArray);
                }
            }
            else {
                // break out of all future perms/branches
                availableBranches = false;
            }

            // Explore all lower branches - starting on next piece spot (ONLY if currently matched)
            if (availableBranches) {
                let newSwitchSpot = switchSpot + 1;
                for (let i = newSwitchSpot; i < 16; i++) {
                    row1Permutations(newSwitchSpot, i, [...trackingArray]);
                    row1Permutations(newSwitchSpot, i, [...trackingArray], 2);
                    row1Permutations(newSwitchSpot, i, [...trackingArray], 3);
                }
            }

            // FIRST CALL - Try all candidates for current switchSpot
            if (switchSpot === 0 && switchCandidate === 0 && pieceRotation === undefined) {
                row1Permutations(0, 0, trackingArray, 2);
                row1Permutations(0, 0, trackingArray, 3);

                for (let i = switchSpot + 1; i < 16; i++) {
                    row1Permutations(switchSpot, i, [...trackingArray]);
                    row1Permutations(switchSpot, i, [...trackingArray], 2);
                    row1Permutations(switchSpot, i, [...trackingArray], 3);
                }
            }

            /**
             * ROW 1 = 9 pieces
             *
             * available branches = true
             *
             * switch each of n pieces in row to match tracking array
             *      - tracking array is 1 -> 9 at first but changes for later perms
             *      - go through each tracking array spot. IF puzzlePieces doesnt match, go through all puzzle pieces until matching index found
             *      ?? (CLUNKY - should only switch after fit confirmed ??)
             *
             * check if fits - switchSpot & puzzlePieces index (ie switchCandidate)
             *      - if switchSpot dne switchCandidate
             *          - switch in puzzlePieces
             *          - switch indexes for trackingArray
             *
             *      - if switchSpot === (row size - 1)
             *          - set availableBranches false - end of line/row
             *          - check if last switchSpot and puzzlePieces for spot match
             *              - start next row process with 1 -> 9 trackingArray
             *          - NOTE - if less, then it will continue branching
             *
             *      - FALSE
             *          - set availableBranches false
             *          - break out of all future perms/branches
             *
             * Explore all lower branches - starting on next piece spot (ONLY if currently matched)
             *      - if availableBranches
             *          - switchSpot ++
             *          - re-call row1Perm for new switchSpot for every candidate above switchSpot index
             *
             * FIRST CALL - Try all candidates for current switchSpot
             *          - re-call row1Perm for same switchSpot for every candidate above switchSpot index
             */
        }

        function row2Permutations(switchSpot: number, switchCandidate: number, trackingArray: TrackingArray, pieceRotation?: number) {
            row2PermCounter++;

            let availableBranches: boolean = true;

            // switch each of n pieces in row 2 to match tracking array
            for (let i = 9; i < 15; i++) {
                // go through bank of pieces and rearrange to match trackingArray
                if (allPuzzlePieces[i].id !== trackingArray[i].id) {
                    // piece found out of tA order - switch
                    for (let j = i; j < 16; j++) {
                        if (allPuzzlePieces[j].id === trackingArray[i].id) switchPieces(i, j);
                    }
                }
            }

            // FIRST CALL - Try all candidates for current switchSpot
            if (switchSpot === 9 && switchCandidate === 9 && pieceRotation === undefined) {
                // call other rotations
                row2Permutations(9, 9, trackingArray, 2);
                row2Permutations(9, 9, trackingArray, 3);

                for (let i = switchSpot + 1; i < 16; i++) {
                    row2Permutations(switchSpot, i, [...trackingArray]);
                    row2Permutations(switchSpot, i, [...trackingArray], 2);
                    row2Permutations(switchSpot, i, [...trackingArray], 3);
                }
            }

            // check if fits - switchSpot & puzzlePieces index (ie switchCandidate)
            const fitsRowCheck = fitsRow2(trackingArray, switchSpot, allPuzzlePieces[switchCandidate], pieceRotation);

            if (fitsRowCheck) {
                if (pieceRotation) {
                    trackingArray[switchCandidate] = {
                        ...trackingArray[switchCandidate],
                        firstEdge: pieceRotation
                    };
                }

                if (switchSpot !== switchCandidate) {
                    switchPieces(switchSpot, switchCandidate);

                    let previousPieceIndex = trackingArray[switchSpot];
                    trackingArray[switchSpot] = trackingArray[switchCandidate];
                    trackingArray[switchCandidate] = previousPieceIndex;
                }

                if (switchSpot === 14) {
                    availableBranches = false;
                    return row3Permutations(15, 15, trackingArray);
                }
            }
            else {
                // break out of all future perms/branches
                availableBranches = false;
            }


            // Explore all lower branches - starting on next piece spot (ONLY if currently matched)
            if (availableBranches) {
                let newSwitchSpot = switchSpot + 1;
                for (let i = newSwitchSpot; i < 16; i++) {
                    row2Permutations(newSwitchSpot, i, [...trackingArray]);
                    row2Permutations(newSwitchSpot, i, [...trackingArray], 2);
                    row2Permutations(newSwitchSpot, i, [...trackingArray], 3);
                }
            }

    /**
     * ROW2Permutations / Branches
        * = 6 pieces
        *
        *  available branches = true
        *
        * switch each of n pieces in row to match tracking array
        *      - tracking array is 1 -> 9 at first but changes for later perms
        *      - go through each tracking array spot. IF puzzlePieces doesnt match, go through all puzzle pieces until matching index found
        *      ?? (CLUNKY - should only switch after fit confirmed)
        *
        *
        * [THIS ORDER matters but can't remember why]
        * FIRST CALL - Try all candidates for current switchSpot
        *          - re-call row2Perm for same switchSpot for every candidate above switchSpot index
        *
        *
        * check if fits - switchSpot & puzzlePieces index (ie switchCandidate)
        *      - if switchSpot dne switchCandidate
        *          - switch in puzzlePieces
        *          - switch indexes for trackingArray
        *
        *      - if switchSpot === (row size - 1)
        *          - set availableBranches false - end of line/row
        *          - check if last switchSpot and puzzlePieces for spot match
        *              - start next row process with 1 -> 9 trackingArray
        *          - NOTE - if less, then it will continue branching

        *
        *      - FALSE
        *          - set availableBranches false
        *          - break out of all future perms/branches
        *
        * Explore all lower branches - starting on next piece spot (ONLY if currently matched)
        *      - if availableBranches
        *          - switchSpot ++
        *          - re-call row2Perm for new switchSpot for every candidate above switchSpot index
    */
        }

        function row3Permutations(switchSpot: number, switchCandidate: number, trackingArray: TrackingArray, pieceRotation?: number) {
            const fitsRow3R1 = fitsRow3(trackingArray, 15, allPuzzlePieces[15]);
            const fitsRow3R2 = fitsRow3(trackingArray, 15, allPuzzlePieces[15], 2);
            const fitsRow3R3 = fitsRow3(trackingArray, 15, allPuzzlePieces[15], 3);

            if (fitsRow3R2) {
                trackingArray[switchCandidate] = {
                    ...trackingArray[switchCandidate],
                    firstEdge: 2
                };
            }
            else if (fitsRow3R3) {
                trackingArray[switchCandidate] = {
                    ...trackingArray[switchCandidate],
                    firstEdge: 3
                };
            }

            if (fitsRow3R1 || fitsRow3R2 || fitsRow3R3) {
                perfectRow2++;
                console.log('Perfect 2', perfectRow2);
                console.log('Perfect', trackingArray);
                console.log('PERFECT R2');

                solutions.push(trackingArray);
                return true;
            }
        }

        function switchPieces(switchDestinationIndex: number, switchSourceIndex: number) {
            const previousDestinationPiece = allPuzzlePieces[switchDestinationIndex];
            allPuzzlePieces[switchDestinationIndex] = allPuzzlePieces[switchSourceIndex];;
            allPuzzlePieces[switchSourceIndex] = previousDestinationPiece;
        }

        function fitsRow1(switchSpot: number, switchCandidatePiece: Piece, rotation?: number) {
            const framePiece = puzzle.frame[switchSpot];
            let switchCandidateEdges = {
                edge1: applyRotationForNewEdge(1, switchCandidatePiece, rotation),
                edge2: applyRotationForNewEdge(2, switchCandidatePiece, rotation),
                edge3: applyRotationForNewEdge(3, switchCandidatePiece, rotation),
            };

            if (checkIfEdgesMatch(framePiece.edge1, switchCandidateEdges.edge1)) {
                if (switchSpot === 3 || switchSpot === 6) {
                    if (!checkIfEdgesMatch(framePiece.edge2!, switchCandidateEdges.edge2)) return false;
                }
                else if (switchSpot === 0) {
                    if (!checkIfEdgesMatch(framePiece.edge3!, switchCandidateEdges.edge3)) return false;
                }
                return true;
            }
            return false;
        }

        function fitsRow2(trackingArray: TrackingArray, switchSpot: number, switchCandidatePiece: Piece, rotation?: number) {
            let switchSpotEdges: {
                edge1?: Edge,
                edge2?: Edge,
                edge3?: Edge,
            } = { };

            if (switchSpot === 9) {
                switchSpotEdges = {
                    edge1: applyRotationForNewEdge(2, puzzle.pieces[0], trackingArray[0].firstEdge),
                    edge2: applyRotationForNewEdge(3, puzzle.pieces[1], trackingArray[1].firstEdge),
                    edge3: applyRotationForNewEdge(2, puzzle.pieces[8], trackingArray[8].firstEdge),
                };
            }
            else if (switchSpot === 10) {
                switchSpotEdges = {
                    edge1: applyRotationForNewEdge(2, puzzle.pieces[1], trackingArray[1].firstEdge),
                    edge2: applyRotationForNewEdge(3, puzzle.pieces[2], trackingArray[2].firstEdge),
                };
            }
            else if (switchSpot === 11) {
                switchSpotEdges = {
                    edge1: applyRotationForNewEdge(2, puzzle.pieces[2], trackingArray[2].firstEdge),
                    edge2: applyRotationForNewEdge(3, puzzle.pieces[3], trackingArray[3].firstEdge),
                    edge3: applyRotationForNewEdge(3, puzzle.pieces[4], trackingArray[4].firstEdge),
                };
            }
            else if (switchSpot === 12) {
                switchSpotEdges = {
                    edge2: applyRotationForNewEdge(2, puzzle.pieces[4], trackingArray[4].firstEdge),
                    edge3: applyRotationForNewEdge(3, puzzle.pieces[5], trackingArray[5].firstEdge),
                };
            }
            else if (switchSpot === 13) {
                switchSpotEdges = {
                    edge1: applyRotationForNewEdge(3, puzzle.pieces[7], trackingArray[7].firstEdge),
                    edge2: applyRotationForNewEdge(2, puzzle.pieces[5], trackingArray[5].firstEdge),
                    edge3: applyRotationForNewEdge(3, puzzle.pieces[6], trackingArray[6].firstEdge),
                };
            }
            else if (switchSpot === 14) {
                switchSpotEdges = {
                    edge1: applyRotationForNewEdge(3, puzzle.pieces[8], trackingArray[8].firstEdge),
                    edge3: applyRotationForNewEdge(2, puzzle.pieces[7], trackingArray[7].firstEdge),
                };
            }


            let switchCandidateEdges = {
                edge1: applyRotationForNewEdge(1, switchCandidatePiece, rotation),
                edge2: applyRotationForNewEdge(2, switchCandidatePiece, rotation),
                edge3: applyRotationForNewEdge(3, switchCandidatePiece, rotation),
            };

            if (
                (!switchSpotEdges.edge1 || checkIfEdgesMatch(switchSpotEdges.edge1, switchCandidateEdges.edge1)) &&
                (!switchSpotEdges.edge2 || checkIfEdgesMatch(switchSpotEdges.edge2, switchCandidateEdges.edge2)) &&
                (!switchSpotEdges.edge3 || checkIfEdgesMatch(switchSpotEdges.edge3, switchCandidateEdges.edge3))
            ) {
                return true;
            }
            return false;
        }

        function fitsRow3(trackingArray: TrackingArray, switchSpot: number, switchCandidatePiece: Piece, rotation?: number) {
            let switchSpotEdges = {
                edge1: applyRotationForNewEdge(1, puzzle.pieces[12], trackingArray[12].firstEdge),
                edge2: applyRotationForNewEdge(2, puzzle.pieces[14], trackingArray[14].firstEdge),
                edge3: applyRotationForNewEdge(3, puzzle.pieces[10], trackingArray[10].firstEdge),
            };
            let switchCandidateEdges = {
                edge1: applyRotationForNewEdge(1, switchCandidatePiece, rotation),
                edge2: applyRotationForNewEdge(2, switchCandidatePiece, rotation),
                edge3: applyRotationForNewEdge(3, switchCandidatePiece, rotation),
            };

            if (
                checkIfEdgesMatch(switchSpotEdges.edge1, switchCandidateEdges.edge1) &&
                checkIfEdgesMatch(switchSpotEdges.edge2, switchCandidateEdges.edge2) &&
                checkIfEdgesMatch(switchSpotEdges.edge3, switchCandidateEdges.edge3)
            ) {
                return true;
            }
            return false;
        }

        function applyRotationForNewEdge(startingEdge: number, piece: Piece, rotation?: number) {
            let newEdgeNumber = startingEdge;
            if (rotation) newEdgeNumber = startingEdge + (rotation - 1);
            if (newEdgeNumber >= 4) newEdgeNumber -= 3;
            //@ts-ignore
            return piece[`edge${newEdgeNumber}`];
        }

        function checkIfEdgesMatch(spotEdge: Edge, candidateEdge: Edge): boolean {
            if (spotEdge.type === candidateEdge.type &&
                spotEdge.half !== candidateEdge.half) {
                return true;
            }
            return false;
        }

        // function checkIfUniqueRow1Solution(trackingArray: PieceTracker[]) {
        //     let isNewSolution = true;
        //     row1UniqueCornerSolutions.forEach((soln) => {
        //         if (
        //             soln[0].id === trackingArray[0].id &&
        //             soln[1].id === trackingArray[3].id &&
        //             soln[2].id === trackingArray[6].id

        //         ) {
        //             isNewSolution = false;
        //             return;
        //         }
        //     });
        //     if (isNewSolution) {
        //         row1UniqueCornerSolutions.push([trackingArray[0], trackingArray[3], trackingArray[6]]);
        //     }
        // }

        // function checkIfUniqueRow01368Solution(trackingArray: PieceTracker[]) {
        //     let isNewSolution = true;
        //     row1UniqueCornerSolutions.forEach((soln) => {
        //         if (
        //             (soln[0].id === trackingArray[0].id && soln[0].firstEdge === trackingArray[0].firstEdge) &&
        //             (soln[1].id === trackingArray[1].id && soln[1].firstEdge === trackingArray[1].firstEdge) &&
        //             (soln[2].id === trackingArray[3].id && soln[2].firstEdge === trackingArray[3].firstEdge) &&
        //             (soln[3].id === trackingArray[6].id && soln[3].firstEdge === trackingArray[6].firstEdge) &&
        //             (soln[4].id === trackingArray[8].id && soln[4].firstEdge === trackingArray[8].firstEdge)

        //         ) {
        //             isNewSolution = false
        //             return;
        //         }
        //     });
        //     if (isNewSolution) {
        //         row1UniqueCornerSolutions.push([
        //             trackingArray[0],  // 0
        //             trackingArray[1],  // 1
        //             trackingArray[3],  // 3
        //             trackingArray[6],  // 6
        //             trackingArray[8]   // 8
        //         ]);
        //     }

        //     if (
        //         trackingArray[0].id === 7 &&
        //         trackingArray[1].id === 4 &&
        //         trackingArray[3].id === 15 &&
        //         trackingArray[6].id === 3 &&
        //         (trackingArray[8].id === 5 && trackingArray[8].firstEdge === 2)) {
        //             _741535Counter++;
        //             console.log(trackingArray);
        //     }
        // }
    };


    // ----------------------------------------------------------------
    const solutionsContext = {
        allSolutions,
        allSolutionsCount,
        findSolutions: (puzzle: any) => {
            const solutions = generateSolutions(puzzle);
            setAllSolutions(solutions);
            setAllSolutionsCount(solutions.length);
        }
    };

    return <SolutionsContext.Provider value={solutionsContext}>
        {props.children}
    </SolutionsContext.Provider>
};

export default SolutionsProvider;