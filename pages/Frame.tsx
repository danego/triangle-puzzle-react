import React from "react";
import Triangle from "./Triangle";
import classes from './Frame.module.scss';


// RENAME to container etc 
const frame = (props: any) => {

    // Use objects & props this time for multi-layer nesting
    const quantityArray = new Array(props.quantity).fill(''); 
    const computedTriangles = quantityArray.map((q, i) =>
        <Triangle key={i} odd={ i % 2 !== 0 } />
    );

    const computedTrianglesOdd: JSX.Element[] = [];
    const computedTrianglesEven: JSX.Element[] = [];
    computedTriangles.forEach((triangleJsx, i) => {
        if ((i + 1) % 2 !== 0) {
            computedTrianglesOdd.push(triangleJsx);
        } else {
            computedTrianglesEven.push(triangleJsx);
        }
    });
    console.log('ODD', computedTrianglesOdd);
    console.log('EVEN', computedTrianglesEven);

    // -------------------------------------------------------
    // ROW 2
    const quantityArray2 = new Array(props.quantity - 2).fill(''); 
    const computedTriangles2 = quantityArray.map((q, i) =>
        <Triangle key={i} />
    );

    const computedTrianglesOdd2: JSX.Element[] = [];
    const computedTrianglesEven2: JSX.Element[] = [];
    computedTriangles2.forEach((triangleJsx, i) => {
        if ((i + 1) % 2 !== 0) {
            computedTrianglesOdd2.push(triangleJsx);
        } else {
            computedTrianglesEven2.push(triangleJsx);
        }
    });
    console.log('ODD', computedTrianglesOdd2);
    console.log('EVEN', computedTrianglesEven2);


    // -----------------
    return (
        <div className={classes.frame}>
            <div className={classes.clipPath}></div>

            <div className={classes.row}>{computedTriangles}</div>

            {/* <div className={classes.row}>{computedTrianglesOdd2}</div>
            <div className={`${classes.row} ${classes['row-even']}`}>{computedTrianglesEven2}</div> */}
        </div>
    );
};


export default frame;