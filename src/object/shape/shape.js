'use strict';
import { Renderable } from "../model/renderable.js";
import { throwAbstractClassError } from "../../utility/logging.js";
import { degreeToRadian } from "../../utility/math.js";
import { multiply, rotationX, rotationY, rotationZ, translation } from "../../utility/math.js";

/**
 * This is an abtract class containing shape functionality
 */
export class Shape extends Renderable {

    /** These values are the rotation of the shape in radian */
    xRotation = 0;
    yRotation = 0;
    zRotation = 0;
    /** These are the min x and y values for the shape */
    minX = undefined;
    minY = undefined;
    minZ = undefined;

    constructor() { 
        super();
        if(this.constructor.name == Shape) {
            throwAbstractClassError(this.constructor.name);
        }
    }

    /**
     * Calculates and returns the shape current rotation matrix
     */
    calculateRotation() {
        return multiply(rotationX(this.xRotation), multiply(rotationY(this.yRotation), rotationZ(this.zRotation)));
    }

    /**
     * Calculates and returns the current renderables offset matrix from origin
     */
    calculateOffset() { 
        return translation(this.minX === undefined ? 0 : this.minX,
            this.minY === undefined ? 0 : this.minY,
            this.minZ === undefined ? 0 : this.minZ
        );
    }

    /**
     * Sets the rotation value for this shape on the x axis
     * @param {number} angleInDegree degree to rotate the shape by on the x axis
     */
    setXRotation(angleInDegree) {
        this.xRotation = degreeToRadian(angleInDegree);
    }

    /**
     * Sets the rotation value for this shape on the y axis
     * @param {number} angleInDegree degree to rotate the shape by on the y axis
     */
    setYRotation(angleInDegree) {
        this.yRotation = degreeToRadian(angleInDegree);
    }

    /**
     * Sets the rotation value for this shape on the y axis
     * @param {number} angleInDegree degree to rotate the shape by on the y axis
     */
    setZRotation(angleInDegree) {
        this.zRotation = degreeToRadian(angleInDegree);
    }
}
