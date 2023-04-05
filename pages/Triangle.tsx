import { useState } from 'react';
import classes from './Triangle.module.scss';

interface TriangleProps {
    odd: boolean;
};

export default function Triangle({ odd }: TriangleProps) {
    const [pieceRotation, setPieceRotation] = useState(odd ? 180 : 0);

    const rotateHandler = () => {
        setPieceRotation(pieceRotation => {
            let newPieceRotation;
    
            if (pieceRotation === 240 || pieceRotation === 420) {
                newPieceRotation = 0;
            } else {
                newPieceRotation = pieceRotation + 120
            }
    
            if (odd && newPieceRotation === 0) {
                newPieceRotation = 180;
            }
            return newPieceRotation;
        });

    };


    return (
        <div
            className={`${classes['grab-handle']} ${odd && classes['odd']}`}
            onClick={rotateHandler}>

            <div 
                style={{ transform : `rotate(${pieceRotation}deg)` }}
                className={classes.triangle}>

                <div className={classes.overlay}>

                    {/* bottom  - go clockwise */}
                    <div className={[classes['overlay-edge'], classes.orange].join(' ')}>
                        <span>- O +</span>
                    </div>

                    {/* left */}
                    <div className={[classes['overlay-edge'], classes.purple].join(' ')}>
                        <span>- P +</span>
                    </div>

                    {/* right */}
                    <div className={[classes['overlay-edge'], classes.green].join(' ')}>
                        <span>- G +</span>
                    </div>
                    
                </div>
            </div>
        </div>
    );
}