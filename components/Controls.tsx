import { useContext, useState } from 'react';

import classes from './Controls.module.scss';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { loadSolution } from '../store/solutions';
import FramelessSolutionsContext from '../store/solutions/frameless-solutions-context';
import puzzleBirds from '../birds';
import { SolutionTypes } from '../types';
import { sizingActions } from '../store/sizing';
import { controlsActions } from '../store/controls';

const Controls = () => {
    const solutionsState = useAppSelector(state => state.solutions);
    const [selectedSolution, setSelectedSolution] = useState(SolutionTypes.default + '|' + '-1');
    const dispatch = useAppDispatch();

    const meshingFactor = useAppSelector(state => state.sizing.meshingFactor);
    const controls = useAppSelector(state => state.controls);

    const borderToggleHandler = () => {
        dispatch(controlsActions.toggleBorders());
    };
    const frameToggleHandler = () => {
        dispatch(controlsActions.toggleFrame());
    };
    const pieceIdToggleHandler = () => {
        dispatch(controlsActions.togglePieceIds());
    };

    const loadSolutionHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
        event?.preventDefault();
        const value = event.target.value;
        setSelectedSolution(value);
        dispatch(loadSolution({
            type: value.split('|')[0],
            number: +value.split('|')[1]
        }));
    };

    const grabHandleMarginHandler = (event: any) => {
        if (+event.target.value > 5 || +event.target.value < -5) event.target.value = 1;
        dispatch(sizingActions.increaseMeshingFactor(+event.target.value));
    };


    return (
        <div className={classes.panel}>
            <button onClick={borderToggleHandler} className={[classes.pill, classes.borders].join(' ')} title="Toggle borders between piece spots">
                { controls.borders ? 'Hide Borders' : 'Show Borders' }
            </button>
            <button onClick={frameToggleHandler} className={[classes.pill, classes.frame].join(' ')} title="Toggle frame to match solution type">
                { controls.frame ? 'Hide Frame' : 'Show Frame' }
            </button>
            <button onClick={pieceIdToggleHandler} className={[classes.pill, classes.pieceIds].join(' ')} title="Toggle visible IDs on pieces">
                { controls.pieceIds ? 'Hide Piece IDs' : 'Show Piece IDs' }
            </button>

            <span>
                <label htmlFor='solutions'>Solution #:</label>
                <select
                    id="solutions"
                    name="solutions"
                    className={classes.pill}
                    title="Load all pieces or a specific solution"
                    onChange={loadSolutionHandler}
                    value={selectedSolution} >
                    <optgroup label="Default">
                        <option value={SolutionTypes.default + '|' + '-1'}>Empty</option>
                        <option value={SolutionTypes.default + '|' + '0'}>SEQ</option>
                    </optgroup>

                    <optgroup label="Framed">
                        {solutionsState.allSolutionsFramed.map((soln, i) => {
                            return <option value={SolutionTypes.framed + '|' + i}  key={i}>{i}</option>
                        })}
                    </optgroup>

                    <optgroup label="Frameless">
                        {solutionsState.allSolutionsFrameless.map((soln, i) => {
                            return <option value={SolutionTypes.frameless + '|' + i} key={i}>
                                {i}
                            </option>;
                        })}
                    </optgroup>
                </select>
            </span>

            <span>
                <label htmlFor="meshing-factor">Meshing Factor:</label>
                <input
                    type='number'
                    style={{margin: 10, width: 80}}
                    name="meshing-factor"
                    step={.1}
                    max="5"
                    min="-5"
                    className={classes.pill}
                    title="Fine tune the space between pieces"
                    value={meshingFactor}
                    onChange={grabHandleMarginHandler} />
            </span>
        </div>
    );
};

export default Controls;