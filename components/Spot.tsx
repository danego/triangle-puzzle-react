import { useAppDispatch, useAppSelector } from '../store/hooks';
import { useDrop } from 'react-dnd';

import classes from './Spot.module.scss';
import { GRAB_HANDLE_TOP_RATIO, GRAB_HANDLE_TOP_RATIO_ODD, TRIANGLE_CLASS_RIGHT_RATIO } from '../store/sizing';
import { DragItemTypes } from '@/types';
import { actions as piecesActions } from '../store/pieces';
import TriangleLayerPieceBoard from './triangle-layers/TriangleLayerPieceBoard';
import TriangleLayerPreviewBoard from './triangle-layers/TriangleLayerPreviewBoard';


interface SpotProps {
    id: number;
    odd?: boolean;
};

export default function Spot(props: SpotProps) {
    const piece = useAppSelector(state => state.pieces.board['spot' + props.id].piece);
    const showBorders = useAppSelector(state => state.controls).borders;
    const sizing = useAppSelector(state => state.sizing);

    const dispatch = useAppDispatch();
    const [{isOver}, drop] = useDrop(() => ({
        accept: DragItemTypes.PIECE,
        drop: (data) => {
            console.log('dropped in a SPOT');
            dispatch(piecesActions.dragEndedInSpot(props.id))
        },
        collect: (monitor) => ({
            isOver: !!monitor.isOver()
        })
        }),
        // [x , y]
    );

    let rotation = props.odd ? 180 : 0;


    return (
        <div
            ref={drop}
            className={`${classes['grab-handle']} ${props.odd && classes['odd']}`}
            style={{
                width: sizing.grabHandleDiameter,
                height: sizing.grabHandleDiameter,
                top: props.odd ? (sizing.triangleSize * GRAB_HANDLE_TOP_RATIO_ODD) : (sizing.triangleSize * GRAB_HANDLE_TOP_RATIO),
                margin: `0 ${sizing.triangleSize * sizing.grabHandleMarginRatio}px`,
            }}>

            <div
                className={classes.triangle}
                style={{
                    transform : `rotate(${rotation}deg)`,
                    borderLeft: (sizing.triangleSize / 2) + 'px solid transparent',
                    borderRight: (sizing.triangleSize / 2) + 'px solid transparent',
                    borderBottom: (sizing.triangleHeight) + 'px solid whitesmoke',
                    right: sizing.triangleSize * TRIANGLE_CLASS_RIGHT_RATIO
                }}>

                {/* bottom */}
                <div style={{
                    width: sizing.triangleSize + 2,
                    height: sizing.pieceBorderHeight,
                    top: sizing.triangleHeight - sizing.pieceBorderHeight / 2,
                    left: sizing.triangleSize / -2,
                    background: showBorders ? 'rgba(135, 206, 235, 1)' : 'none',  // skyblue
                    }}>
                </div>
                {/* right */}
                <div style={{
                    width: sizing.triangleSize + 2,
                    height: sizing.pieceBorderHeight,
                    top: sizing.triangleHeight / 2 - sizing.pieceBorderHeight / 2,
                    left: -sizing.triangleSize / 4 - 1,
                    background: showBorders ? 'rgba(135, 206, 235, 1)' : 'none',
                }}>
                </div>
                {/* left */}
                <div style={{
                    width: sizing.triangleSize + 2,
                    height: sizing.pieceBorderHeight,
                    top: sizing.triangleHeight / 2 - sizing.pieceBorderHeight / 2,
                    left: -sizing.triangleSize * 3/4 - 1,
                    background: showBorders ? 'rgba(135, 206, 235, 1)' : 'none'
                    }}>
                </div>
            </div>

            {piece && <TriangleLayerPieceBoard piece={piece} spotId={props.id} odd={props.odd} />}

            {/* Piece Preview */}
            {isOver && <TriangleLayerPreviewBoard spotPiece={piece} spotId={props.id} odd={props.odd} />}
        </div>
    );
}