import classes from './Triangle.module.scss';
import { actions as piecesActions } from '../store/pieces';
import { Piece } from '@/types';
import { useAppDispatch, useAppSelector } from '../store/hooks';

interface TriangleProps {
    piece: Piece;
    spotId: number;
    odd?: boolean;
};

export default function Triangle(props: TriangleProps) {
    const rotation = useAppSelector((state) => state.pieces.board['spot' + props.spotId].rotation);
    const dispatch = useAppDispatch();

    let rotationDegrees = props.odd ? 180 : 0;
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