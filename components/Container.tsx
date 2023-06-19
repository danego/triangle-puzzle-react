import React, { useContext, useEffect } from "react";

import classes from './Container.module.scss';
import puzzleBirds from '../birds';
import FramelessSolutionsContext from "@/store/solutions/frameless-solutions-context";
import Board from './Board';
import Controls from './Controls';
import Frame from './Frame';
import { solutionsActions } from '../store/solutions';
import { useAppDispatch } from '../store/hooks';
import { SolutionTypes } from '../types';
import SolutionsContext from '../store/solutions/solutions-context';

const Container = () => {
    const dispatch = useAppDispatch();

    // Move these higher up to root:
    const solutionsCtx = useContext(SolutionsContext);
    const solutionsFramelessCtx = useContext(FramelessSolutionsContext);
    useEffect(() => {
        const solutions = solutionsCtx.findSolutions(puzzleBirds);
        dispatch(solutionsActions.storeSolutions({
            type: SolutionTypes.framed,
            solutions
        }));

        const solutionsFrameless = solutionsFramelessCtx.findSolutions(puzzleBirds);
        dispatch(solutionsActions.storeSolutions({
            type: SolutionTypes.frameless,
            solutions: solutionsFrameless
        }));
    }, []);


    return (
        <div className={classes.container}>
            <Board />
            <Frame />
            <Controls />
        </div>
    );
};

export default Container;