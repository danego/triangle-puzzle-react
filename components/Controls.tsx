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

    const currentTriangleWidth = useAppSelector(state => state.sizing).triangleSize;
    const currentMarginRatio = useAppSelector(state => state.sizing).grabHandleMarginRatio;

    const borderToggleHandler = () => {
        dispatch(controlsActions.toggleBorders());
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


    // TEMPS
    const decrementSizingHandler = () => {
        dispatch(sizingActions.decrement());
    };
    const incrementSizingHandler = () => {
        dispatch(sizingActions.increment());
    };
    const numInputChangeHandler = (event: any) => {
        console.log(+event.target.value);
        dispatch(sizingActions.setTriangleSize(+event.target.value));
    };
    const grabHandleMarginHandler = (event: any) => {
        const difference = currentMarginRatio - +event.target.value;
        dispatch(sizingActions.increaseGrabHandleMargin(difference));
    };


    return (
        <div className={classes.buttons}>
            <button onClick={solutionsFramelessCtx.findSolutions.bind(this, puzzleBirds)}>
                re-run solutions
            </button>

            <button onClick={borderToggleHandler}>Toggle Spot Borders</button>

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


            {/* TEMPS */}
            <span>
                <button onClick={decrementSizingHandler}> - </button>
                <input type='number' style={{margin: 10, width: 50}} value={currentTriangleWidth} onChange={numInputChangeHandler} />
                <button onClick={incrementSizingHandler}> + </button>
            </span>
            <span>
                <input
                    type='number'
                    style={{margin: 10, width: 80}}
                    step={.0001}
                    value={currentMarginRatio}
                    onChange={grabHandleMarginHandler} />
            </span>
        </div>
    );
};

export default Controls;