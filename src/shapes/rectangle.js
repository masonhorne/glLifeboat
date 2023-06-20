'use strict';
import { Shape } from "./shape.js";

/**
 * This class contains a rectangle
 */
export class Rectangle extends Shape{

    /**
     * Constructs a rectangle object
     * 
     * @param {Point} topLeft point contain the pixel coordinates of top left of the rectangle
     * @param {number} width width of the rectangle in pixels
     * @param {number} height height of the rectangle in pixels
     * @param {Color} [color] color to draw the rectangle
     */
    constructor (topLeft, width, height, color = undefined) {
        super();
        this.point = topLeft;
        this.w = width;
        this.h = height;
        this.color = color;
    }

    /**
     * Render the rectangle to the canvas of the provided context
     * 
     * @param {WebGLRenderingContext} gl rendering context for the canvas
     */
    render(gl) {
        if(!this.initPixelRender(gl)) {
            console.log("GL not provided for Rectangle");
        } else {
            const x1 = this.point.x, x2 = this.point.x + this.w, y1 = this.point.y, y2 = this.point.y + this.h;
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
                x1, y1,
                x2, y1,
                x1, y2,
                x1, y2,
                x2, y1,
                x2, y2
            ]), gl.STATIC_DRAW);
            gl.drawArrays(gl.TRIANGLES, 0, 6);
        }
    }
}
