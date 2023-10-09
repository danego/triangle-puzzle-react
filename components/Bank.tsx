import { useDrop } from 'react-dnd';

import classes from './Bank.module.scss';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { actions as piecesActions } from '../store/pieces';
import { DragItemTypes } from '../types';
import TriangleLayerPreviewBank from './triangle-layers/TriangleLayerPreviewBank';
import TriangleLayerPieceBank from './triangle-layers/TriangleLayerPieceBank';


const Bank = () => {
    const sizing = useAppSelector(state => state.sizing);
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

            {bankPieces.map(({piece}, i) => {
                return (
                    <div
                        key={piece.id}
                        className={classes.triangleContainer}
                        style={{
                            width: sizing.triangleSize,
                            height: sizing.triangleHeight,
                        }}>
                        <TriangleLayerPieceBank piece={piece} bankIndex={i} topPosition={topPosition} />
                    </div>
            )})}


            {/* Piece Preview */}
            {isOver && <TriangleLayerPreviewBank bankIndex={0} />}
        </div>
    </>;
};

export default Bank;