import classes from './Triangle.module.scss';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { actions as piecesActions } from '../store/pieces';
import { TRIANGLE_CLASS_RIGHT_RATIO } from '../store/sizing';
import { Piece } from '../types';

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
                    <div
                        className={classes['overlay-edge']}
                        style={{
                            width: sizing.edgeSize,
                            height: sizing.edgeSize,
                            left: `calc(50% - ${sizing.edgeSize / 2}px)`
                        }}>
                        <div className={classes[`${props.piece.edge1.type + '-' + props.piece.edge1.half}`]}></div>
                    </div>

                    {/* left 2 */}
                    <div
                        className={classes['overlay-edge']}
                        style={{
                            width: sizing.edgeSize,
                            height: sizing.edgeSize,
                            left: `calc(25% - ${sizing.edgeSize / 2}px)`
                        }}>
                        <div className={classes[`${props.piece.edge2.type + '-' + props.piece.edge2.half}`]}></div>
                    </div>

                    {/* right / 3 */}
                    <div
                        className={classes['overlay-edge']}
                        style={{
                            width: sizing.edgeSize,
                            height: sizing.edgeSize,
                            right: `calc(25% - ${sizing.edgeSize / 2}px)`
                        }}>
                        <div className={classes[`${props.piece.edge3.type + '-' + props.piece.edge3.half}`]}></div>
                    </div>
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