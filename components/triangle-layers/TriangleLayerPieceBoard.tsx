import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { actions as piecesActions } from '../../store/pieces';
import { Piece } from '../../types';
import Triangle from '../Triangle';

interface TriangleLayerPieceBoardProps {
    piece: Piece;
    spotId: number;
    odd?: boolean;
}

const TriangleLayerPieceBoard = (props: TriangleLayerPieceBoardProps) => {
    const rotation = useAppSelector(state => state.pieces.board['spot' + props.spotId]).rotation;

    const rotateHandler = () => {
        dispatch(piecesActions.rotatePieceInBoard({
            id: props.spotId,
        }));
    };

    const dispatch = useAppDispatch();
    const dragStartedHandler = () => {
        dispatch(piecesActions.dragStarted({
            piece: props.piece,
            rotation: rotation,
            spot: props.spotId,
        }));
    };


    return (
        <Triangle
            rotation={rotation || null}
            dragStarted={dragStartedHandler}
            rotateHandler={rotateHandler}
            piece={props.piece}
            spotId={props.spotId}
            odd={props.odd}
            />
    );
};

export default TriangleLayerPieceBoard;