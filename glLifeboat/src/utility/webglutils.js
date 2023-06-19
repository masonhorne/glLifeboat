'use strict';

/**
 * Resizes the canvas to its display size if needed
 * @param {WebGLRenderingContext} canvas rendering context for the canvas
 * @returns true if the canvas needed to be resized and false otherwise
 */
export function resizeCanvasToDisplaySize(canvas) {
    const devicePixelRatio = window.devicePixelRatio;
    const displayWidth = Math.round(canvas.clientWidth * devicePixelRatio);
    const displayHeight = Math.round(canvas.clientHeight * devicePixelRatio);
    const needResize = canvas.width !== displayWidth || canvas.height !== displayHeight;
    if(needResize) {
        canvas.width = displayWidth;
        canvas.height = displayHeight;
    }
    return needResize;
}

/**
 * Resets the canvas to render another frame
 * @param {WebGLRenderingContext} gl rendering context for the canvas
 */
export function resetForRender(gl) {
    resizeCanvasToDisplaySize(gl.canvas);
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
}

/**
 * Creates a shader program of the given type with the provided source code
 * @param {WebGLRenderingContext} gl rendering context for canvas
 * @param {number} type enum value of shader type
 * @param {string} source shader source code
 * @returns shader object if successful otherwise undefined
 */
export function createShader(gl, type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    const result = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if(result) {
        return shader;
    } else {
        console.log(gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
    }
}

/**
 * Creates a program with the two provided shaders
 * @param {WebGLRenderingContext} gl rendering context for the canvas 
 * @param {WebGLShader} vertexShader vertex shader for the program
 * @param {WebGLShader} fragmentShader fragment shader for the program
 * @returns program object if successful otherwise undefined
 */
export function createProgram(gl, vertexShader, fragmentShader) {
    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    const result = gl.getProgramParameter(program, gl.LINK_STATUS);
    if(result) {
        return program;
    } else {
        console.log(gl.getProgramInfoLog(program));
        gl.deleteProgram(program);
    }
}