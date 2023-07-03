import { Cuboid, CuboidRenderSettings } from "./cuboid.js";

/**
 * This class contains a cube
 */
export class Cube extends Cuboid {

    /**
     * Constructs a cube object
     * 
     * @param {Point} frontTopLeft point contain the pixel coordinates of front top left of the cube
     * @param {number} length length of the cube sides in pixels
     * @param {CuboidRenderSettings} [renderSettings] render settings for the cube
     */
    constructor(frontTopLeft, length, renderSettings = undefined) {
        super(frontTopLeft, length, length, length, renderSettings);
    }
}