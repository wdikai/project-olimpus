import { Color } from "./color";
import { Camera } from "./camera";

export class Graphics {
    private camera: Camera;
    constructor(private graphics: CanvasRenderingContext2D, 
                private width, 
                private height) {
        this.camera = Camera.instance;
    }

    setColor(color: Color) {
        this.graphics.fillStyle = color.toString();
    }

    drawString(text: string, x: number, y: number, color?: Color)  {
        if (color) {
            this.graphics.fillStyle = color.toString();
        }

        this.graphics.textBaseline = "top";
        this.graphics.fillText(text, x - this.camera.position.x, y - this.camera.position.y);
    }

    fillRect(x: number, y: number, width: number, height: number);
    fillRect(x: number, y: number, width: number, height: number, color: Color);
    fillRect(x: number, y: number, width: number, height: number, color ? : Color) {
        if (color) {
            this.graphics.fillStyle = color.toString();
        }

        this.graphics.fillRect(x - this.camera.position.x, y - this.camera.position.y, width, height);
    }

    clear();
    clear(color: Color);
    clear(color?: Color) {
        if (color) {
            this.graphics.fillStyle = color.toString();
        }

        this.graphics.fillRect(0, 0, this.width, this.height);
    }

    drawImage(image: HTMLImageElement, x: number, y: number, width: number, height: number);
    drawImage(image: HTMLImageElement, x: number, y: number, width: number, height: number, xOffset: number, yOffset: number, clipWidth: number, clipHeight: number);
    drawImage(image: HTMLImageElement, x: number, y: number, width: number, height: number, xOffset?: number, yOffset?: number, clipWidth?: number, clipHeight?: number) {
        if(xOffset !== undefined) {
            this.graphics.drawImage(image, xOffset, yOffset, clipWidth, clipHeight, x - this.camera.position.x, y - this.camera.position.y, width, height);
        } else {
            this.graphics.drawImage(image, x - this.camera.position.x, y - this.camera.position.y, width, height);
        }
    }
}