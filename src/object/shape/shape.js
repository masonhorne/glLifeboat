'use strict';
import { Renderable } from "../model/renderable.js";
import { throwAbstractClassError } from "../../utility/logging.js";

/**
 * This is an abtract class containing shape functionality
 */
export class Shape extends Renderable {
    constructor() { 
        super();
        if(this.constructor.name == Shape) {
            throwAbstractClassError(this.constructor.name);
        }
    }
}
