import { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import classes from './Controls.module.scss';
import { RootState } from "../store/index";
import { actions as piecesActions } from '../store/pieces';
import { SolutionsState, loadSolution } from '../store/solutions';
import FramelessSolutionsContext from '../store/frameless-solutions-context';
import puzzleBirds from '../birds';
import { SolutionTypes } from '../types';

const Controls = () => {
    const solutionsState = useSelector<RootState>(state => state.solutions) as SolutionsState;
    const solutionsFramelessCtx = useContext(FramelessSolutionsContext);
    const dispatch = useDispatch();


    const stateButtonHandler = () => {
        dispatch(piecesActions.start());
    };

    const loadSolutionHandler2 = (event: React.ChangeEvent<HTMLSelectElement>) => {
        event?.preventDefault();
        const value = event.target.value;
        //@ts-ignore
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

            <button onClick={stateButtonHandler}>STATE</button>

            <select id="solutions" onChange={loadSolutionHandler2}>
                <optgroup label="Default">
                    <option value={SolutionTypes.default + '|' + '-1'}>-1</option>
                    <option value={SolutionTypes.default + '|' + '0'}>0</option>
                </optgroup>

                <optgroup label="Framed">
                    <option value={SolutionTypes.framed + '|' + '-1'}>1</option>
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