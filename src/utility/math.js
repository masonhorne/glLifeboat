'use strict';
import { throwMatrixMultiplyError } from "./logging.js";

/**
 * Return a random number between [0, max]
 * @param {number} max maximum value to generate
 * @returns a random number between 0 and max inclusive
 */
export function randomInt(max) {
    return Math.floor(Math.random() * max);
}

/**
 * Converts a degree to its radian value 
 * @param {number} angleInDegree degree from +X axis counterclockwise
 * @returns radian value for the degree
 */
export function degreeToRadian(angleInDegree) {
    return angleInDegree * Math.PI / 180;
}

/**
 * Multiply two square matrices and return their resulting matrix
 * @param {Array} matrixA first matrix to multiply
 * @param {Array} matrixB second matrix to multiply
 * @returns the resulting matrix
 */
export function multiply(matrixA, matrixB){
    if(matrixA.length != matrixB.length || Math.sqrt(matrixA.length) % 1 !== 0) {
        throwMatrixMultiplyError();
    }
    const n = Math.sqrt(matrixA.length);
    const result = [];
    matrixA.forEach((v, i) => {
        const r = Math.floor(i / n);
        const c = i % n;
        let a = 0;
        for(let j = 0; j < n; j++){
            a += matrixA[r * n + j] * matrixB[j * n + c];
        }
        result.push(a);
    });
    return result;
}

/**
 * Get an identity matrix
 * @returns an identity matrix
 */
export function identity() {
    return [
        1, 0, 0,
        0, 1, 0,
        0, 0, 1,
    ];
}

/**
 * Get a 2d rotation matrix for the given angle
 * @param {number} angleInRadian angle in radian to rotate by
 * @returns matrix containing the rotation
 */
export function rotation(angleInRadian) {
    const sin = Math.sin(angleInRadian);
    const cos = Math.cos(angleInRadian);
    return [
        cos, -sin, 0,
        sin, cos, 0,
        0, 0, 0,
    ]
}

/**
 * Get a 2d translation matrix for the given angle
 * @param {number} translateX units to translate X by
 * @param {number} translateY units to translate Y by
 * @returns matrix containing the translation
 */
export function translation(translateX, translateY) {
    return [
        1, 0, 0,
        0, 1, 0,
        translateX, translateY, 1,
    ]
}

/**
 * Get a 2d scaling matrix for the given angle
 * @param {number} scaleX units to scale X by
 * @param {number} scaleY units to scale Y by
 * @returns matrix containing the scaling
 */
export function scale(scaleX, scaleY) {
    return [
        scaleX, 0, 0,
        0, scaleY, 0,
        0, 0, 1,
    ]
}

/**
 * Get a projection matrix for converting pixel coordinates to clipspace
 * @param {number} width width of the canvas
 * @param {height} height height of the canvas
 * @returns a matrix for converting pixel coordinates into clipspace
 */
export function projection(width, height) {
    return [
        2 / width, 0, 0,
        0, -2 / height, 0,
        -1, 1, 1,
    ];
}