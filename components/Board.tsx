import { ReactNode } from "react";

import classes from './Board.module.scss';
import Spot from './Spot';

const ROWS: { [key: string]: any[] } = {
    row4: Array(1).fill({}),
    row3: Array(3).fill({}),
    row2: Array(5).fill({}),
    row1: Array(7).fill({})
};

const Board = () => {
    const spotRows: { [key: string]: ReactNode[] } = {};
    let masterIdCounter = 0;

    for (let i = 1; i <= 4; i++) {
        spotRows[`row${i}`] = [];
        ROWS[`row${i}`].forEach((piece, j) => {
            spotRows[`row${i}`].push(
                <Spot key={masterIdCounter} id={masterIdCounter} odd={j % 2 !== 0} />
            );
            masterIdCounter++;
        });
    }


    return <>
        {Object.values(spotRows).reverse().map((row, i) =>
            <div className={classes.row} key={i}>
                {row}
            </div>
        )}
    </>;
};

export default Board;