import { useState } from 'react';

import classes from './Triangle.module.scss';
import { PieceWithRotation } from '@/RowLoaderService';

interface TriangleProps {
    odd?: boolean;
    piece: PieceWithRotation;
};

export default function Triangle(props: TriangleProps) {

    let startingRotation = props.odd ? 180 : 0;
    // For framed solns:
    // switch(props.piece.masterIndex) {
    //     case 0: ;
    //     case 1: ;
    //     case 2:
    //         startingRotation = 240;
    //         break;
    //     case 7: ;
    //     case 8:
    //         startingRotation = 120;
    //         break;

    // }
    if (props.piece.firstEdge) {
        if (props.piece.firstEdge === 2) {
            startingRotation += 240;
        }
        else if (props.piece.firstEdge === 3) {
            startingRotation += 120;
        }
    }

    const [pieceRotation, setPieceRotation] = useState(startingRotation);
    if (pieceRotation !== startingRotation) {
        setPieceRotation(startingRotation);
    }

    const rotateHandler = () => {
        setPieceRotation(pieceRotation => {
            let newPieceRotation;
            if (pieceRotation === 240 || pieceRotation === 420) {
                newPieceRotation = 0;
            } else {
                newPieceRotation = pieceRotation + 120
            }

            if (props.odd && newPieceRotation === 0) {
                newPieceRotation = 180;
            }
            return newPieceRotation;
        });

    };

    return (
        <div
            className={`${classes['grab-handle']} ${props.odd && classes['odd']}`}
            onClick={rotateHandler}>

            <span className={classes['piece-id']}>{props.piece.id}</span>

            <div
                style={{ transform : `rotate(${pieceRotation}deg)` }}
                className={classes.triangle}>

                <div className={classes.overlay}>
                    {/* bottom  - go clockwise */}
                    <div className={[classes['overlay-edge'], classes[`${props.piece.edge1.type + '-' + props.piece.edge1.half}`]].join(' ')}></div>

                    {/* left */}
                    <div className={[classes['overlay-edge'], classes[`${props.piece.edge2.type + '-' + props.piece.edge2.half}`]].join(' ')}></div>

                    {/* right */}
                    <div className={[classes['overlay-edge'], classes[`${props.piece.edge3.type + '-' + props.piece.edge3.half}`]].join(' ')}></div>
                </div>
            </div>
        </div>
    );
}