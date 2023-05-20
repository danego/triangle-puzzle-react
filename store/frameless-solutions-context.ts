import React from 'react';

interface FramelessSolutionsContextType {
    solutions: any[];
    solutionsCount: number;
    findSolutions: (puzzle: any) => void;
}

const FramelessSolutionsContext = React.createContext<FramelessSolutionsContextType>({
    solutions: [],
    solutionsCount: 0,
    findSolutions: (puzzle) => {}
});

export default FramelessSolutionsContext;