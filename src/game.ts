import { State } from "./state";
import { Level } from "./level";
import { Graphics } from "./graphics/graphics";
import { Tileset } from "./graphics/tileset";
import { Noise } from "./math/noise";

export class Game implements State{
    private level: Level;

    constructor() {
        this.level = new Level();
        let seedRange = 3;

        const seedElement = <HTMLInputElement>document.getElementById("seed");
        const refreshElement = <HTMLButtonElement>document.getElementById("refresh");
        refreshElement.addEventListener("click", event => {  
            const matrix = Noise.diamondSquare(64, seedRange, 0);
            this.level.changeMap(matrix);
        } )
        seedElement.addEventListener("change", event => {
            seedRange = +(<HTMLInputElement>event.target).value;    
            const matrix = Noise.diamondSquare(64, seedRange, 0);
            this.level.changeMap(matrix);
        })
    }

    update(deltaTime: number): void {
        this.level.update(deltaTime);
    }

    draw(graphics: Graphics):void {
        this.level.draw(graphics);
    }
}