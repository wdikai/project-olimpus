import { Point2D } from "../math/point";

const SCALE_NUMBER = 1;
const WIDTH = 1280 / SCALE_NUMBER;
const HEIGHT = 720 / SCALE_NUMBER;

export class Camera {
    private static _instance: Camera;
    public static get instance() {
        if (!Camera._instance) {
            Camera._instance = new Camera();
        }

        return Camera._instance;
    }

    public position: Point2D;
    
    constructor();
    constructor(position ? : Point2D) {
        this.position = position || new Point2D();
    }

    add(x: number, y: number) {
        this.position = new Point2D(
            Math.round(this.position.x + x),
            Math.round(this.position.y + y)
        );
    }

    setCenter(x, y) {
        const xOffset = x - WIDTH / 2;
        const yOffset = y - HEIGHT / 2;
        this.position = new Point2D(xOffset, yOffset);
    }
}