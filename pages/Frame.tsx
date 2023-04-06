import React, { useEffect } from "react";

import Triangle from "./Triangle";
import classes from './Frame.module.scss';
import { Puzzle } from "@/types";
import generateSolutions from "@/SolutionsGeneratorService";
import puzzleBirds from "@/birds";

interface FrameProps {
    quantity: number;
};

// RENAME to container etc 
const frame = (props: FrameProps) => {

    useEffect(() => {
        console.log('HIIHI');
        generateSolutions(puzzleBirds);
    }, []);

    const puzzle: Puzzle = { };

    // reconfig this to not run every render ...
    // frame will be "0"
    let rowCount = 1;  
    for (let i = props.quantity; i > 0; i -= 2) {
        const quantityArray = new Array(i).fill(''); 
        const computedTriangles = quantityArray.map((q, j) =>
            <Triangle key={j} odd={ j % 2 !== 0 } />
        );

        puzzle[`row${rowCount}`] = computedTriangles;
        rowCount++;
    }

    return (
        <div className={classes.frame}>

            {Object.values(puzzle).reverse().map(row => 
                <div className={classes.row}>
                    {row}
                </div>
            )}
            
            
            {/* <div className={classes.clipPath}></div> */}
        </div>
    );
};


export default frame;