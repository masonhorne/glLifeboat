'use strict';
import { Renderable } from "./renderable.js";

/**
 * This class contains render settings for a point
 */
export class PointRenderSetting {

    /** Default point size in pixels to render the point */
    DEFAULT_POINT_SIZE = 5.0;

    /**
     * Constructs a default point render setting
     * @param {number} [pointSize] size in pixels of the point
     * @param {Color} [color] color of the point
     */
    constructor(pointSize = this.DEFAULT_POINT_SIZE, color = undefined){
        this.pointSize = pointSize;
        this.color = color;
    }
}

/**
 * This class represents a point in coordinate space
 */
export class Point extends Renderable {

    /**
     * Constructs a point object with the provided coordinates
     * @param {number} x x coordinate position
     * @param {number} y y coordinate position
     * @param {number} [z] z coordinate position
     * @param {PointRenderSetting} [renderSettings] render settings for the point
     */
    constructor(x, y, z = 0, renderSettings = undefined) {
        super();
        this.x = x;
        this.y = y;
        this.z = z;
        const settings = renderSettings ?? new PointRenderSetting();
        this.pointSize = settings.pointSize;
        this.color = settings.color;
    }

    /**
     * Render the point to the canvas of the provided context
     * 
     * @param {WebGLRenderingContext} gl rendering context for the canvas
     */
    render(gl) { 
        if(!this.initPixelRender(gl)) {
            console.log("GL not provided for Rectangle");
        } else {
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
                this.x, this.y,
            ]), gl.STATIC_DRAW);
            gl.drawArrays(gl.POINTS , 0, 1);
        }
    }
}
