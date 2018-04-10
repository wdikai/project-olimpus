import { Tileset } from "../../graphics/tileset";
import { Graphics } from "../../graphics/graphics";
import { Matrix } from "../../math/matrix";
import { Point2D } from "../../math/point";

const TILE_SIZE = 16;

export enum TileTypes {
    darkWater = 0,
    water = 1,
    lightWater = 2,
    sand = 3,
    ground = 4,
    darkStone = 5,
    stone = 6
}

export class Tile {
    tileSet: Tileset;

    constructor(protected position,
                protected type: TileTypes,
                map?: Matrix<number>) {
        this.tileSet = new Tileset("./resources/test.png", 16, 16);
    }



    draw(graphics: Graphics) {
        this.tileSet.draw(this.position.x * 16, this.position.y * 16, this.type, 0, graphics);
    }
}