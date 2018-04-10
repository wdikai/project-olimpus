import {
    createArray
} from "./utils";
import {
    Point2D
} from "./point";

export class Matrix < T > {
    public readonly data: T[];

    public readonly width: number;
    public readonly height: number;

    constructor(width: number, height: number, value ? : T) {
        this.width = width;
        this.height = height;
        this.data = createArray(width * height, () => value);
    }

    public setValueP(position: Point2D, value: T): void {
        return this.setValue(position.x, position.y, value);
    }

    public setValue(xOffset: number, yOffset: number, value: T): void {
        if (this.include(xOffset, yOffset)) {
            const position = xOffset + yOffset * this.width;

            this.data[position] = value;
        }
    }

    public getValueP(position: Point2D): T | null {
        return this.getValue(position.x, position.y);
    }

    public getValue(xOffset: number, yOffset: number): T | null {
        if (this.include(xOffset, yOffset)) {
            const position = xOffset + yOffset * this.width;

            return this.data[position];
        }

        return null;
    }

    public map < NT > (fn: (item: T, xOffset: number, yOffset: number) => NT): Matrix < NT > {
        const newMatrix = new Matrix < NT > (this.width, this.height);
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                newMatrix.setValue(x, y, fn(this.getValue(x, y), x, y));
            }
        }

        return newMatrix;
    }

    public forEach(fn: (item: T, xOffset: number, yOffset: number) => void): void {
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                fn(this.getValue(x, y), x, y);
            }
        }
    }

    public max(fn: (item: T) => number): T {
        return this.data.reduce((min, current) => fn(current) > fn(min) ? current : min, this.data[0]);
    }

    public min(fn: (item: T) => number): T {
        return this.data.reduce((min, current) => fn(current) < fn(min) ? current : min, this.data[0]);
    }

    private include(xOffset: number, yOffset: number): boolean {
        return this.width > xOffset && this.height > yOffset && 0 <= xOffset && 0 <= yOffset;
    }

}