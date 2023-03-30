export interface Puzzle {
    [key: string]: Row
};

export interface Row extends Array<JSX.Element> {};

// Too specific to puzzle variant ..
export type Edge = 'C' | 'E' | 'M' | 'V' | 'F' | 'H';
// for hover values
export interface EdgeNameMapping {
    C: 'California Condor';
    E: 'Bald Eagle';
    M: 'Mexican Eagle';
    V: 'Turkey Vulture';
    F: 'Peregrine Falcon';
    H: 'Red-tail Hawk';
};

export interface Piece {
    edge1: Edge,
    edge2: Edge,
    edge3: Edge,

    // pieceNumber ??
};