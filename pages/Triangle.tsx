import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '@/store';
import { actions as piecesActions } from '../store/pieces';
import { Piece } from '@/types';
import classes from './Triangle.module.scss';

interface TriangleProps {
    piece: Piece;
    spotId: number;
    odd?: boolean;
};

export default function Triangle(props: TriangleProps) {
    const rotation = useSelector<RootState>((state) => state.pieces.board['spot' + props.spotId].rotation);
    const dispatch = useDispatch();

    let rotationDegrees = props.odd ? 180 : 0;
    // this logic should be moved to row loader service - when store added
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

    if (rotation) {
        if (rotation === 2) rotationDegrees += 240;
        else if (rotation === 3) rotationDegrees += 120;
    }

    const rotateHandler = () => {
        dispatch(piecesActions.rotate(props.spotId));
    };

    return (
        <div
            className={`${classes['grab-handle']} ${props.odd && classes['odd']}`}
            onClick={rotateHandler}>

            <span className={classes['piece-id']}>{props.piece.id}</span>

            <div
                style={{ transform : `rotate(${rotationDegrees}deg)` }}
                className={classes.triangle}>

                <div className={classes.overlay}>
                    {/* bottom 1  - go clockwise */}
                    <div className={classes['overlay-edge']}>
                        <div className={classes[`${props.piece.edge1.type + '-' + props.piece.edge1.half}`]}></div>
                    </div>

                    {/* left 2 */}
                    <div className={classes['overlay-edge']}>
                        <div className={classes[`${props.piece.edge2.type + '-' + props.piece.edge2.half}`]}></div>
                    </div>

                    {/* right / 3 */}
                    <div className={classes['overlay-edge']}>
                        <div className={classes[`${props.piece.edge3.type + '-' + props.piece.edge3.half}`]}></div>
                    </div>
                </div>
            </div>
        </div>
    );
}