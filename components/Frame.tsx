import classes from './Frame.module.scss';
import { useAppSelector } from '@/store/hooks';
import PieceEdge from './PieceEdge';
import puzzle from '../birds';

const Frame = () => {
    const sizing = useAppSelector(state => state.sizing);
    const showFrame = useAppSelector(state => state.controls.frame);
    const showBorders = useAppSelector(state => state.controls).borders;

    const frameVisibilityClasses = showFrame ?
        [classes.frameEdge, classes['fade-in']] :
        [classes.frameEdge, classes['fade-out']];

    const frameEdgesBottom = puzzle.frameBottom!;
    const frameEdgesLeft = puzzle.frameLeft!;
    const frameEdgesRight = puzzle.frameRight!;

    return <>
        <div
            className={frameVisibilityClasses.join(' ')}
            style={{
                width: sizing.frameWidth,
                height: sizing.frameHeight,
                bottom: sizing.frameEdgeBottomPositionBottom
            }}>
            {frameEdgesBottom.map((edge, i) => {
                return (
                    <div style={{ height: sizing.edgeSize }} key={i} className={classes.pieceEdgeContainer}>
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
        <div className={classes.border}
            style={{
                width: sizing.frameWidth,
                height: sizing.frameBorderHeight,
                bottom: sizing.frameEdgeBottomPositionBottom + sizing.frameHeight,
                background: showBorders && showFrame ? 'rgba(135, 206, 235, 1)' : 'none',  // skyblue
            }}>
        </div>

        <div
            className={[...frameVisibilityClasses, classes.frameEdgeSide, classes.frameEdgeLeft].join(' ')}
            style={{
                width: sizing.frameWidth,
                height: sizing.frameHeight,
                right: sizing.frameEdgeLeftPosition,
                bottom: sizing.frameEdgeLRPositionBottom
            }}>
            {frameEdgesLeft.map((edge, i) => {
                return (
                    <div style={{ height: sizing.edgeSize }} key={i} className={classes.pieceEdgeContainer}>
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
        <div className={[classes.border, classes.borderLeft].join(' ')}
            style={{
                width: sizing.frameWidth,
                height: sizing.frameBorderHeight,
                right: sizing.frameEdgeLeftPosition,
                bottom: sizing.frameEdgeLRPositionBottom - sizing.frameBorderHeight,
                background: showBorders && showFrame ? 'rgba(135, 206, 235, 1)' : 'none',  // skyblue
            }}>
        </div>

        <div
            className={[...frameVisibilityClasses, classes.frameEdgeSide, classes.frameEdgeRight].join(' ')}
            style={{
                width: sizing.frameWidth,
                height: sizing.frameHeight,
                left: sizing.frameEdgeRightPosition,
                bottom: sizing.frameEdgeLRPositionBottom
            }}>
            {frameEdgesRight.map((edge, i) => {
                return (
                    <div style={{ height: sizing.edgeSize }} key={i} className={classes.pieceEdgeContainer}>
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
        <div className={[classes.border, classes.borderRight].join(' ')}
            style={{
                width: sizing.frameWidth,
                height: sizing.frameBorderHeight,
                left: sizing.frameEdgeRightPosition,
                bottom: sizing.frameEdgeLRPositionBottom - sizing.frameBorderHeight,
                background: showBorders && showFrame ? 'rgba(135, 206, 235, 1)' : 'none',  // skyblue
            }}>
        </div>
    </>;
};

export default Frame;