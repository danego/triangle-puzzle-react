import classes from './Frame.module.scss';
import { useAppSelector } from '@/store/hooks';
import PieceEdge from './PieceEdge';
import puzzle from '../birds';

const Frame = () => {
    const sizing = useAppSelector(state => state.sizing);

    const frameEdgesBottom = puzzle.frameBottom!;
    const frameEdgesLeft = puzzle.frameLeft!;
    const frameEdgesRight = puzzle.frameRight!;

    return <>
        <div
            className={classes.frameEdge}
            style={{
                width: sizing.frameWidth,
                height: sizing.frameHeight,
                bottom: sizing.frameEdgeBottomPositionBottom
            }}>
            {frameEdgesBottom.map((edge, i) => {
                return (
                    <div style={{ height: sizing.edgeSize }} key={i} >
                        <PieceEdge
                            side='frame'
                            edgeType={edge.type}
                            edgeHalf={edge.half}
                            edgeSize={sizing.edgeSize}
                        />
                    </div>
                );
            })}
        </div>

        <div
            className={[classes.frameEdge, classes.frameEdgeLeft].join(' ')}
            style={{
                width: sizing.frameWidth,
                height: sizing.frameHeight,
                right: sizing.frameEdgeLeftPosition,
                bottom: sizing.frameEdgeLRPositionBottom
            }}>
            {frameEdgesLeft.map((edge, i) => {
                return (
                    <div style={{ height: sizing.edgeSize }} key={i} >
                        <PieceEdge
                            side='frame'
                            edgeType={edge.type}
                            edgeHalf={edge.half}
                            edgeSize={sizing.edgeSize}
                        />
                    </div>
                );
            })}
        </div>

        <div
            className={[classes.frameEdge, classes.frameEdgeRight].join(' ')}
            style={{
                width: sizing.frameWidth,
                height: sizing.frameHeight,
                left: sizing.frameEdgeRightPosition,
                bottom: sizing.frameEdgeLRPositionBottom
            }}>
            {frameEdgesRight.map((edge, i) => {
                return (
                    <div style={{ height: sizing.edgeSize }} key={i} >
                        <PieceEdge
                            side='frame'
                            edgeType={edge.type}
                            edgeHalf={edge.half}
                            edgeSize={sizing.edgeSize}
                        />
                    </div>
                );
            })}
        </div>
    </>;
};

export default Frame;