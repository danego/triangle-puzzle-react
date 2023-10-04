import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { actions as piecesActions } from '../../store/pieces';
import { Piece } from '../../types';
import Triangle from '../Triangle';

interface TriangleLayerPreviewBankProps {
    piece: Piece;
    spotId: number;
    odd?: boolean;
}

const TriangleLayerPreviewBank = (props: TriangleLayerPreviewBankProps) => {
    const rotation = useAppSelector(state => state.pieces.isDragging?.rotation);

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
            rotateHandler={() => {}}
            piece={props.piece}
            spotId={props.spotId}
            odd={props.odd}
            />
    );
};

export default TriangleLayerPreviewBank;