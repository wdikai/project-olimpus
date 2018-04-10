import { Graphics } from "./graphics";
import { Tileset } from "./tileset";

export class Clip {
    verticalClipIndex: number;
    horizontalClipIndex?: number;

    constructor(verticalClipIndex: number, horizontalClipIndex: number = 0) {
        this.verticalClipIndex = verticalClipIndex;
        this.horizontalClipIndex = horizontalClipIndex;
    }
}

export class Animation {
    clips: Clip[];
    clipIndex: number = 0;
    currentTime: number = 0;

    constructor(private tileset: Tileset,
                private timeOut: number,
                clips: Array<Clip | number>) {

        this.clips = clips.map((clip: Clip | number): Clip => {
            if(clip instanceof Clip) {
                return clip;
            }

            return new Clip(clip);
        });
    }

    update(time: number): void {
        this.currentTime += time;
        if(this.currentTime > this.timeOut) {
            this.currentTime -= this.timeOut;
            this.clipIndex++;
        }

        if(this.clipIndex >= this.clips.length) {
            this.clipIndex = 0;
        }
    }

    draw(x: number, y: number, graphics: Graphics) {
        const currentClip = this.clips[this.clipIndex];
        this.tileset.draw(x, y, currentClip.verticalClipIndex, currentClip.horizontalClipIndex, graphics);
    }
}