import React, { useContext, useEffect } from "react";

import classes from './Container.module.scss';
import puzzleBirds from '../birds';
import FramelessSolutionsContext from '../store/solutions/frameless-solutions-context';
import Board from './Board';
import Frame from './Frame';
import { solutionsActions } from '../store/solutions';
import { useAppDispatch } from '../store/hooks';
import { SolutionTypes } from '../types';
import SolutionsContext from '../store/solutions/solutions-context';
import { changeSize, sizingActions } from '../store/sizing';

const DEBOUNCE_TIME = 500;

const Container = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        function handleResize() {
            dispatch(sizingActions.changeSize(window.innerWidth));
            dispatch(changeSize());
        }
        handleResize();

        let timer: ReturnType<typeof setTimeout>;
        window.addEventListener('resize', () => {
            clearTimeout(timer);
            timer = setTimeout(() => {
                handleResize();
            }, DEBOUNCE_TIME);
        });

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [dispatch]);

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
        </div>
    );
};

export default Container;