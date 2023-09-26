import { Component } from "react";

import FramelessSolutionsContext from "./frameless-solutions-context";
import storedFramelessSolutions from "./solutions-frameless.json";
import { Edge, Piece, Puzzle, TrackingArray } from "@/types";

interface Props {
    children: React.ReactNode;
}

interface State {
    solutions: TrackingArray[];
    solutionsCount: number;
    findSolutions: (puzzle: Puzzle) => TrackingArray[];
}

class FramelessSolutionsProvider extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            solutions: [],
            solutionsCount: -1,
            findSolutions: (puzzle: Puzzle) => {
                return this.generateSolutions(puzzle);
            }
        }
    }

    private allPuzzlePieces: Piece[] = [];
    private solutions: TrackingArray[] = [];

    private row1PermCounter = 0;
    private perfectRow1 = 0;
    private row2PermCounter = 0;
    private perfectRow2 = 0;
    private row3PermCounter = 0;
    private perfectRow3 = 0;
    private row4PermCounter = 0;
    private perfectRow4 = 0;

    generateSolutions(puzzle: Puzzle) {
        const windowIsUndefined = typeof window === 'undefined';
        if (!windowIsUndefined && localStorage.getItem('solutions')) {
            console.log('USING localStorage solutions');
            this.solutions = JSON.parse(localStorage.getItem('solutions')!);
            this.setState({
                solutions: this.solutions,
                solutionsCount: this.solutions.length
            });
            return this.solutions;
        }
        else if (storedFramelessSolutions && storedFramelessSolutions.length > 0) {
            console.log('USING stored solutions');
            this.setState({
                solutions: storedFramelessSolutions,
                solutionsCount: storedFramelessSolutions.length
            });
            return storedFramelessSolutions;
        }


        this.allPuzzlePieces = puzzle.pieces;
        // should solutions be array of IDs or array of entire puzzle piece sorted ??
        // Does it even matter
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
        this.solutions = [];
        this.perfectRow4 = 0;

        this.row1Permutations(0, 0, trackingArray);

        console.log('ROW !!!!111', this.perfectRow1, ' / ', this.row1PermCounter);
        console.log('ROW 22222', this.perfectRow2, ' / ', this.row2PermCounter);
        console.log('ROW 333', this.perfectRow3, ' / ', this.row3PermCounter);
        console.log('ROW 4', this.perfectRow4, ' / ', this.row4PermCounter);
        // console.log('ROW 1 UNIQUE', row1UniqueCornerSolutions);
        // console.log('SPECIFIC solns for piece 9', _741535Counter);

        this.setState({
            solutions: this.solutions,
            solutionsCount: this.perfectRow4
        });

        if (!windowIsUndefined) {
            localStorage.setItem('solutions', JSON.stringify(this.solutions));
        }

        return this.solutions;
    }

    // 0 -> 6 indices
    // the values for each specifc row func should be curried !!!!
    private row1Permutations(switchSpot: number, switchCandidate: number, trackingArray: TrackingArray, pieceRotation?: number) {
        this.row1PermCounter++;
        let availableBranches: boolean = true;

        // switch each of n pieces in row to match tracking array
        // trackingA[] & allPPieces need to be synced for entire 16 length
        for (let i = 0; i < 16; i++) {
            // go through bank of pieces and rearrange to match trackingArray
            if (this.allPuzzlePieces[i].id !== trackingArray[i].id) {
                // piece found out of tA order - switch
                for (let j = i; j < 16; j++) { // allPuzzlePieces.length
                    if (this.allPuzzlePieces[j].id === trackingArray[i].id) this.switchPieces(i, j);
                }
            }
        }

        // check if fits - switchSpot & puzzlePieces index (ie switchCandidate)
        const fitsRow1Check = this.fitsRow1(trackingArray, switchSpot, this.allPuzzlePieces[switchCandidate], pieceRotation);

        if (fitsRow1Check) {
            trackingArray[switchCandidate] = {
                id: trackingArray[switchCandidate].id,
                ...(pieceRotation && { firstEdge: pieceRotation }),

                // to test new obects through call stack
                [this.row1PermCounter]: true
            };

            if (switchSpot !== switchCandidate) {
                this.switchPieces(switchSpot, switchCandidate);
                // switch indexes for trackingArray too
                let previousPieceIndex = trackingArray[switchSpot];
                trackingArray[switchSpot] = trackingArray[switchCandidate];
                trackingArray[switchCandidate] = previousPieceIndex;
            }

            if (switchSpot === 6) {
                availableBranches = false;
                this.perfectRow1++;
                return this.row2Permutations(7, 7, trackingArray);
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
                this.row1Permutations(newSwitchSpot, i, [...trackingArray]);
                this.row1Permutations(newSwitchSpot, i, [...trackingArray], 2);
                this.row1Permutations(newSwitchSpot, i, [...trackingArray], 3);
            }
        }

        // FIRST CALL - Try all candidates for current switchSpot
        if (switchSpot === 0 && switchCandidate === 0 && pieceRotation === undefined) {
            this.row1Permutations(0, 0, trackingArray, 2);
            this.row1Permutations(0, 0, trackingArray, 3);

            for (let i = switchSpot + 1; i < 16; i++) {
                this.row1Permutations(switchSpot, i, [...trackingArray]);
                this.row1Permutations(switchSpot, i, [...trackingArray], 2);
                this.row1Permutations(switchSpot, i, [...trackingArray], 3);
            }
        }
    }

    // 7 -> 11 indices
    private row2Permutations(switchSpot: number, switchCandidate: number, trackingArray: TrackingArray, pieceRotation?: number) {
        this.row2PermCounter++;
        let availableBranches: boolean = true;

        // switch each of n pieces in row 2 to match tracking array
        // 15 or 16 ??
        for (let i = 7; i < 16; i++) {
            // go through bank of pieces and rearrange to match trackingArray
            if (this.allPuzzlePieces[i].id !== trackingArray[i].id) {
                // piece found out of tA order - switch
                for (let j = i; j < 16; j++) {
                    if (this.allPuzzlePieces[j].id === trackingArray[i].id) this.switchPieces(i, j);
                }
            }
        }

        // FIRST CALL - Try all candidates for current switchSpot
        if (switchSpot === 7 && switchCandidate === 7 && pieceRotation === undefined) {
            this.row2Permutations(7, 7, trackingArray, 2);
            this.row2Permutations(7, 7, trackingArray, 3);

            for (let i = switchSpot + 1; i < 16; i++) {
                this.row2Permutations(switchSpot, i, [...trackingArray]);
                this.row2Permutations(switchSpot, i, [...trackingArray], 2);
                this.row2Permutations(switchSpot, i, [...trackingArray], 3);
            }
        }

        // check if fits - switchSpot & puzzlePieces index (ie switchCandidate)
        const fitsRowCheck = this.fitsRow2(trackingArray, switchSpot, this.allPuzzlePieces[switchCandidate], pieceRotation);

        if (fitsRowCheck) {
            trackingArray[switchCandidate] = {
                id: trackingArray[switchCandidate].id,
                ...(pieceRotation && { firstEdge: pieceRotation }),
                [this.row2PermCounter]: true
            };

            if (switchSpot !== switchCandidate) {
                this.switchPieces(switchSpot, switchCandidate);

                let previousPieceIndex = trackingArray[switchSpot];
                trackingArray[switchSpot] = trackingArray[switchCandidate];
                trackingArray[switchCandidate] = previousPieceIndex;
            }

            if (switchSpot === 11) {
                availableBranches = false;

                this.perfectRow2++;
                return this.row3Permutations(12, 12, trackingArray);
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
                this.row2Permutations(newSwitchSpot, i, [...trackingArray]);
                this.row2Permutations(newSwitchSpot, i, [...trackingArray], 2);
                this.row2Permutations(newSwitchSpot, i, [...trackingArray], 3);
            }
        }
    }

    // 12 -> 14 indices
    private row3Permutations(switchSpot: number, switchCandidate: number, trackingArray: TrackingArray, pieceRotation?: number) {
        this.row3PermCounter++;
        let availableBranches: boolean = true;

        // switch each of n pieces in row 2 to match tracking array
        for (let i = 12; i < 16; i++) {
            // go through bank of pieces and rearrange to match trackingArray
            if (this.allPuzzlePieces[i].id !== trackingArray[i].id) {
                // piece found out of tA order - switch
                for (let j = i; j < 16; j++) {
                    if (this.allPuzzlePieces[j].id === trackingArray[i].id) this.switchPieces(i, j);
                }
            }
        }

        // FIRST CALL - Try all candidates for current switchSpot
        if (switchSpot === 12 && switchCandidate === 12 && pieceRotation === undefined) {
            // call other rotations
            this.row3Permutations(12, 12, trackingArray, 2);
            this.row3Permutations(12, 12, trackingArray, 3);

            for (let i = switchSpot + 1; i < 16; i++) {
                this.row3Permutations(switchSpot, i, [...trackingArray]);
                this.row3Permutations(switchSpot, i, [...trackingArray], 2);
                this.row3Permutations(switchSpot, i, [...trackingArray], 3);
            }
        }

        // check if fits - switchSpot & puzzlePieces index (ie switchCandidate)
        const fitsRowCheck = this.fitsRow3(trackingArray, switchSpot, this.allPuzzlePieces[switchCandidate], pieceRotation);

        if (fitsRowCheck) {
            trackingArray[switchCandidate] = {
                id: trackingArray[switchCandidate].id,
                ...(pieceRotation && { firstEdge: pieceRotation }),
            };

            if (switchSpot !== switchCandidate) {
                this.switchPieces(switchSpot, switchCandidate);

                let previousPieceIndex = trackingArray[switchSpot];
                trackingArray[switchSpot] = trackingArray[switchCandidate];
                trackingArray[switchCandidate] = previousPieceIndex;
            }

            if (switchSpot === 14) {
                availableBranches = false;
                this.perfectRow3++;
                return this.row4Permutations(15, 15, trackingArray);
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
                this.row3Permutations(newSwitchSpot, i, [...trackingArray]);
                this.row3Permutations(newSwitchSpot, i, [...trackingArray], 2);
                this.row3Permutations(newSwitchSpot, i, [...trackingArray], 3);
            }
        }
    }

    // 15 index
    private row4Permutations(switchSpot: number, switchCandidate: number, trackingArray: TrackingArray, pieceRotation?: number) {
        this.row4PermCounter++;

        this.row3Permutations(15, 15, trackingArray, 2);
        this.row3Permutations(15, 15, trackingArray, 3);

        // check if fits - switchSpot & puzzlePieces index (ie switchCandidate)
        const fitsRowCheck = this.fitsRow4(trackingArray, switchSpot, this.allPuzzlePieces[switchCandidate], pieceRotation);

        if (fitsRowCheck) {
            trackingArray[switchCandidate] = {
                id: trackingArray[switchCandidate].id,
                ...(pieceRotation && { firstEdge: pieceRotation }),
            };

            this.perfectRow4++;
            this.solutions.push(trackingArray);
            return true;
        }
        return false;
    }


    private switchPieces(switchDestinationIndex: number, switchSourceIndex: number) {
        const previousDestinationPiece = this.allPuzzlePieces[switchDestinationIndex];
        this.allPuzzlePieces[switchDestinationIndex] = this.allPuzzlePieces[switchSourceIndex];;
        this.allPuzzlePieces[switchSourceIndex] = previousDestinationPiece;
    }

    private fitsRow1(trackingArray: TrackingArray, switchSpot: number, switchCandidatePiece: Piece, rotation?: number) {
        let switchSpotEdges: {
            edge1?: Edge,
            edge2?: Edge,
            edge3?: Edge,
        } = { };

        if (switchSpot === 0) return true;
        else if (switchSpot % 2 === 1) {
            // Odd - 1, 3, 5
            switchSpotEdges = {
                edge3: this.applyRotationForNewEdge(3, this.allPuzzlePieces[switchSpot - 1], trackingArray[switchSpot - 1].firstEdge),
            };
        }
        else {
            // Even - 2, 4, 6
            switchSpotEdges = {
                edge2: this.applyRotationForNewEdge(2, this.allPuzzlePieces[switchSpot - 1], trackingArray[switchSpot - 1].firstEdge),
            };
        }

        let switchCandidateEdges = {
            edge1: this.applyRotationForNewEdge(1, switchCandidatePiece, rotation),
            edge2: this.applyRotationForNewEdge(2, switchCandidatePiece, rotation),
            edge3: this.applyRotationForNewEdge(3, switchCandidatePiece, rotation),
        };
        if (
            (!switchSpotEdges.edge1 || this.checkIfEdgesMatch(switchSpotEdges.edge1, switchCandidateEdges.edge1)) &&
            (!switchSpotEdges.edge2 || this.checkIfEdgesMatch(switchSpotEdges.edge2, switchCandidateEdges.edge2)) &&
            (!switchSpotEdges.edge3 || this.checkIfEdgesMatch(switchSpotEdges.edge3, switchCandidateEdges.edge3))
        ) {
            return true;
        }
        return false;
    }

    private fitsRow2(trackingArray: TrackingArray, switchSpot: number, switchCandidatePiece: Piece, rotation?: number) {
        let switchSpotEdges: {
            edge1?: Edge,
            edge2?: Edge,
            edge3?: Edge,
        } = { };

        if (switchSpot === 7) {
            switchSpotEdges = {
                edge1: this.applyRotationForNewEdge(1, this.allPuzzlePieces[switchSpot - 6], trackingArray[switchSpot - 6].firstEdge),
            };
        }
        else if (switchSpot % 2 === 0) {
            // Even - 8, 10
            switchSpotEdges = {
                edge3: this.applyRotationForNewEdge(3, this.allPuzzlePieces[switchSpot - 1], trackingArray[switchSpot - 1].firstEdge),
            };
        }
        else {
            // Odd - 9, 11
            switchSpotEdges = {
                edge1: this.applyRotationForNewEdge(1, this.allPuzzlePieces[switchSpot - 6], trackingArray[switchSpot - 6].firstEdge),
                edge2: this.applyRotationForNewEdge(2, this.allPuzzlePieces[switchSpot - 1], trackingArray[switchSpot - 1].firstEdge),
            };
        }

        let switchCandidateEdges = {
            edge1: this.applyRotationForNewEdge(1, switchCandidatePiece, rotation),
            edge2: this.applyRotationForNewEdge(2, switchCandidatePiece, rotation),
            edge3: this.applyRotationForNewEdge(3, switchCandidatePiece, rotation),
        };
        if (
            (!switchSpotEdges.edge1 || this.checkIfEdgesMatch(switchSpotEdges.edge1, switchCandidateEdges.edge1)) &&
            (!switchSpotEdges.edge2 || this.checkIfEdgesMatch(switchSpotEdges.edge2, switchCandidateEdges.edge2)) &&
            (!switchSpotEdges.edge3 || this.checkIfEdgesMatch(switchSpotEdges.edge3, switchCandidateEdges.edge3))
        ) {
            return true;
        }
        return false;
    }

    private fitsRow3(trackingArray: TrackingArray, switchSpot: number, switchCandidatePiece: Piece, rotation?: number) {
        let switchSpotEdges: {
            edge1?: Edge,
            edge2?: Edge,
            edge3?: Edge,
        } = { };

        if (switchSpot === 12) {
            switchSpotEdges = {
                edge1: this.applyRotationForNewEdge(1, this.allPuzzlePieces[switchSpot - 4], trackingArray[switchSpot - 4].firstEdge),
            };
        }
        else if (switchSpot === 13) {
            // Odd
            switchSpotEdges = {
                edge3: this.applyRotationForNewEdge(3, this.allPuzzlePieces[switchSpot - 1], trackingArray[switchSpot - 1].firstEdge),
            };
        }
        else {
            // Even - 14
            switchSpotEdges = {
                edge1: this.applyRotationForNewEdge(1, this.allPuzzlePieces[switchSpot - 4], trackingArray[switchSpot - 4].firstEdge),
                edge2: this.applyRotationForNewEdge(2, this.allPuzzlePieces[switchSpot - 1], trackingArray[switchSpot - 1].firstEdge),
            };
        }

        let switchCandidateEdges = {
            edge1: this.applyRotationForNewEdge(1, switchCandidatePiece, rotation),
            edge2: this.applyRotationForNewEdge(2, switchCandidatePiece, rotation),
            edge3: this.applyRotationForNewEdge(3, switchCandidatePiece, rotation),
        };
        if (
            (!switchSpotEdges.edge1 || this.checkIfEdgesMatch(switchSpotEdges.edge1, switchCandidateEdges.edge1)) &&
            (!switchSpotEdges.edge2 || this.checkIfEdgesMatch(switchSpotEdges.edge2, switchCandidateEdges.edge2)) &&
            (!switchSpotEdges.edge3 || this.checkIfEdgesMatch(switchSpotEdges.edge3, switchCandidateEdges.edge3))
        ) {
            return true;
        }
        return false;
    }

    private fitsRow4(trackingArray: TrackingArray, switchSpot: number, switchCandidatePiece: Piece, rotation?: number) {
        let switchSpotEdges: {
            edge1?: Edge,
            edge2?: Edge,
            edge3?: Edge,
        } = {
            edge1: this.applyRotationForNewEdge(1, this.allPuzzlePieces[switchSpot - 2], trackingArray[switchSpot - 2].firstEdge),
        };

        let switchCandidateEdges = {
            edge1: this.applyRotationForNewEdge(1, switchCandidatePiece, rotation),
            edge2: this.applyRotationForNewEdge(2, switchCandidatePiece, rotation),
            edge3: this.applyRotationForNewEdge(3, switchCandidatePiece, rotation),
        };
        if (
            (!switchSpotEdges.edge1 || this.checkIfEdgesMatch(switchSpotEdges.edge1, switchCandidateEdges.edge1)) &&
            (!switchSpotEdges.edge2 || this.checkIfEdgesMatch(switchSpotEdges.edge2, switchCandidateEdges.edge2)) &&
            (!switchSpotEdges.edge3 || this.checkIfEdgesMatch(switchSpotEdges.edge3, switchCandidateEdges.edge3))
        ) {
            return true;
        }
        return false;
    }

    private applyRotationForNewEdge(startingEdge: number, piece: Piece, rotation?: number) {
        let newEdgeNumber = startingEdge;
        if (rotation) newEdgeNumber = startingEdge + (rotation - 1);
        if (newEdgeNumber >= 4) newEdgeNumber -= 3;
        //@ts-ignore
        return piece[`edge${newEdgeNumber}`];
    }

    private checkIfEdgesMatch(spotEdge: Edge, candidateEdge: Edge): boolean {
        if (spotEdge.type === candidateEdge.type &&
            spotEdge.half !== candidateEdge.half) {
            return true;
        }
        return false;
    }

    render() {
        return <FramelessSolutionsContext.Provider value={this.state}>
            {this.props.children}
        </FramelessSolutionsContext.Provider>;
    }
}

export default FramelessSolutionsProvider;