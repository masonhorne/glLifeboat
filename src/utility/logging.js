'use strict';

export function throwAbstractClassError(className) {
    throw new Error(`${className} is an abstract class and should not be instantiated`);
}