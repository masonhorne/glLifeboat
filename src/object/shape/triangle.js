'use strict';
import { Shape } from "./shape.js";
import { Black } from "../model/color.js";

/**
 * This class contains a triangle
 */
export class Triangle extends Shape {

    /**
     * Constructs a triangle object
     * 
     * @param {Point} pointOne one of the triangles vertices
     * @param {Point} pointTwo one of the triangles vertices
     * @param {Point} pointThree one of the triangles vertices
     * @param {Color} [color] color to draw the triangle
     */
    constructor(pointOne, pointTwo, pointThree, color = undefined) {
        super();
        this.minX = Math.min(pointOne.x, Math.min(pointTwo.x, pointThree.x));
        this.minY = Math.min(pointOne.y, Math.min(pointTwo.y, pointThree.y));
        this.p1 = pointOne;
        this.p2 = pointTwo;
        this.p3 = pointThree;
        this.color = color ?? new Black();
    }

    /**
     * Render the triangle to the canvas of the provided context
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
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
                this.p1.x - this.minX, this.p1.y - this.minY, 0,
                this.p2.x - this.minX, this.p2.y - this.minY, 0,
                this.p3.x - this.minX, this.p3.y - this.minY, 0,
                this.p1.x - this.minX, this.p1.y - this.minY, 0,
                this.p3.x - this.minX, this.p3.y - this.minY, 0,
                this.p2.x - this.minX, this.p2.y - this.minY, 0,
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
            ]), gl.STATIC_DRAW);
            // Process the provided values
            this.processPositionBuffer(gl);
            this.processColorBuffer(gl);
            // Draw the shape to the screen
            gl.drawArrays(gl.TRIANGLES, 0, 6);
        }
    }
}