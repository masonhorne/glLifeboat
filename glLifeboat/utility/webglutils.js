'use strict';

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

export function resetForRender(gl) {
    resizeCanvasToDisplaySize(gl.canvas);
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
}

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