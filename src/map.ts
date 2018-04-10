import { State } from "./state";
import { Matrix } from "./math/matrix";
import { Color } from "./graphics/color";
import { Graphics } from "./graphics/graphics";
import { Tile, TileTypes } from "./map/tiles/tile";
import { Point2D } from "./math/point";
import { createArray } from "./math/utils";
import { DarkWater } from "./map/tiles/darkWater";

const TILE_SIZE = 16;

const TileFactory = (map) => (type: number, x: number, y: number) => {
    const position = new Point2D(
        x,
        y
    );

    if(type === TileTypes.darkWater) {
        const tile = new DarkWater(position, map);
        console.log(tile);
        return tile;
    }

    return  new Tile(position, type, map);
}; 

export class Map2D implements State {
    private map: Matrix<number>;
    private tileMap: Matrix<Tile>;

    constructor(map: Matrix<number>) {
        this.map = map;
        this.tileMap = map.map(TileFactory(map));
    }

    update(deltaTime: number): void {}

    draw(graphics: Graphics): void {
        this.tileMap.forEach(tile => tile.draw(graphics));
    }
    
}