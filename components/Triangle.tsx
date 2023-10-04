import { DragPreviewImage, useDrag } from 'react-dnd';

import classes from './Triangle.module.scss';
import { useAppSelector } from '../store/hooks';
import { TRIANGLE_CLASS_RIGHT_RATIO } from '../store/sizing';
import { Piece, DragItemTypes } from '../types';
import PieceEdge from './PieceEdge';
import { MouseEventHandler, useEffect, useState } from 'react';

interface TriangleProps {
    piece: Piece;
    spotId: number;
    odd?: boolean;
    rotation: number | null;
    dragStarted: Function;
    rotateHandler: Function;
    topPosition?: number;
};

export default function Triangle(props: TriangleProps) {
    const sizing = useAppSelector(state => state.sizing);
    const showIds = useAppSelector(state => state.controls.pieceIds);

    const [{isDragging}, drag, preview] = useDrag(() => ({
        type: DragItemTypes.PIECE,
        collect: monitor => ({
            isDragging: !!monitor.isDragging(),
        })
    }));

    const [visibility, setVisibility] = useState(true);

    useEffect(() => {
        if (isDragging) {
            console.log('drag STARTED from triangle: ', isDragging);
            // make triangle hidden
            // have to unhide if isOver  && change logic in store.pieces
            setVisibility(false);

            props.dragStarted();
        }
        else {
            // console.log('drag ENDED from triangle: ', isDragging, isDropped, props.spotId);
            if (!visibility) setVisibility(true);
        }
    }, [isDragging]);

    let rotationDegrees = props.odd ? 180 : 0;
    if (props.rotation) {
        if (props.rotation === 2) rotationDegrees += 240;
        else if (props.rotation === 3) rotationDegrees += 120;
    }


    return (
        <div
            ref={drag}
            draggable='true'
            className={`${classes['grab-handle']} ${props.odd && classes['odd']}`}
            style={{
                width: sizing.grabHandleDiameter,
                height: sizing.grabHandleDiameter,
                visibility: visibility ? 'visible' : 'hidden',
                top: props.topPosition
            }}
            onClick={props.rotateHandler as MouseEventHandler}>

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
            </div>

            <DragPreviewImage connect={preview} src="https://www.google.com/imgres?imgurl=https%3A%2F%2Fstatic-00.iconduck.com%2Fassets.00%2Fextension-icon-2013x2048-mq8rfw86.png&tbnid=47AeQIEoZysa8M&vet=12ahUKEwib_fCC3duBAxWQKdAFHfcIC78QMygMegQIARBq..i&imgrefurl=https%3A%2F%2Ficonduck.com%2Ficons%2F15083%2Fextension&docid=DIj76r7_DtVGSM&w=2013&h=2048&q=puzzle%20extension%20icon&ved=2ahUKEwib_fCC3duBAxWQKdAFHfcIC78QMygMegQIARBq" />
            {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="hotpink" width="50px" height="50px"><path d="M0 0h24v24H0z" fill="none"/><path d=""/></svg> */}
        </div>
    );
}