import React from 'react';

import { TrackingArray } from '@/types';

interface FramelessSolutionsContextType {
    solutions: any[];
    solutionsCount: number;
    findSolutions: (puzzle: any) => TrackingArray[];
}

const FramelessSolutionsContext = React.createContext<FramelessSolutionsContextType>({
    solutions: [],
    solutionsCount: 0,
    findSolutions: (puzzle) => []
});

export default FramelessSolutionsContext;