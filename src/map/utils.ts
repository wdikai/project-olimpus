import { Color } from "../graphics/color";
import { createArray } from "../math/utils";
import { Matrix } from "../math/matrix";
import { TileTypes } from "./tiles/tile";

const colors = {
    [TileTypes.darkWater]: new Color(0, 0, 155),
    [TileTypes.water]: new Color(0, 0, 255),
    [TileTypes.lightWater]: new Color(50, 50, 255),
    [TileTypes.sand]: new Color(255, 250, 0),
    [TileTypes.ground]: new Color(90, 50, 0),
    [TileTypes.stone]: new Color(120, 120, 120)
};

function getTileType(value?: number): TileTypes | null {
    if(value === undefined) return null;

    if(value < 128) return TileTypes.darkWater;
    // if(value < 75) 
    return TileTypes.water;
    // if(value < 95) return TileTypes.lightWater;
    // if(value < 105) return TileTypes.sand;
    // if(value < 195) return TileTypes.ground;
    // if(value < 215) return TileTypes.darkStone;
    
    // return TileTypes.darkStone;
}

export function noiseToMap(noise: Matrix<number>): Matrix<number> {
    return noise.map((item: number) => getTileType(item));
}