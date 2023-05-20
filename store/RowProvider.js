import { useState } from "react";

import { generateRows } from "@/RowLoaderService";
import RowContext from './row-context';

const RowProvider = (props) => {
    // const [rowsState, setRows] = useState(generateHorizontalRows);
    const [rowsState, setRows] = useState(generateRows);

    // const defaultRows = useMemo(() => {
    //     return generateHorizontalRows();
    // }, []);

    const loadNewSolutionHandler = (solution) => {
    //   setRows(generateHorizontalRows(solution));
        if (!solution) {
            const trackingArray = [
                { id: 0 },
                { id: 1 },
                { id: 2 },
                { id: 3 },
                { id: 4 },
                { id: 5 },
                { id: 6 },
                { id: 7 },
                { id: 8 },
                { id: 9 },
                { id: 10 },
                { id: 11 },
                { id: 12 },
                { id: 13 },
                { id: 14 },
                { id: 15 }
            ];
            setRows(generateRows(trackingArray));
        }
        else {
            setRows(generateRows(solution));
        }
    };

    const rowContext = {
        rows: rowsState,
        loadNewSolution: loadNewSolutionHandler
    };

    return <RowContext.Provider value={rowContext}>
        {props.children}
    </RowContext.Provider>
};

export default RowProvider;