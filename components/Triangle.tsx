import { DragPreviewImage, useDrag } from 'react-dnd';

import classes from './Triangle.module.scss';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { actions as piecesActions } from '../store/pieces';
import { TRIANGLE_CLASS_RIGHT_RATIO } from '../store/sizing';
import { Piece, DragItemTypes } from '../types';
import PieceEdge from './PieceEdge';
import { useEffect } from 'react';

interface TriangleProps {
    piece: Piece;
    spotId: number;
    odd?: boolean;
};

export default function Triangle(props: TriangleProps) {
    const rotation = useAppSelector(state => state.pieces.board['spot' + props.spotId]).rotation;

    const sizing = useAppSelector(state => state.sizing);
    const showIds = useAppSelector(state => state.controls.pieceIds);
    const dispatch = useAppDispatch();

    const [{isDragging, isDropped}, drag, preview] = useDrag(() => ({
        type: DragItemTypes.PIECE,
        collect: monitor => ({
            isDragging: !!monitor.isDragging(),
            isDropped: !!monitor.didDrop() // endDrag ? where
        })
    }));

    useEffect(() => {
        // pass in spot # too for now
        // prob eventually want to keep track of piece, spot, and rotation in store ...
        if (isDragging) {
            dispatch(piecesActions.dragStarted({
                piece: props.piece,
                rotation: rotation,
                spot: props.spotId,
                // bank: props.bank
            }));
        }
        else {
            console.log('DROpped from triangle: ', isDropped);
            // dispatch(piecesActions.dragEnded());
        }


        // add call for dragEnded - not in bank or spot (currently drops the piece)

    }, [isDragging]);

    useEffect(() => {
        // console.log('DROpped from triangle: ', isDropped);
        dispatch(piecesActions.dragEnded());  // does not run unless drop target hit
    }, [isDropped]);


    let rotationDegrees = props.odd ? 180 : 0;
    if (rotation) {
        if (rotation === 2) rotationDegrees += 240;
        else if (rotation === 3) rotationDegrees += 120;
    }

    const rotateHandler = () => {
        dispatch(piecesActions.rotate({
            id: props.spotId,
        }));
    };


    return (
        <div
            ref={drag}
            draggable='true'
            className={`${classes['grab-handle']} ${props.odd && classes['odd']}`}
            style={{ width: sizing.grabHandleDiameter, height: sizing.grabHandleDiameter }}
            onClick={rotateHandler}>

            { showIds && <span className={classes['piece-id']}>{props.piece.id}</span>}

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

            {/* <DragPreviewImage connect={preview} >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="hotpink" width="50px" height="50px"><path d="M0 0h24v24H0z" fill="none"/><path d="M20.5 11H19V7c0-1.1-.9-2-2-2h-4V3.5C13 2.12 11.88 1 10.5 1S8 2.12 8 3.5V5H4c-1.1 0-1.99.9-1.99 2v3.8H3.5c1.49 0 2.7 1.21 2.7 2.7s-1.21 2.7-2.7 2.7H2V20c0 1.1.9 2 2 2h3.8v-1.5c0-1.49 1.21-2.7 2.7-2.7 1.49 0 2.7 1.21 2.7 2.7V22H17c1.1 0 2-.9 2-2v-4h1.5c1.38 0 2.5-1.12 2.5-2.5S21.88 11 20.5 11z"/></svg>
            </DragPreviewImage> */}
        </div>
    );
}