import { useDrop } from 'react-dnd';

import classes from './Bank.module.scss';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { actions as piecesActions } from '../store/pieces';
import { DragItemTypes } from '../types';
import TriangleLayerPreviewBank from './triangle-layers/TriangleLayerPreviewBank';
import TriangleLayerPieceBank from './triangle-layers/TriangleLayerPieceBank';


const Bank = () => {
    const sizing = useAppSelector(state => state.sizing);
    const isDragging = useAppSelector(state => state.pieces.isDragging);
    const bankPieces = useAppSelector(state => state.pieces.bank);

    const dispatch = useAppDispatch();

    const [{isOver}, drop] = useDrop(() => ({
        accept: DragItemTypes.PIECE,
        drop: (data) => {
            console.log('dropped IN a spot');
            dispatch(piecesActions.dragEndedInBank());

            // call focus to bottom of container
            // drop.current.scrollIntoView(false);
        },
        collect: (monitor) => ({
            isOver: !!monitor.isOver()
        })
    }),
        // [x , y]
    );

    const topPosition = sizing.triangleHeight / 2 - sizing.grabHandleDiameter / 2;


    return <>
        <div
            ref={drop}
            className={classes.bank + ' panel'}
            style={{
                width: sizing.triangleSize,  // * 2 optionally
            }}>

            {/* Piece Preview */}
            {isOver && isDragging &&
                <div
                    className={classes.triangleContainer}
                    style={{
                        width: sizing.triangleSize,
                        height: sizing.triangleHeight,
                    }}>
                        <TriangleLayerPreviewBank piece={isDragging.piece} bankIndex={0} topPosition={topPosition} />
                </div>
            }

            {bankPieces.map(({piece}, i) => (
                <>
                    <div
                        className={classes.triangleContainer}
                        style={{
                            width: sizing.triangleSize,
                            height: sizing.triangleHeight,
                        }}>
                        <TriangleLayerPieceBank key={piece.id} piece={piece} bankIndex={i} topPosition={topPosition} />
                    </div>
                </>
            ))}
        </div>
    </>;
};

export default Bank;