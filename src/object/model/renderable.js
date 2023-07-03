
'use strict';
import { throwAbstractClassError } from "../utility/logging.js";
import { createProgram, createShader } from "../utility/webglutils.js";
import { multiply, projection } from "../utility/math.js";

const vertexShaderSource = `
    // Attribute to receive data from buffer
    attribute vec4 position;
    // Attribute for the color
    attribute vec4 vertexColor;
    // Uniform to receive point size from buffer
    uniform float pointSize;
    // Uniform to convert coordinate position to clipspace
    uniform mat4 projection;
    // Color value to pass on to fragment shader
    varying vec4 color;
    // Main function for the shader
    void main () {
        // Set position with to coordinate with z of 0 and w of 1
        gl_Position = projection * position;
        // Set the point size provided
        gl_PointSize = pointSize;
        // Update the color value for the fragment
        color = vertexColor;
    }
`;

const fragmentShaderSource = `
    // Fragment shaders don't have precision set so default to medium
    precision mediump float;
    // Get the color for this pixel from varying
    varying vec4 color;
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
     * Initializes and binds the position buffer
     * @param {WebGLRenderingContext} gl rendering context for the canvas
     */
    setupPositionBuffer(gl){
        this.positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
    }

    /**
     * Processes the values inside of the position buffer
     * @param {WebGLRenderingContext} gl rendering context for the canvas
     */
    processPositionBuffer(gl) {
        gl.enableVertexAttribArray(this.positionAttributeLocation);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
        const size = 3, type = gl.FLOAT, normalize = false, stride = 0, offset = 0;
        gl.vertexAttribPointer(this.positionAttributeLocation, size, type, normalize, stride, offset);
    }

    /**
     * Initializes and binds the color buffer
     * @param {WebGLRenderingContext} gl rendering context for the canvas
     */
    setupColorBuffer(gl){
        this.colorBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBuffer);
    }

    /**
     * Processes the values inside of the color buffer
     * @param {WebGLRenderingContext} gl rendering context for the canvas
     */
    processColorBuffer(gl) {
        gl.enableVertexAttribArray(this.colorAttributeLocation);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBuffer);
        const size = 3, type = gl.UNSIGNED_BYTE, normalize = true, stride = 0, offset = 0;
        gl.vertexAttribPointer(this.colorAttributeLocation, size, type, normalize, stride, offset);
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
        this.program = createProgram(gl, vertexShader, fragmentShader);
        // Get attribute and uniform locations
        this.positionAttributeLocation = gl.getAttribLocation(this.program, "position");
        this.colorAttributeLocation = gl.getAttribLocation(this.program, "vertexColor");
        this.pointSizeUniformLocation = gl.getUniformLocation(this.program, "pointSize");
        const projectionUniformLocation = gl.getUniformLocation(this.program, "projection");
        // Choose program for rendering
        gl.useProgram(this.program);
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
        // Provide the projection matrix for this object to shader
        gl.uniformMatrix4fv(projectionUniformLocation,
            false,
            projectionMatrix
        );
        gl.enable(gl.CULL_FACE);
        gl.enable(gl.DEPTH_TEST);
        gl.clear(gl.DEPTH_BUFFER_BIT);
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
