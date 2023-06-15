'use strict';
import { Shape } from "./shape.js";

export class Triangle extends Shape {
    constructor(pointOne, pointTwo, pointThree, color) {
        super();
        this.p1 = pointOne;
        this.p2 = pointTwo;
        this.p3 = pointThree;
        this.color = color;
    }

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