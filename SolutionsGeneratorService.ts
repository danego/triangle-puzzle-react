interface PieceTracker {
    id: number;
    firstEdge?: number;
}

const generateSolutions = (puzzle: any) => {
    // puzzle - from birds.ts
    // 
    // GENERATE rows for this ... NEED clearer naming & requirements for differnt vars ... 
    const allPuzzlePieces: any[] = puzzle.pieces;

    const solutions: any[] = [];


    // = 9 pieces for first row
    // let trackingArray = [0,1,2,3,4,5,6,7,8]; 
    // let piecesIndexArray = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
    const trackingArray: any[] = [
        // id: number, 
        // firstEdge?: number  - only if firstEdge !== 1
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

    row1Permutations(0, 0, trackingArray);

    return solutions;




    
    //takes test spot, test piece, and record of current array setup (to reset the bankAvlbl)
    //generates whole soln subset - testing all first layer switchIns, even after a match
    function row1Permutations(switchSpot: number, switchCandidate: number, trackingArray: PieceTracker[]) {
        let availableBranches: boolean = true;

        // switch each of n pieces in row to match tracking array
        for (let i = 0; i < 9; i++) {  // trackingArray.length

            if (allPuzzlePieces[i].id !== trackingArray[i].id) {
                for (let j = i; j < 16; j++) { // allPuzzlePieces.length
                    if (allPuzzlePieces[j].id === trackingArray[i].id) switchPieces(i, j);
                }
            }
        }
        

        // check if fits - switchSpot & puzzlePieces index (ie switchCandidate)
        const fitsRow1Check = fitsRow1(switchSpot, allPuzzlePieces[switchCandidate]);
        const fitsRow1CheckR2 = fitsRow1(switchSpot, allPuzzlePieces[switchCandidate], 2);
        const fitsRow1CheckR3 = fitsRow1(switchSpot, allPuzzlePieces[switchCandidate], 3);

        if (fitsRow1Check || fitsRow1CheckR2 || fitsRow1CheckR3) {
            console.log('FITS row 1');
            if (fitsRow1CheckR2) {
                // switchCandidate = { ...allPuzzlePieces[switchCandidate], firstEdge: 2 };
                trackingArray[switchCandidate] = {
                    ...trackingArray[switchCandidate],
                    firstEdge: 2
                };
            }
            if (fitsRow1CheckR3) {
                // switchCandidate = { ...switchCandidate, firstEdge: 3 };
                trackingArray[switchCandidate] = {
                    ...trackingArray[switchCandidate],
                    firstEdge: 3
                };
            } 

            if (switchSpot !== switchCandidate) {
                switchPieces(switchSpot, switchCandidate);
                // switch indexes for trackingArray too

                // BUT switchCandidate can be -> 15

                let previousPieceIndex = trackingArray[switchSpot]; 
                trackingArray[switchSpot] = trackingArray[switchCandidate];
                trackingArray[switchCandidate] = previousPieceIndex;
            }

            // if switchSpot === penultimate spot
            if (switchSpot === (9 - 2)) {  // trackingArray.length
                availableBranches = false;
                if (fitsRow1(switchSpot + 1, allPuzzlePieces[switchCandidate])) {
                    let trackingArrayRow2 = [0,1,2,3,4,5];
                    debugger;
                    // return row2Permutations(0, 0, trackingArrayRow2);
                }
            }
        } 
        else {
            // break out of all future perms/branches 
            availableBranches = false;
        }



        // Explore all lower branches - starting on next piece spot (ONLY if currently matched)
        if (availableBranches) {
            console.log('EXPLORE lower branches');

            let newSwitchSpot = switchSpot + 1;
            for (let i = newSwitchSpot; i < 9; i++) { // trackingArray.length
                row1Permutations(newSwitchSpot, i, [...trackingArray]);
            }
        }
        
        // FIRST CALL - Try all candidates for current switchSpot
        if (switchSpot === 0 && switchCandidate === 0) {
            console.log('FIRST call');
            for (let i = switchSpot + 1; i < 16; i++) {
                row1Permutations(switchSpot, i, [...trackingArray]);
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


    function switchPieces(switchDestinationIndex: number, switchSourceIndex: number) {
        const previousDestinationPiece = allPuzzlePieces[switchDestinationIndex];
        allPuzzlePieces[switchDestinationIndex] = allPuzzlePieces[switchSourceIndex];;
        allPuzzlePieces[switchSourceIndex] = previousDestinationPiece;
    }

    function fitsRow1(switchSpot: number, switchCandidatePiece: any, rotation?: number) {
        const framePiece = puzzle.frame[switchSpot];
        let switchCandidateEdge = switchCandidatePiece.edge1;
        if (rotation) {
            switchCandidateEdge = switchCandidatePiece[`edge${rotation}`];
        }

        if (
            (framePiece.edge === switchCandidateEdge.type) &&
            (framePiece.half !== switchCandidateEdge.half)
        ) {
            return true;
        }
        return false;
    }

};


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

/**
 * ROW 3 Permutations / Branches
 * = 1 piece
    *  available branches = true
    * 
    * switch each of n pieces in row to match tracking array
    *      - tracking array is 1 -> 4 at first but changes for later perms
    *      - go through each tracking array spot. IF puzzlePieces doesnt match, go through all puzzle pieces until matching index found 
    *      ?? (CLUNKY - should only switch after fit confirmed)
    * 
    * 
    * [THIS ORDER matters but can't remember why]
    * FIRST CALL - Try all candidates for current switchSpot
    *          - re-call row3Perm for same switchSpot for every candidate above switchSpot index
    * 
    * 
    * check if fits - switchSpot & puzzlePieces index (ie switchCandidate)
    *      - if switchSpot !== switchCandidate
    *          - switch in puzzlePieces
    *          - switch indexes for trackingArray
    * 
    *      - if switchSpot === (row size - 1) 
    *          - set availableBranches false - end of line/row
    *          - check if last switchSpot and puzzlePieces for spot match 
    *              - cementSolution
    *              - return true 
    *          - NOTE - if less, then it will continue branching   
    * 
    *      - FALSE
    *          - set availableBranches false
    *          - break out of all future perms/branches 
    * 
    * Explore all lower branches - starting on next piece spot (ONLY if currently matched)
    *      - if availableBranches
    *          - switchSpot ++
    *          - re-call row3Perm for new switchSpot for every candidate above switchSpot index
*/




function cementSolution() {
    //create a new array to store solution from working copy in bankAvlblPuzzlePieces


    /**
     * store indexes of solutions in array on solutions object 
     * 
     */
}

export default generateSolutions;