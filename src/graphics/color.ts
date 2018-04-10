import { range } from "math/utils";

const MAX_COLOR_VALUE = 255;

const colorRange = range(MAX_COLOR_VALUE);

export class Color {
    public static readonly MAX_COLOR_VALUE = MAX_COLOR_VALUE;
    public static WHITE = new Color(255, 255, 255);
    public static BLACK = new Color(0, 0, 0);

    private alpha: number;
    private red: number;
    private green: number;
    private blue: number;

    constructor(r: number, g: number, b: number, a: number = MAX_COLOR_VALUE) {
        this.red = colorRange(r);
        this.green = colorRange(g);
        this.blue = colorRange(b);
        this.alpha = colorRange(a);
    }

    add(color: Color): Color {
        return new Color(
            this.red * this.alpha / MAX_COLOR_VALUE + color.red * color.alpha / MAX_COLOR_VALUE,
            this.green * this.alpha / MAX_COLOR_VALUE + color.green * color.alpha / MAX_COLOR_VALUE,
            this.blue * this.alpha / MAX_COLOR_VALUE + color.blue * color.alpha / MAX_COLOR_VALUE,
        );
    }

    toString(): string {
        return this.valueOf();
    }

    valueOf(): string {
        return `rgba(${Math.round(this.red)}, ${Math.round(this.green)}, ${Math.round(this.blue)}, ${Math.round(this.alpha)})`;
    }
}