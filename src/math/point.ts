export class Point2D {
    public readonly x: number;
    public readonly y: number;

    constructor();
    constructor(x: number, y: number);
    constructor(x ? : number, y ? : number) {
        this.x = x || 0;
        this.y = y || 0;
    }

    add(x: number, y: number) {
        return new Point2D(
            Math.round(this.x + x),
            Math.round(this.y + y)
        );
    }

    equeal(point: Point2D): boolean {
        return this.x === point.x && this.y === point.y;
    }
}