import { useAppSelector } from '../store/hooks';

import classes from './Spot.module.scss';
import Triangle from './Triangle';
import { GRAB_HANDLE_TOP_RATIO, GRAB_HANDLE_TOP_RATIO_ODD, TRIANGLE_CLASS_RIGHT_RATIO } from '../store/sizing';

interface SpotProps {
    id: number;
    odd?: boolean;
};

export default function Spot(props: SpotProps) {
    const piece = useAppSelector(state => state.pieces.board['spot' + props.id].piece);
    const showBorders = useAppSelector(state => state.controls).borders;
    const sizing = useAppSelector(state => state.sizing);

    let rotation = props.odd ? 180 : 0;

    return (
        <div
            className={`${classes['grab-handle']} ${props.odd && classes['odd']}`}
            style={{
                width: sizing.grabHandleDiameter,
                height: sizing.grabHandleDiameter,
                top: props.odd ? (sizing.triangleSize * GRAB_HANDLE_TOP_RATIO_ODD) : (sizing.triangleSize * GRAB_HANDLE_TOP_RATIO),
                margin: `0 ${sizing.triangleSize * sizing.grabHandleMarginRatio}px`,
            }}>

            <div
                className={classes.triangle}
                style={{
                    transform : `rotate(${rotation}deg)`,
                    borderLeft: (sizing.triangleSize / 2) + 'px solid transparent',
                    borderRight: (sizing.triangleSize / 2) + 'px solid transparent',
                    borderBottom: (sizing.triangleHeight) + 'px solid whitesmoke',
                    right: sizing.triangleSize * TRIANGLE_CLASS_RIGHT_RATIO
                }}>

                {/* bottom */}
                <div style={{
                    width: sizing.triangleSize + 2,
                    height: sizing.pieceBorderHeight,
                    top: sizing.triangleHeight - sizing.pieceBorderHeight / 2,
                    left: sizing.triangleSize / -2,
                    background: showBorders ? 'rgba(135, 206, 235, 1)' : 'none',  // skyblue
                    }}>
                </div>
                {/* right */}
                <div style={{
                    width: sizing.triangleSize + 2,
                    height: sizing.pieceBorderHeight,
                    top: sizing.triangleHeight / 2 - sizing.pieceBorderHeight / 2,
                    left: -sizing.triangleSize / 4 - 1,
                    background: showBorders ? 'rgba(135, 206, 235, 1)' : 'none',
                }}>
                </div>
                {/* left */}
                <div style={{
                    width: sizing.triangleSize + 2,
                    height: sizing.pieceBorderHeight,
                    top: sizing.triangleHeight / 2 - sizing.pieceBorderHeight / 2,
                    left: -sizing.triangleSize * 3/4 - 1,
                    background: showBorders ? 'rgba(135, 206, 235, 1)' : 'none'
                    }}>
                </div>
            </div>

            {piece && <Triangle piece={piece} spotId={props.id} odd={props.odd} />}
        </div>
    );
}