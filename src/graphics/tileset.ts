import { Graphics } from "./graphics";

export class Tileset {
    tileHeight: number;
    tileWidth: number;
    image: HTMLImageElement;

    constructor(url: string, tileWidth: number, tileHeight: number) {
        this.image = new Image();
        this.image.src = url;
        this.tileWidth = tileWidth;
        this.tileHeight = tileHeight;
    }

    draw(x, y, verticalClipIndex, horizontalClipIndex, graphics: Graphics, scale = 1) {
        graphics.drawImage(
            this.image, 
            x, 
            y, 
            this.tileWidth * scale, 
            this.tileHeight * scale,
            this.tileWidth * verticalClipIndex, 
            this.tileHeight * horizontalClipIndex, 
            this.tileWidth, 
            this.tileHeight
        );
    }
}