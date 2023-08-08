import classes from './PieceEdge.module.scss';
import { Half, PieceEdgeLocation } from '../types';

interface PieceEdgeProps {
    side: PieceEdgeLocation;
    edgeType: string;
    edgeHalf: Half;
    edgeSize: number;
}

const PieceEdge = (props: PieceEdgeProps) => {
    let positionValueCSS;
    if(props.side === 'bottom') positionValueCSS = { left: `calc(50% - ${props.edgeSize / 2}px)` };
    if (props.side === 'left') positionValueCSS = { left: `calc(25% - ${props.edgeSize / 2}px)` };
    if (props.side === 'right') positionValueCSS = { right: `calc(25% - ${props.edgeSize / 2}px)` };


    return <div
        className={classes['overlay-edge']}
        style={{
            width: props.edgeSize,
            height: props.edgeSize,
            ...positionValueCSS
        }}>
        <div className={classes[`${props.edgeType + '-' + props.edgeHalf}`]}></div>
    </div>;
};

export default PieceEdge;