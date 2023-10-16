import { DragPreviewImage, useDrag } from 'react-dnd';

import classes from './Triangle.module.scss';
import { useAppSelector } from '../store/hooks';
import { TRIANGLE_CLASS_RIGHT_RATIO } from '../store/sizing';
import { Piece, DragItemTypes } from '../types';
import PieceEdge from './PieceEdge';
import { MouseEventHandler, useState } from 'react';
import dragPreviewImage from '../styles/piece-preview.png';

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

   // Hide source piece during drag
    if (isDragging && visibility) {
        console.log('drag STARTED from triangle: ', isDragging);
        setVisibility(false);
        props.dragStarted();
    }
    // Show source piece after drag
    else if (!isDragging && !visibility) {
        console.log('drag ENDED from triangle: ', props.spotId);
        setVisibility(true);
    }

    let rotationDegrees = props.odd ? 180 : 0;
    if (props.rotation) {
        if (props.rotation === 2) rotationDegrees += 240;
        else if (props.rotation === 3) rotationDegrees += 120;
    }

    // const dragPreviewImageSource = './public/piece-preview.png'; // public/piece-preview.png
    // console.log(props.spotId, dragPreviewImage.src);
    // console.log(props.spotId, 'triangle');
    const dragPreviewImageSource = dragPreviewImage.src;


    return <>
        <div
            ref={drag}
            draggable='true'
            className={`${classes['grab-handle']} ${props.odd && classes['odd']}`}
            style={{
                width: sizing.grabHandleDiameter,
                height: sizing.grabHandleDiameter,
                display: visibility ? 'block' : 'none',
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
        </div>

        <DragPreviewImage connect={preview} src={dragPreviewImageSource} />
        {/* <div ref={preview} style={{zIndex: isDragging ? '1' : '-1' }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="hotpink" width="50px" height="50px"><path d="M0 0h24v24H0z" fill="none"/><path d="M20.5 11H19V7c0-1.1-.9-2-2-2h-4V3.5C13 2.12 11.88 1 10.5 1S8 2.12 8 3.5V5H4c-1.1 0-1.99.9-1.99 2v3.8H3.5c1.49 0 2.7 1.21 2.7 2.7s-1.21 2.7-2.7 2.7H2V20c0 1.1.9 2 2 2h3.8v-1.5c0-1.49 1.21-2.7 2.7-2.7 1.49 0 2.7 1.21 2.7 2.7V22H17c1.1 0 2-.9 2-2v-4h1.5c1.38 0 2.5-1.12 2.5-2.5S21.88 11 20.5 11z"/></svg>
        </div> */}
    </>;
}