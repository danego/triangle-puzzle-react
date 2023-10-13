import { useAppSelector } from '../../store/hooks';
import { Piece } from '../../types';
import Triangle from '../Triangle';

interface TriangleLayerPreviewBoardProps {
    spotPiece: Piece | null;
    spotId: number;
    odd?: boolean;
}

const TriangleLayerPreviewBoard = (props: TriangleLayerPreviewBoardProps) => {
    const isDragging = useAppSelector(state => state.pieces.isDragging);

    const pieceInSpotAlready = props.spotPiece;
    const dragStartedFromCurrentSpot = props.spotId === isDragging?.spot;
    const dragStartedFromBank = isDragging?.bank;

    return <>
        {
            isDragging  &&
            (!pieceInSpotAlready || (dragStartedFromCurrentSpot && !dragStartedFromBank)) &&
                <Triangle
                    rotation={isDragging.rotation}
                    dragStarted={() => {}}
                    rotateHandler={() => {}}
                    piece={isDragging.piece}
                    spotId={props.spotId}
                    odd={props.odd}
                    />
        }
    </>;
};

export default TriangleLayerPreviewBoard;