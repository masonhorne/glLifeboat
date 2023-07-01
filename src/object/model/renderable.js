
'use strict';
import { throwAbstractClassError } from "../../utility/logging.js";
import { createProgram, createShader } from "../../utility/webglutils.js";
import { Color } from "./color.js";
import { multiply, projection } from "../../utility/math.js";

const vertexShaderSource = `
    // Attribute to receive data from buffer
    attribute vec4 position;
    // Uniform to receive point size from buffer
    uniform float pointSize;
    // Uniform to convert coordinate position to clipspace
    uniform mat4 projection;
    // Main function for the shader
    void main () {
        // Set position with to coordinate with z of 0 and w of 1
        gl_Position = projection * position;
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
     * Initialize a 3d shader program that reads pixel coordinates
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
        const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
        const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
        const program = createProgram(gl, vertexShader, fragmentShader);
        // Get attribute and uniform locations
        const positionAttributeLocation = gl.getAttribLocation(program, "position");
        const pointSizeAttributeLocation = gl.getUniformLocation(program, "pointSize");
        const projectionUniformLocation = gl.getUniformLocation(program, "projection");
        const colorUniformLocation = gl.getUniformLocation(program, "color");
        // Bind buffer and choose program
        const positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.useProgram(program);
        // Set up unforms and attributes
        gl.enableVertexAttribArray(positionAttributeLocation);
        const size = 3, type = gl.FLOAT, normalize = false, stride = 0, offset = 0;
        gl.vertexAttribPointer(positionAttributeLocation, size, type, normalize, stride, offset);
        // Calculate the projection matrix based on the renderables settings
        let projectionMatrix = projection(gl.canvas.clientWidth,
            gl.canvas.clientHeight,
            Math.max(gl.canvas.clientWidth, gl.canvas.clientHeight)
        );
        let offsetMatrix = this.calculateOffset();
        if(offsetMatrix.length !== 0) {
            projectionMatrix = multiply(offsetMatrix, projectionMatrix);
        }
        let rotationMatrix = this.calculateRotation();
        if(rotationMatrix.length !== 0) {
            projectionMatrix = multiply(rotationMatrix, projectionMatrix);
        }
        gl.uniformMatrix4fv(projectionUniformLocation,
            false,
            projectionMatrix
        );
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

    /**
     * Calculates and returns the current renderables rotation matrix
     */
    calculateRotation() { return []; }

    /**
     * Calculates and returns the current renderables offset matrix from origin
     */
    calculateOffset() { return []; }
}
