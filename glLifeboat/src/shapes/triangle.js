'use strict';
import { Shape } from "./shape.js";

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
        this.p1 = pointOne;
        this.p2 = pointTwo;
        this.p3 = pointThree;
        this.color = color;
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
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
                this.p1.x, this.p1.y,
                this.p2.x, this.p2.y,
                this.p3.x, this.p3.y,
            ]), gl.STATIC_DRAW);
            gl.drawArrays(gl.TRIANGLES, 0, 3);
            return true;
        }
    }
}