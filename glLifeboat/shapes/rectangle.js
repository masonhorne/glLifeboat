'use strict';
import { Shape } from "./shape.js";

export class Rectangle extends Shape{
    constructor (topLeft, width, height, color = undefined) {
        super();
        this.point = topLeft;
        this.w = width;
        this.h = height;
        this.color = color;
    }

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
            return true;
        }
    }
}
