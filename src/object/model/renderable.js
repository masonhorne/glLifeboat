
'use strict';
import { throwAbstractClassError } from "../../utility/logging.js";
import { createProgram, createShader } from "../../utility/webglutils.js";
import { Color } from "./color.js";

const pixelVertexShaderSource = `
    // Attribute to receive data from buffer
    attribute vec2 position;
    // Uniform to receive point size from buffer
    uniform float pointSize;
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
        gl_PointSize = pointSize;
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

/**
 * This is an abstract class for objects that can be rendered on the canvas
 */
export class Renderable {

    /**
     * Renderable is an abstract class and should not be instantiated
     */
    constructor() {
        if(this.constructor.name == Renderable) {
            throwAbstractClassError(this.constructor.name);
        }
    }

    /**
     * Render the object to the canvas of the provided context
     * 
     * @param {WebGLRenderingContext} gl rendering context for the canvas
     */
    render(gl) {
        throwAbstractClassError(this.constructor.name);
    }

    /**
     * Initialize a 2d shader program that reads pixel coordinates
     * 
     * @param {WebGLRenderingContext} gl rendering context for the canvas
     * @returns true if initialization is successful and false otherwise
     */
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
        const pointSizeAttributeLocation = gl.getUniformLocation(program, "pointSize");
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
        // If point size is provided set point size
        if(this.pointSize !== undefined) {
            gl.uniform1f(pointSizeAttributeLocation, this.pointSize);
        }
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

    /**
     * Extend a renderable object and override this function to provide update behavior to the object
     */
    update() {}
}