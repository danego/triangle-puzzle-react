import { useContext } from 'react';

import classes from './Controls.module.scss';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { loadSolution } from '../store/solutions';
import FramelessSolutionsContext from '../store/solutions/frameless-solutions-context';
import puzzleBirds from '../birds';
import { SolutionTypes } from '../types';

const Controls = () => {
    const solutionsState = useAppSelector(state => state.solutions);
    const solutionsFramelessCtx = useContext(FramelessSolutionsContext);
    const dispatch = useAppDispatch();

    const loadSolutionHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
        event?.preventDefault();
        const value = event.target.value;
        dispatch(loadSolution({
            type: value.split('|')[0],
            number: +value.split('|')[1]
        }));
    };


    return (
        <div className={classes.buttons}>
            <button onClick={solutionsFramelessCtx.findSolutions.bind(this, puzzleBirds)}>
                re-run solutions
            </button>

            <select id="solutions" onChange={loadSolutionHandler} defaultValue={SolutionTypes.default + '|' + '-1'}>
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
        </div>
    );
};

export default Controls;