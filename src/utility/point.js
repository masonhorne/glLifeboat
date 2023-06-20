'use strict';

/**
 * This class represents a point in coordinate space
 */
export class Point {

    /**
     * Constructs a point object with the provided coordinates
     * @param {number} x x coordinate position
     * @param {number} y y coordinate position
     * @param {number} [z] z coordinate position
     */
    constructor(x, y, z = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
}
