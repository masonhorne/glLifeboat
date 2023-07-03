'use strict';

/**
 * This class contains a color
 */
export class Color {

    /**
     * Return the RGB values for the color
     * @returns an array containing RGB values for the color
     */
    rgb(){
        return [
            this.r, this.g, this.b,
        ];
    }

    /**
     * Constructs a color to render with the given RGBA values
     * @param {number} red red value between 0-255
     * @param {number} green green value between 0-255
     * @param {number} blue blue value between 0-255
     * @param {number} alpha alpha value between 0-255
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
        super(255, 0, 0);
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
        super(0, 255, 0);
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
        super(0, 0, 255);
    }
}

/**
 * This class contains the color yellow
 */
export class Yellow extends Color {
    /**
     * Constructs a yellow color object
     */
    constructor() {
        super(255, 255, 0);
    }
}

/**
 * This class contains the color brown
 */
export class Brown extends Color {
    /**
     * Constructs a brown color object
     */
    constructor() {
        super(150, 75, 0);
    }
}

/**
 * This class contains the color purple
 */
export class Purple extends Color {
    /**
     * Constructs a purple color object
     */
    constructor() {
        super(160, 32, 240);
    }
}

/**
 * This class contains the color grey
 */
export class Grey extends Color {
    /**
     * Constructs a grey color object
     */
    constructor() {
        super(128, 128, 128);
    }
}

/**
 * This class contains the color pink
 */
export class Pink extends Color {
    /**
     * Constructs a pink color object
     */
    constructor() {
        super(255, 192, 203);
    }
}

/**
 * This class contains the color burgandy
 */
export class Burgandy extends Color {
    /**
     * Constructs a burdgandy color object
     */
    constructor() {
        super(128, 0, 32);
    }
}

/**
 * This class contains the color violet
 */
export class Violet extends Color {
    /**
     * Constructs a violet color object
     */
    constructor() {
        super(143, 0, 255);
    }
}

/**
 * This class contains the color magenta
 */
export class Magenta extends Color {
    /**
     * Constructs a magenta color object
     */
    constructor() {
        super(255, 0, 255);
    }
}

/**
 * This class contains the color teal
 */
export class Teal extends Color {
    /**
     * Constructs a teal color object
     */
    constructor() {
        super(0, 128, 128);
    }
}

/**
 * This
 */

/**
 * This class contains the color black
 */
export class Black extends Color {
    /**
     * Constructs a black color object
     */
    constructor() {
        super(0, 0, 0);
    }
}

/**
 * This class contains the color white
 */
export class White extends Color {
    /**
     * Constructs a white color object
     */
    constructor() {
        super(255, 255, 255);
    }
}