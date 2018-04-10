import { Tile, TileTypes } from "./tile";
import { Tileset } from "../../graphics/tileset";
import { Graphics } from "../../graphics/graphics";
import { Matrix } from "../../math/matrix";

export class DarkWater extends Tile {    
    tileSet: Tileset;
    tile: number;

    constructor(position, map: Matrix<number>) {
        super(position, TileTypes.darkWater);
        this.tileSet = new Tileset("./resources/testWater.png", 16, 16);

        let tile = 0;
        
        if(map.getValue(position.x - 1, position.y)) {
            tile &= 0b0010;
        }
        if(map.getValue(position.x + 1, position.y)) {
            tile &= 0b1000;
        }
        if(map.getValue(position.x, position.y - 1)) {
            tile &= 0b0001;
        }
        if(map.getValue(position.x, position.y + 1)) {
            tile &= 0b0100;
        }

        this.tile = tile;
    }


    draw(graphics: Graphics) {
        this.tileSet.draw(this.position.x * 16, this.position.y * 16, this.tile, 0, graphics);
    }
}