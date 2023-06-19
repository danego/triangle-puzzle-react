import { Piece, TrackingArray } from "./types";

export const generateHorizontalTrackingArray = (trackingArray: TrackingArray) => {
    let row4: TrackingArray = [];
    let row3: TrackingArray = [];
    let row2: TrackingArray = [];
    let row1: TrackingArray = [];

    row4.push({
        ...trackingArray[0],
        firstEdge: convertRotationValue(trackingArray[0].firstEdge, 1)
    });

    row3 = [
        {
            ...trackingArray[8],
            firstEdge: convertRotationValue(trackingArray[8].firstEdge, 2)
        },
        trackingArray[9],
        {
            ...trackingArray[1],
            firstEdge: convertRotationValue(trackingArray[1].firstEdge, 1)
        }
    ];

    row2 = [
        {
            ...trackingArray[7],
            firstEdge: convertRotationValue(trackingArray[7].firstEdge, 2)
        },
        trackingArray[14],
        trackingArray[15],
        trackingArray[10],
        {
            ...trackingArray[2],
            firstEdge: convertRotationValue(trackingArray[2].firstEdge, 1)
        }
    ];

    row1 = [
        trackingArray[6],
        trackingArray[13],
        trackingArray[5],
        trackingArray[12],
        trackingArray[4],
        trackingArray[11],
        {
            ...trackingArray[3],
            firstEdge: convertRotationValue(trackingArray[3].firstEdge, 1)
        },
    ];
    const horizontalTrackingArray: TrackingArray = row1.concat(row2).concat(row3).concat(row4);
    return horizontalTrackingArray;
};

function convertRotationValue(firstEdgeNumber: number | undefined, newEdgeDifference: number): number {
    let newRotation;
    if (!firstEdgeNumber) firstEdgeNumber = 1;

    newRotation = firstEdgeNumber + newEdgeDifference;

    if (newRotation > 3) {
        newRotation = newRotation % 3;
    }
    return newRotation;
}