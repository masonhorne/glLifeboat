'use strict';

/**
 * Throws an error for the given abstract class beign initialized
 * @param {string} className name of the abstract class that was initialized
 */
export function throwAbstractClassError(className) {
    throw new Error(`${className} is an abstract class and should not be instantiated`);
}

/**
 * Throws an error for an invalid matrix multiplication attempt
 */
export function throwMatrixMultiplyError() {
    throw new Error("Invalid matrix multiplication");
}