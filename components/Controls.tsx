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
    const solutionsFramelessCtx = useContext(FramelessSolutionsContext);
    const [selectedSolution, setSelectedSolution] = useState(SolutionTypes.default + '|' + '-1');
    const dispatch = useAppDispatch();

    const sizing = useAppSelector(state => state.sizing);
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

    const numInputChangeHandler = (event: any) => {
        dispatch(sizingActions.setTriangleSize(+event.target.value));
    };
    const grabHandleMarginHandler = (event: any) => {
        if (+event.target.value > 5 || +event.target.value < -5) event.target.value = 1;
        dispatch(sizingActions.increaseMeshingFactor(+event.target.value));
    };


    return (
        <div className={classes.buttons}>
            <button onClick={solutionsFramelessCtx.findSolutions.bind(this, puzzleBirds)}>
                re-run solutions
            </button>

            <button onClick={borderToggleHandler}>
                { controls.borders ? 'Hide Borders' : 'Show Borders' }
            </button>
            <button onClick={frameToggleHandler}>
                { controls.frame ? 'Hide Frame' : 'Show Frame' }
            </button>
            <button onClick={pieceIdToggleHandler}>
                { controls.pieceIds ? 'Hide Piece IDs' : 'Show Piece IDs' }
            </button>

            <select id="solutions" onChange={loadSolutionHandler} value={selectedSolution}>
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

            <span>
                <input type='number' style={{margin: 10, width: 50}} value={sizing.triangleSize} onChange={numInputChangeHandler} />
            </span>
            <span>
                <label htmlFor="meshing-factor">Meshing Factor</label>
                <input
                    type='number'
                    style={{margin: 10, width: 80}}
                    name="meshing-factor"
                    step={.1}
                    max="5"
                    min="-5"
                    value={sizing.meshingFactor}
                    onChange={grabHandleMarginHandler} />
            </span>
        </div>
    );
};

export default Controls;