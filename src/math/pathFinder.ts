import { Matrix } from "./matrix";
import { Point2D } from "./point";
import { createArray } from "./utils";

const MOVE_DIRECTIONS = [
    new Point2D(1, 0),
    new Point2D(-1, 0),
    new Point2D(0, 1),
    new Point2D(0, -1),
];

type Predicate = (type: number) => boolean;

export class Cell {
    constructor(public position: Point2D,
                public distance: number) {}

    equeal(cell: Cell): boolean {
        return this.position.equeal(cell.position);
    }
}

export class PathFinder {
    static getCells(map: Matrix<number>, position: Point2D, depth: number, canMove: Predicate) {
        const results = [], 
              buffer = [], 
              matrix = new Matrix(map.width, map.height);
        let distance = 0;

        if(map.getValue(position.x, position.y) === null) {
            debugger;
        }

        if(map.getValue(position.x, position.y) === null) {
            throw new Error(`Position (${[position.x, position.y]}) out of map`);
        }

        buffer.push(new Cell(position, distance))

        while (buffer.length) {
            const cell = buffer.shift();
            matrix.setValue(cell.position.x, cell.position.y, cell.distance);
            for (let shift of MOVE_DIRECTIONS) {
                const nextCell = new Cell(cell.position.add(shift.x, shift.y), cell.distance + 1);
                const type = map.getValue(nextCell.position.x, nextCell.position.y);
                const isEnter = matrix.getValue(nextCell.position.x, nextCell.position.y) === undefined;

                if(nextCell.distance <= depth && canMove(type) && isEnter) {
                    buffer.push(nextCell);
                }
            }

            results.push(cell);
        }

        return results;
    }
}