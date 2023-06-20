'use strict';

/**
 * This class contains a color
 */
export class Color {
    /**
     * Constructs a color to render with the given RGBA values
     * @param {number} red red value between 0-256
     * @param {number} green green value between 0-256
     * @param {number} blue blue value between 0-256
     * @param {number} alpha alpha value between 0-256
     */
    constructor(red, green, blue, alpha = 1) {
        this.r = red;
        this.g = green;
        this.b = blue;
        this.a = alpha;
    }
}

/**
 * This class contains the color red
 */
export class Red extends Color {
    /**
     * Constructs a red color object
     */
    constructor() {
        super(256, 0, 0);
    }
}

/**
 * This class contains the color green
 */
export class Green extends Color {
    /**
     * Constructs a green color object
     */
    constructor() {
        super(0, 256, 0);
    }
}

/**
 * This class contains the color blue
 */
export class Blue extends Color {
    /**
     * Constructs a blue color object
     */
    constructor() {
        super(0, 0, 256);
    }
}
