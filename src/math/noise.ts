import {
    createArray,
    randomNumber,
    median,
    range,
    sum
} from "./utils";
import {
    Matrix
} from "./matrix";
import {
    Point2D
} from "./point";

export class Noise {

    static square2D(width: number, height: number, maxDepth: number = 1, minDepth: number = 0, maxDelta = 0.1, defaultValues ? : number): Matrix < number > {
        defaultValues = defaultValues === undefined ? (maxDepth - minDepth) / 2 : defaultValues;
        const matrix = new Matrix(width, height, defaultValues);
        Noise.fractalStep(matrix, 0, 0, width, height, maxDepth, minDepth, maxDelta);

        return matrix;
    }

    private static fractalStep(map: Matrix < number > , xOffset: number, yOffset: number, width: number, height: number, maxDepth: number = 1, minDepth: number = 0, maxDelta = 0.1): void {
        const rangeFn = range(maxDepth, minDepth);

        const halfWidth = Math.ceil(width / 2);
        const halfHeight = Math.ceil(height / 2);
        const xMedianOffset = xOffset + halfWidth;
        const yMedianOffset = yOffset + halfHeight;

        if (width <= 1 && height <= 1) return;

        const rightBoarderOffset = xOffset + width - 1;
        const bottomBorderOffset = yOffset + height - 1;

        const topLeft = map.getValue(xOffset, yOffset);
        const topRight = map.getValue(rightBoarderOffset, yOffset);
        const bottomLeft = map.getValue(xOffset, bottomBorderOffset);
        const bottomRight = map.getValue(rightBoarderOffset, bottomBorderOffset);

        map.setValue(xMedianOffset, yOffset, rangeFn(median(topLeft, topRight) + randomNumber(maxDelta, -maxDelta)));
        map.setValue(xOffset, yMedianOffset, rangeFn(median(topLeft, bottomLeft) + randomNumber(maxDelta, -maxDelta)));
        map.setValue(rightBoarderOffset, yMedianOffset, rangeFn(median(topRight, bottomRight) + randomNumber(maxDelta, -maxDelta)));
        map.setValue(xMedianOffset, bottomBorderOffset, rangeFn(median(bottomLeft, bottomRight) + randomNumber(maxDelta, -maxDelta)));
        map.setValue(xMedianOffset, yMedianOffset, rangeFn(median(topLeft, bottomRight) + randomNumber(maxDelta, -maxDelta)));

        Noise.fractalStep(map, xOffset, yOffset, halfWidth, halfHeight, maxDepth, minDepth, maxDelta);
        Noise.fractalStep(map, xOffset, yMedianOffset, halfWidth, halfHeight, maxDepth, minDepth, maxDelta);
        Noise.fractalStep(map, xMedianOffset, yOffset, halfWidth, halfHeight, maxDepth, minDepth, maxDelta);
        Noise.fractalStep(map, xMedianOffset, yMedianOffset, halfWidth, halfHeight, maxDepth, minDepth, maxDelta);
    }

    static diamondSquare(size, seedRange, defaultValue) {
        const matrix: Matrix < number > = new Matrix(size, size);
        matrix.setValue(0, 0, defaultValue);
        matrix.setValue(size - 1, 0, defaultValue);
        matrix.setValue(0, size - 1, defaultValue);
        matrix.setValue(size - 1    , size - 1, defaultValue);

        for (let currentSize = size; currentSize > 1; currentSize /= 2) {
            for (let step = 0; step <= 1; step++) {
                for (let yOffset = 0; yOffset < size; yOffset += currentSize) {
                    for (let xOffset = 0; xOffset < size; xOffset += currentSize) {
                        if(step) {
                            const stepSize = currentSize / 2;
                            Noise.diamondStep(matrix, xOffset, yOffset + stepSize, stepSize, seedRange);
                            Noise.diamondStep(matrix, xOffset + currentSize, yOffset + stepSize, stepSize, seedRange);
                            Noise.diamondStep(matrix, xOffset + stepSize, yOffset, stepSize, seedRange);
                            Noise.diamondStep(matrix, xOffset + stepSize, yOffset + currentSize, stepSize, seedRange);
                        } else {
                            Noise.squareStep(matrix, xOffset, yOffset, currentSize, seedRange);
                        }
                    }
                }
            }
        }

        return matrix;

    }

    static squareStep(matrix: Matrix < number > , xOffset: number, yOffset: number, size: number, seedRange = 0.01) {
        const rightBoarderOffset = xOffset + size;
        const bottomBorderOffset = yOffset + size;

        const topLeft = matrix.getValue(xOffset, yOffset);
        const topRight = matrix.getValue(rightBoarderOffset, yOffset);
        const bottomLeft = matrix.getValue(xOffset, bottomBorderOffset);
        const bottomRight = matrix.getValue(rightBoarderOffset, bottomBorderOffset);
        
        const values = [topLeft, topRight, bottomLeft, bottomRight].filter(v => typeof v === "number");
        const medianValue = median(...values);

        const halfSize = Math.ceil(size / 2);
        const distance = Math.sqrt((size * size) * 2);
        const seed = randomNumber(-seedRange, seedRange) * distance;

        matrix.setValue(xOffset + halfSize, yOffset + halfSize, Math.round(medianValue + seed));
    }

    static diamondStep(matrix: Matrix < number > , xOffset: number, yOffset: number, size: number, seedRange = 0.01) {
        const distance = size * 2;

        const left = matrix.getValue(xOffset - size, yOffset);
        const right = matrix.getValue(xOffset + size, yOffset);
        const top = matrix.getValue(xOffset, yOffset - size);
        const bottom = matrix.getValue(xOffset, yOffset + size);
        const values = [top, left, right, bottom].filter(v => typeof v === "number");

        const medianValue = median(...values);

        const seed = randomNumber(-seedRange, seedRange) * distance;

        matrix.setValue(xOffset, yOffset, Math.round(medianValue + seed));
    }

}