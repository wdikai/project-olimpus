import { Graphics } from "./graphics/graphics";

export interface State {
    update(deltaTime: number): void;
    draw(graphics: Graphics): void;
}