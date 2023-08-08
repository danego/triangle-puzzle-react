import classes from './Triangle.module.scss';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { actions as piecesActions } from '../store/pieces';
import { TRIANGLE_CLASS_RIGHT_RATIO } from '../store/sizing';
import { Piece } from '../types';
import PieceEdge from './PieceEdge';

interface TriangleProps {
    piece: Piece;
    spotId: number;
    odd?: boolean;
};

export default function Triangle(props: TriangleProps) {
    const rotation = useAppSelector(state => state.pieces.board['spot' + props.spotId].rotation);
    const sizing = useAppSelector(state => state.sizing);
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
            style={{ width: sizing.grabHandleDiameter, height: sizing.grabHandleDiameter }}
            onClick={rotateHandler}>

            <span className={classes['piece-id']}>{props.piece.id}</span>

            <div
                className={classes.triangle}
                style={{
                    transform : `rotate(${rotationDegrees}deg)`,
                    borderLeft: (sizing.triangleSize / 2) + 'px solid transparent',
                    borderRight: (sizing.triangleSize / 2) + 'px solid transparent',
                    borderBottom: (sizing.triangleHeight) + 'px solid paleturquoise',
                    right: sizing.triangleSize * TRIANGLE_CLASS_RIGHT_RATIO
                }}>

                <div
                    className={classes.overlay}
                    style={{
                        width: sizing.triangleSize,
                        height: sizing.triangleHeight,
                        left: sizing.triangleSize / -2,
                    }}>
                    {/* bottom 1  - go clockwise */}

                    <PieceEdge
                        side='bottom'
                        edgeType={props.piece.edge1.type}
                        edgeHalf={props.piece.edge1.half}
                        edgeSize={sizing.edgeSize}
                    />
                    {/* left 2 */}
                    <PieceEdge
                        side='left'
                        edgeType={props.piece.edge2.type}
                        edgeHalf={props.piece.edge2.half}
                        edgeSize={sizing.edgeSize}
                    />
                    {/* right / 3 */}
                    <PieceEdge
                        side='right'
                        edgeType={props.piece.edge3.type}
                        edgeHalf={props.piece.edge3.half}
                        edgeSize={sizing.edgeSize}
                    />
                </div>


                {/* Color Lines Border */}
                {/*
                <div className={`${classes.border} ${props.odd ? classes['border-odd'] : ''}`}></div>
                <div className={`${classes.border} ${props.odd ? classes['border-odd'] : ''}`}></div>
                <div className={`${classes.border} ${props.odd ? classes['border-odd'] : ''}`}></div>
                */}
            </div>
        </div>
    );
}