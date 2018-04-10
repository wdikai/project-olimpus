import { Point2D } from "./math/point";
import { State } from "./state";
import { Graphics } from "./graphics/graphics";
import { Tileset } from "./graphics/tileset";
import { Animation } from "./graphics/animation";
import KeyBoard from "./input/KeyBoard";
import { Camera } from "./graphics/camera";

const SPEED = 2;


export class Entity implements State {
    constructor(public displayPosition: Point2D, 
                public position: Point2D,
                private animation: Animation) {
                    
        // Camera.instance.setCenter(this.position.x * 16, this.position.y * 16)
    }

    update(deltaTime: number): void {
        this.animation.update(deltaTime);

        if(KeyBoard.isDown(KeyBoard.LEFT_ARROW_KEY)) {
            this.move(-SPEED * deltaTime / 100, 0);
        }
        
        if(KeyBoard.isDown(KeyBoard.RIGHT_ARROW_KEY)) {
            this.move(SPEED * deltaTime / 100, 0);
        }
        
        if(KeyBoard.isDown(KeyBoard.UP_ARROW_KEY)) {
            this.move(0, -SPEED * deltaTime / 100);
        }
        
        if(KeyBoard.isDown(KeyBoard.DOWN_ARROW_KEY)) {
            this.move(0, SPEED * deltaTime / 100);
        }
    }


    move (x, y) {
        this.position = this.position.add(x, y);
        Camera.instance.setCenter(this.position.x * 16, this.position.y * 16)
        // console.log(this.position);
        // this.displayPosition.add(x * 16, y * 16);
    }
    
    draw(graphics: Graphics): void {
        this.animation.draw(this.position.x * 16, this.position.y * 16, graphics);
    }
}