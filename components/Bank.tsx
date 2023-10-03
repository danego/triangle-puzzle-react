import { useDrop } from 'react-dnd';

import classes from './Bank.module.scss';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { actions as piecesActions } from '../store/pieces';
import Triangle from './Triangle';
import { DragItemTypes, Piece } from '../types';
import { useRef } from 'react';



const Bank = () => {
    const sizing = useAppSelector(state => state.sizing);
    const isDraggingPiece = useAppSelector(state => state.pieces.isDragging);

    const dispatch = useAppDispatch();

    const bankPieces = useAppSelector(state => state.pieces.bank);
    const [{isOver}, drop] = useDrop(() => ({
        accept: DragItemTypes.PIECE,
        drop: (data) => {
            console.log(data);
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



    return <>
        <div
            ref={drop}
            className={classes.bank + ' panel'}
            style={{
                width: sizing.triangleSize,  // * 2 optionally
            }}>

            {isOver && isDraggingPiece && <div className={classes.dropPreview}></div>}

            {bankPieces.map(({piece}, i) => (
                <>
                    <div
                        className={classes.triangleContainer}
                        style={{
                            width: sizing.triangleSize,
                            height: sizing.triangleHeight,
                        }}>
                        <Triangle key={piece.id} piece={piece} spotId={i}/>
                    </div>
                </>
            ))}
        </div>
    </>;
};

export default Bank;