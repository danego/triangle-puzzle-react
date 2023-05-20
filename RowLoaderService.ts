import { Piece } from "./types";
import puzzle from "./birds";

export interface PieceWithRotation extends Piece {
    firstEdge?: number | undefined;
    masterIndex: number
    // ^ this will have to be reconfigured once drag & drop bc pieces will not be connected to their spot
}


    for (let i = 0; i < 16; i++) {
        let newPieceWithRotation = {
            ...pieces[i],
            masterIndex: i
        };
        if (trackingArray) {
            newPieceWithRotation = {
                ...newPieceWithRotation,
                //@ts-ignore
                firstEdge: trackingArray[i].firstEdge
            };
        }

        if (i <= 6) {
            rows.row1.push(newPieceWithRotation);
        }
        else if (i <= 11) {
            rows.row2.push(newPieceWithRotation);
        }
        else if (i <= 14) {
            rows.row3.push(newPieceWithRotation);
        }
        else {
            rows.row4.push(newPieceWithRotation);
        }
    }

    return rows;
}

export default generateHorizontalRows;