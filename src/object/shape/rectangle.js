'use strict';
import { Shape } from "./shape.js";

/**
 * This class contains a rectangle
 */
export class Rectangle extends Shape {

    /**
     * Constructs a rectangle object
     * 
     * @param {Point} topLeft point containing the pixel coordinates of top left of the rectangle
     * @param {number} width width of the rectangle in pixels
     * @param {number} height height of the rectangle in pixels
     * @param {Color} [color] color to draw the rectangle
     */
    constructor (topLeft, width, height, color = undefined) {
        super();
        this.setTopLeft(topLeft);
        this.w = width;
        this.h = height;
        this.color = color;
    }

    /**
     * Updates the rectangles top left point along with minX and minY values
     * @param {Point} topLeft point containing the pixel coordinates of the top left of the rectangle
     */
    setTopLeft(topLeft) {
        this.point = topLeft;
        this.minX = topLeft.x;
        this.minY = topLeft.y;
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
                x1 - this.minX, y1 - this.minY, 0,
                x2 - this.minX, y1 - this.minY, 0,
                x1 - this.minX, y2 - this.minY, 0,
                x1 - this.minX, y2 - this.minY, 0,
                x2 - this.minX, y1 - this.minY, 0,
                x2 - this.minX, y2 - this.minY, 0,
            ]), gl.STATIC_DRAW);
            gl.drawArrays(gl.TRIANGLES, 0, 6);
        }
    }
}
