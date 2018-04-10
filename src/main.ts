import { Game } from "./game";
import { Graphics } from "./graphics/graphics";
import { Color } from "./graphics/color";

let renderCount = 0;
let fps = 0;
let time = Date.now();

let canvas: HTMLCanvasElement, 
    context: CanvasRenderingContext2D, 
    renderer: Function, 
    lastTime: number,
    currentTime: number, 
    deltaTime: number, 
    game: Game, 
    graphics: Graphics;

const SCALE_NUMBER = 1;
const WIDTH = 1280 / SCALE_NUMBER;
const HEIGHT = 720 / SCALE_NUMBER;

canvas = <HTMLCanvasElement> document.getElementById("canvas");
canvas.width = WIDTH;
canvas.height = HEIGHT;
context = canvas.getContext("2d");
lastTime = currentTime = Date.now();

game = new Game();
graphics = new Graphics(context, WIDTH, HEIGHT);

render(graphics);

function render(graphics: Graphics): void {
    currentTime = Date.now();
    deltaTime = currentTime - lastTime;
    lastTime = currentTime;

    graphics.clear(Color.BLACK);

    game.update(deltaTime);
    game.draw(graphics);

    
    context.fillStyle = '#000';
    context.fillRect(0, 0, 100, 20);

    context.textBaseline = "top";
    context.fillStyle = '#00ffff';
    context.fillText('FPS    :' + fps, 10, 0);
    context.fillText('DELTA:' + deltaTime, 10, 10);
 
    countFPS();

    requestAnimationFrame(() => render(graphics));
}


function countFPS() {
    renderCount++;

    if (Date.now() - time >= 1000) {
        time += 1000;
        fps = renderCount;
        renderCount = 0;
    }
}