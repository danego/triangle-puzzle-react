import React from "react";

interface SolutionsContextType {
   allSolutions: any[];
   allSolutionsCount: number;
   findSolutions: (puzzle: any) => void;
}

const SolutionsContext = React.createContext<SolutionsContextType>({
   allSolutions: [],
   allSolutionsCount: 0,
   findSolutions: (puzzle) => {}
});

export default SolutionsContext;