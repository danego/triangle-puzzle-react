import React from "react";

const RowContext = React.createContext({
    rows: {
        row1: [],
        row2: [],
        row3: [],
        row4: [],
    },
    loadNewSolution: ([]) => {}
});

export default RowContext;