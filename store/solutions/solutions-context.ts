import React from "react";

import { TrackingArray } from '../../types';

interface SolutionsContextType {
   allSolutions: any[];
   allSolutionsCount: number;
   findSolutions: (puzzle: any) => TrackingArray[];
}

const SolutionsContext = React.createContext<SolutionsContextType>({
   allSolutions: [],
   allSolutionsCount: 0,
   findSolutions: (puzzle) => []
});

export default SolutionsContext;