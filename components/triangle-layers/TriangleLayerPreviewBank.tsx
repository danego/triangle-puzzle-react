import classes from './TriangleLayerPreviewBank.module.scss';
import { useAppSelector } from '../../store/hooks';
import Triangle from '../Triangle';

interface TriangleLayerPreviewBankProps {
    bankIndex: number;
}

const TriangleLayerPreviewBank = (props: TriangleLayerPreviewBankProps) => {
    const sizing = useAppSelector(state => state.sizing);
    const isDragging = useAppSelector(state => state.pieces.isDragging);

    const topPosition = sizing.triangleHeight / 2 - sizing.grabHandleDiameter / 2;
    const dragStartedFromBank = isDragging?.bank;


    return <>
        {
            isDragging &&
            !dragStartedFromBank &&
                <div
                    className={classes.triangleContainer}
                    style={{
                        width: sizing.triangleSize,
                        height: sizing.triangleHeight,
                    }}>
                        <Triangle
                            rotation={isDragging.rotation}
                            dragStarted={() => {}}
                            rotateHandler={() => {}}
                            piece={isDragging.piece}
                            spotId={props.bankIndex}
                            topPosition={topPosition}
                            />
                </div>

        }
    </>;
};

export default TriangleLayerPreviewBank;