const puzzle = {
    // should the frame use same piece interface? Will the complication benefit later?
    frame: [
        // top, right moving clockwise
        {
            edge: 'V',
            half: 'bottom'
        },
        {
            edge: 'F',
            half: 'top'
        },
        {
            edge: 'C',
            half: 'top'
        },
        {
            edge: 'E',
            half: 'top'
        },
        // bottom frame
        {
            edge: 'M',
            half: 'bottom'
        },
        {
            edge: 'C',
            half: 'bottom'
        },
        {
            edge: 'M',
            half: 'bottom'
        },
        {
            edge: 'H',
            half: 'bottom'
        },
        // left frame
        {
            edge: 'F',
            half: 'top'
        },
        {
            edge: 'F',
            half: 'bottom'
        },
        {
            edge: 'M',
            half: 'bottom'
        },
        {
            edge: 'F',
            half: 'bottom'
        }
    ],
    pieces: [
        {
            id: 0,
            edge1: {
                type: 'H', // or kind, bird, variety ...
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