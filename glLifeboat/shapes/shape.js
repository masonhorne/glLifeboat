'use strict';
import { Color } from "../utility/color.js";
import { createProgram, createShader } from "../utility/webglutils.js";

const pixelVertexShaderSource = `
    // Attribute to receive data from buffer
    attribute vec2 position;
    // Screen resolution for converting to clip space
    uniform vec2 resolution;
    // Main function for the shader
    void main () {
        // Get position in range of [0,1]
        vec2 zeroToOne = position / resolution;
        // Get position in range of [0,2]
        vec2 zeroToTwo = zeroToOne * 2.0;
        // Get position in range of [-1,1]
        vec2 clipSpace = zeroToTwo - 1.0;
        // Set position with to coordinate with z of 0 and w of 1
        gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);
    }
`;

const fragmentShaderSource = `
    // Fragment shaders don't have precision set so default to medium
    precision mediump float;
    // Add a uniform color for drawing this rectangle
    uniform vec4 color;
    // Main function for the shader
    void main() {
        // gl_FragColor is the special variable a fragment shader sets
        gl_FragColor = color;
    }
`;

export class Shape {
    constructor() { }
    
    initPixelRender(gl) {
        if (gl === null) {
            console.log("Error retrieving canvas context.");
            return false;
        }
        // Create program to render
        const vertexShader = createShader(gl, gl.VERTEX_SHADER, pixelVertexShaderSource);
        const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
        const program = createProgram(gl, vertexShader, fragmentShader);
        // Get attribute and uniform locations
        const positionAttributeLocation = gl.getAttribLocation(program, "position");
        const resolutionUniformLocation = gl.getUniformLocation(program, "resolution");
        const colorUniformLocation = gl.getUniformLocation(program, "color");
        // Bind buffer and choose program
        const positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.useProgram(program);
        // Set up unforms and attributes
        gl.enableVertexAttribArray(positionAttributeLocation);
        const size = 2, type = gl.FLOAT, normalize = false, stride = 0, offset = 0;
        gl.vertexAttribPointer(positionAttributeLocation, size, type, normalize, stride, offset);
        gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height);
        // If color is provided set color otherwise use black
        if(this.color === undefined || !(this.color instanceof Color)) {
            gl.uniform4f(colorUniformLocation, 0, 0, 0, 1);
        } else {
            gl.uniform4f(colorUniformLocation,
                 this.color.r,
                 this.color.g,
                 this.color.b,
                 this.color.a,
            );
        }
        return true;
    }
}
