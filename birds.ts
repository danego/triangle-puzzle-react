import { Puzzle } from "./types";

export type EdgeType = 'C' | 'E' | 'M' | 'V' | 'F' | 'H';
// for hover values
export interface EdgeNameMapping {
    C: 'California Condor';
    E: 'Bald Eagle';
    M: 'Mexican Eagle';
    V: 'Turkey Vulture';
    F: 'Peregrine Falcon';
    H: 'Red-tail Hawk';
};

const puzzle: Puzzle = {
    frame: [
        // 9 total
        // top, right moving clockwise
        {
            edge1: {
                type: 'V',
                half: 'bottom'
            },
            // edge 2
            edge3: {
                type: 'F',
                half: 'bottom'
            },
        },
        {
            edge1: {
                type: 'F',
                half: 'top'
            }
        },
        {
            edge1: {
                type: 'C',
                half: 'top'
            }
        },
        {
            // Right Bottom corner
            edge1: {
                type: 'E',
                half: 'top'
            },
            edge2: {
                type: 'M',
                half: 'bottom'
            }
        },
        // bottom frame
        {
            edge1: {
                type: 'C',
                half: 'bottom'
            }
        },
        {
            edge1: {
                type: 'M',
                half: 'bottom'
            }
        },
        {
            // Bottom Left Corner
            edge1: {
                type: 'H',
                half: 'bottom'
            },
            edge2: {
                type: 'F',
                half: 'top'
            }
        },
        // left frame
        {
            edge1: {
                type: 'F',
                half: 'bottom'
            }
        },
        {
            edge1: {
                type: 'M',
                half: 'bottom'
            }
        },
    ],
    pieces: [
        {
            id: 0,
            edge1: {
                type: 'H',
                half: 'bottom'
            },
            edge2: {
                type: 'E',
                half: 'top'
            },
            edge3: {
                type: 'V',
                half: 'bottom'
            },
        },
        {
            id: 1,
            edge1: {
                type: 'F',
                half: 'top'
            },
            edge2: {
                type: 'V',
                half: 'top'
            },
            edge3: {
                type: 'C',
                half: 'top'
            },
        },
        {
            id: 2,
            edge1: {
                type: 'V',
                half: 'top'
            },
            edge2: {
                type: 'V',
                half: 'top'
            },
            edge3: {
                type: 'F',
                half: 'top'
            },
        },
        {
            id: 3,
            edge1: {
                type: 'M',
                half: 'top'
            },
            edge2: {
                type: 'H',
                half: 'top'
            },
            edge3: {
                type: 'F',
                half: 'bottom'
            },
        },
        {
            id: 4,
            edge1: {
                type: 'C',
                half: 'top'
            },
            edge2: {
                type: 'H',
                half: 'top'
            },
            edge3: {
                type: 'F',
                half: 'bottom'
            },
        },
        {
            id: 5,
            edge1: {
                type: 'E',
                half: 'bottom'
            },
            edge2: {
                type: 'M',
                half: 'top'
            },
            edge3: {
                type: 'M',
                half: 'top'
            },
        },
        {
            id: 6,
            edge1: {
                type: 'M',
                half: 'bottom'
            },
            edge2: {
                type: 'C',
                half: 'top'
            },
            edge3: {
                type: 'H',
                half: 'bottom'
            },
        },
        {
            id: 7,
            edge1: {
                type: 'V',
                half: 'top'
            },
            edge2: {
                type: 'C',
                half: 'bottom'
            },
            edge3: {
                type: 'F',
                half: 'top'
            },
        },
        {
            id: 8,
            edge1: {
                type: 'F',
                half: 'top'
            },
            edge2: {
                type: 'H',
                half: 'top'
            },
            edge3: {
                type: 'V',
                half: 'bottom'
            },
        },
        {
            id: 9,
            edge1: {
                type: 'C',
                half: 'bottom'
            },
            edge2: {
                type: 'V',
                half: 'bottom'
            },
            edge3: {
                type: 'F',
                half: 'bottom'
            },
        },
        {
            id: 10,
            edge1: {
                type: 'E',
                half: 'bottom'
            },
            edge2: {
                type: 'M',
                half: 'top'
            },
            edge3: {
                type: 'V',
                half: 'bottom'
            },
        },
        {
            id: 11,
            edge1: {
                type: 'F',
                half: 'bottom'
            },
            edge2: {
                type: 'H',
                half: 'bottom'
            },
            edge3: {
                type: 'E',
                half: 'top'
            },
        },
        {
            id: 12,
            edge1: {
                type: 'M',
                half: 'bottom'
            },
            edge2: {
                type: 'H',
                half: 'top'
            },
            edge3: {
                type: 'F',
                half: 'bottom'
            },
        },
        {
            id: 13,
            edge1: {
                type: 'C',
                half: 'bottom'
            },
            edge2: {
                type: 'M',
                half: 'bottom'
            },
            edge3: {
                type: 'F',
                half: 'top'
            },
        },
        {
            id: 14,
            edge1: {
                type: 'V',
                half: 'top'
            },
            edge2: {
                type: 'E',
                half: 'bottom'
            },
            edge3: {
                type: 'M',
                half: 'top'
            },
        },
        {
            id: 15,
            edge1: {
                type: 'E',
                half: 'bottom'
            },
            edge2: {
                type: 'M',
                half: 'top'
            },
            edge3: {
                type: 'E',
                half: 'top'
            },
        }
    ]
}

export default puzzle;