import { State } from "./state";
import { Map2D } from "./map";

import { Noise } from "./math/noise";

import KeyBoard from "./input/KeyBoard";

import { Color } from "./graphics/color";
import { Graphics } from "./graphics/graphics";
import { Camera } from "./graphics/camera";
import { Entity } from "./entity";
import { Point2D } from "./math/point";
import { Animation } from "./graphics/animation";
import { Tileset } from "./graphics/tileset";
import { PathFinder } from "./math/pathFinder";
import { noiseToMap } from "./map/utils";
import { Matrix } from "./math/matrix";

const CAMERA_SPEED = 200 / 1000;
const MAP_SIZE = 32;

export class Level implements State {
    matrix: Matrix<number>;
    entity: Entity;
    map: Map2D;

    size;
    constructor() {
        const matrix = Noise.diamondSquare(MAP_SIZE, 3, 150);
        console.log(matrix)
        this.changeMap(matrix);
        this.entity = new Entity(
            new Point2D(128, 128),
            new Point2D(),
            new Animation(new Tileset("./resources/entity.png", 16, 16), 200, [0, 1])
        );
    }

    changeMap(noise: Matrix<number>){
        this.size = noise.width;
        const minValue = noise.min(i => i);
        const maxValue = noise.max(i => i) - minValue;

        this.matrix = noise.map(item => {
            let result = item - minValue;

            return result / maxValue * 255;
        });
        const map = noiseToMap(this.matrix);
        this.map = new Map2D(map);
    }

    update(deltaTime: number): void {
        if(KeyBoard.isDown(KeyBoard.LEFT_ARROW_KEY)) {
            Camera.instance.add(-CAMERA_SPEED * deltaTime, 0);
        }
        
        if(KeyBoard.isDown(KeyBoard.RIGHT_ARROW_KEY)) {
            Camera.instance.add(CAMERA_SPEED * deltaTime, 0);
        }
        
        if(KeyBoard.isDown(KeyBoard.UP_ARROW_KEY)) {
            Camera.instance.add(0, -CAMERA_SPEED * deltaTime);
        }
        
        if(KeyBoard.isDown(KeyBoard.DOWN_ARROW_KEY)) {
            Camera.instance.add(0, CAMERA_SPEED * deltaTime);
        }

        if(KeyBoard.isDown(KeyBoard.SPACE_KEY)) {
            Camera.instance.setCenter(this.size/2 * 8, this.size / 2 * 8);
        }

        // this.entity.update(deltaTime);
    }

    draw(graphics: Graphics): void {
        const position = Camera.instance.position;
        this.map.draw(graphics);
        
        // const cells = PathFinder.getCells((<any>this.map).map, this.entity.position, 5, (type) => type !== 0 && type !== null);
        // cells.forEach((cell => graphics.fillRect(cell.position.x * 16, cell.position.y * 16, 16, 16, new Color(255, 255, 0, 100))));
        // graphics.drawString("Cells:" + cells.length, 100, 100, Color.BLACK);
        this.matrix.forEach((color, x, y) => graphics.fillRect(x * 4 + position.x, y * 4 + position.y, 4, 4, new Color(color, color, color)))
        
        // this.entity.draw(graphics);
    }
}