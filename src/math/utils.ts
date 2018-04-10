export function createArray < T > (length: number, map ? : () => T): T[] {
    return Array.from({
        length
    }, map);
}

export function randomInt(max: number, min: number = 0): number {
    return Math.round(randomNumber(max, min));
}

export function randomNumber(max: number, min: number = 0): number {
    return Math.random() * (max - min) + min;
}

export function sum(...args: number[]): number {
    return args.reduce((sum, value) => {
        sum += value;
        return sum;
    }, 0);
}

export function median(...args: number[]): number {
    return sum(...args) / args.length;
}

export function range(max: number, min: number = 0): (number) => number {
    return value => {
        if (value > max) {
            value = max;
        } else if (value < min) {
            value = min;
        }

        return value;
    }
}