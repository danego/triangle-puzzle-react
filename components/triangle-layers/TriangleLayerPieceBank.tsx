import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { actions as piecesActions } from '../../store/pieces';
import { Piece } from '../../types';
import Triangle from '../Triangle';

interface TriangleLayerPieceBankProps {
    piece: Piece;
    bankIndex: number;
    topPosition: number;
}

const TriangleLayerPieceBank = (props: TriangleLayerPieceBankProps) => {
    const rotation = useAppSelector(state => state.pieces.bank[props.bankIndex]).rotation;

    const rotateHandler = () => {
        dispatch(piecesActions.rotatePieceInBank({
            id: props.bankIndex,
        }));
    };

    const dispatch = useAppDispatch();
    const dragStartedHandler = () => {
        dispatch(piecesActions.dragStarted({
            piece: props.piece,
            rotation: rotation,
            spot: props.bankIndex,
            bank: true
        }));
    };


    return (
        <Triangle
            rotation={rotation || null}
            dragStarted={dragStartedHandler}
            rotateHandler={rotateHandler}
            piece={props.piece}
            spotId={props.bankIndex}
            topPosition={props.topPosition}
            />
    );
};

export default TriangleLayerPieceBank;