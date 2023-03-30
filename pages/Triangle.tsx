import { useState } from 'react';
import classes from './Triangle.module.scss';

export default function Triangle({ odd }: { odd?: boolean}) {
    const [pieceRotation, setPieceRotation] = useState(odd ? 180 : 0);

    const rotateHandler = () => {
        let newPieceRotation;

        if (pieceRotation === 240 || pieceRotation === 420) {
            newPieceRotation = 0;
        } else {
            newPieceRotation = pieceRotation + 120
        }

        if (odd && newPieceRotation === 0) {
            newPieceRotation = 180;
        }
        setPieceRotation(newPieceRotation);
    };

    return (
        <div
            className={odd ? `${classes['grab-handle']} ${classes['odd']}` : classes['grab-handle']}
            onClick={rotateHandler}>

            <div 
                style={{ transform : `rotate(${pieceRotation}deg)` }}
                className={classes.triangle}>

                <div className={classes.overlay}>

                    <div className={classes['overlay-corner']}>
                        {/* <div className={styles.green}>G</div> */}
                    </div>
                    <div className={classes['overlay-corner']}>
                        {/* <div className={styles.purple}>P</div> */}
                    </div>
                    <div className={classes['overlay-corner']}>
                        {/* <div className={styles.orange}>O</div> */}
                    </div>

                </div>
            </div>
        </div>
    );
}