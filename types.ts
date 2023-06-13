export interface Puzzle {
    frame: FramePiece[];
    pieces: Piece[];
};

export interface Piece {
    id: number,
    edge1: Edge,
    edge2: Edge,
    edge3: Edge,
}

interface FramePiece {
    edge1: Edge;
    edge2?: Edge;
    edge3?: Edge;
}

type Half = 'top' | 'bottom';
export interface Edge {
    type: string,
    half: Half
};

interface TrackingArrayPiece {
    id: number;
    firstEdge?: number;
}
export interface TrackingArray extends Array<TrackingArrayPiece> {};

export enum SolutionTypes {
    default = 'Default',
    framed = 'Framed',
    frameless = 'Frameless'
}