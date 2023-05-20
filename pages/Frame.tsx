import React, { ReactNode, use, useContext, useEffect } from "react";

import Triangle from "./Triangle";
import classes from './Frame.module.scss';
import puzzleBirds from "@/birds";
import RowContext from "@/store/row-context";
// import SolutionsContext from '../store/solutions-context';
import FramelessSolutionsContext from "@/store/frameless-solutions-context";

const Frame = () => {
    // const solutionsCtx = useContext(SolutionsContext);
    // useMemo(() => {
    //     solutionsCtx.findSolutions(puzzleBirds);
    // }, []);

    const solutionsFramelessCtx = useContext(FramelessSolutionsContext);
    useEffect(() => {
        solutionsFramelessCtx.findSolutions(puzzleBirds);
    }, []);

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

    // const rows = generateHorizontalRows();
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

    return (
        <div className={classes.frame}>

            {/* .reverse to show row4 at top */}
            {Object.values(elementRows).reverse().map(row =>
                <div className={classes.row}>
                    {row}
                </div>
            )}

            <div>
                <select onChange={loadSolutionHandler} defaultValue={-1}>
                    <option>-1</option>
                    {solutionsFramelessCtx.solutions.map((soln, index) => {
                        return <option value={index}>{index}</option>;
                    })}
                </select>
                <span> / {solutionsFramelessCtx.solutionsCount}</span>
            </div>

            <button onClick={solutionsFramelessCtx.findSolutions.bind(this, puzzleBirds)}>
                re-run solutions
            </button>
        </div>
    );
};

export default Frame;