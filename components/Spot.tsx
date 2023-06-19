import classes from './Spot.module.scss';
import Triangle from './Triangle';
import { useAppSelector } from '../store/hooks';

interface SpotProps {
    id: number;
    odd?: boolean;
};

export default function Spot(props: SpotProps) {
    const piece = useAppSelector((state) => state.pieces.board['spot' + props.id].piece);
    let rotation = props.odd ? 180 : 0;

    return (
        <div className={`${classes['grab-handle']} ${props.odd && classes['odd']}`}>

            <div className={classes.triangle} style={{ transform : `rotate(${rotation}deg)` }}>
              <div></div>
              <div></div>
              <div></div>
            </div>

            {piece && <Triangle piece={piece} spotId={props.id} odd={props.odd} />}
        </div>
    );
}