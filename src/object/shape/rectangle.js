'use strict';
import { Shape } from "./shape.js";
import { Black } from "../model/color.js";

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
        this.color = color ?? new Black();
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
            // Setup position buffer
            this.setupPositionBuffer(gl);
            // Calculate position vertices
            const x1 = this.point.x - this.minX, x2 = this.point.x + this.w - this.minX, y1 = this.point.y - this.minY, y2 = this.point.y + this.h - this.minY;
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
                x1, y1, 0,
                x2, y1, 0,
                x1, y2, 0,
                x1, y2, 0,
                x2, y1, 0,
                x2, y2, 0,
                x1, y1, 0,
                x1, y2, 0,
                x2, y1, 0,
                x1, y2, 0,
                x2, y2, 0,
                x2, y1, 0,
            ]), gl.STATIC_DRAW);
            // Setup color buffer
            this.setupColorBuffer(gl);
            // Calculate the color values for the vertices
            gl.bufferData(gl.ARRAY_BUFFER, new Uint8Array([
                ...this.color.rgb(),
                ...this.color.rgb(),
                ...this.color.rgb(),
                ...this.color.rgb(),
                ...this.color.rgb(),
                ...this.color.rgb(),
                ...this.color.rgb(),
                ...this.color.rgb(),
                ...this.color.rgb(),
                ...this.color.rgb(),
                ...this.color.rgb(),
                ...this.color.rgb(),
            ]), gl.STATIC_DRAW);
            // Process the provided values
            this.processPositionBuffer(gl);
            this.processColorBuffer(gl);
            // Draw the shape to the screen
            gl.drawArrays(gl.TRIANGLES, 0, 12);
        }
    }
}
