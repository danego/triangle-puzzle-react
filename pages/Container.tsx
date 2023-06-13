import React, { useContext, useEffect } from "react";
import { useDispatch } from 'react-redux';

import classes from './Container.module.scss';
import puzzleBirds from '../birds';
import FramelessSolutionsContext from "@/store/frameless-solutions-context";
import Board from '../components/Board';
import Controls from '../components/Controls';
import Frame from '../components/Frame';
import { solutionsActions } from '../store/solutions';
import { SolutionTypes } from '../types';
// import RowContext from "@/store/row-context";
// import SolutionsContext from '../store/solutions-context';

const Container = () => {
    const dispatch = useDispatch();

    // Move these higher up to root:
    // const solutionsCtx = useContext(SolutionsContext);
    // useMemo(() => {
    //     solutionsCtx.findSolutions(puzzleBirds);
    // }, []);
    const solutionsFramelessCtx = useContext(FramelessSolutionsContext);
    useEffect(() => {
        const solutions = solutionsFramelessCtx.findSolutions(puzzleBirds);
        dispatch(solutionsActions.storeSolutions({
            type: SolutionTypes.frameless,
            solutions
        }));
    }, []);


    /*
    const rowContext = useContext(RowContext);
    const loadSolutionHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
        event.preventDefault();
        const value = +event.target.value | 0;
        if (value === -1) {
            rowContext.loadNewSolution();
        }
        else {
            rowContext.loadNewSolution(solutionsFramelessCtx.solutions[value]);
        }
    };

    const rows = generateHorizontalRows();
    const rows = rowContext.rows;
    const elementRows: { [key: string]: ReactNode} = {};

    for (let i = 1; i <= 4; i++) {
        elementRows[`row${i}`] = [];
        // @ts-ignore
        rows[`row${i}`].forEach((piece, j) => {
            // @ts-ignore
            elementRows[`row${i}`].push(
                <Triangle key={j} odd={ j % 2 !== 0 } piece={piece} />
            );
        });
    }
    */


    return (
        <div className={classes.container}>
            <Board />
            <Frame />
            <Controls />
        </div>
    );
};

export default Container;