'use strict';
import { resetForRender } from "../utility/webglutils.js";
import { sleep } from "../utility/sleep.js";

/**
 * @typedef {number} RenderStyle
 */

/** 
 * Render styles available for the lifeboat
 * @enum {RenderStyle} style to render the canvas
 */
const RENDER_STYLE = {
    STATIC: 0,
    DYNAMIC: 1,
};

/**
 * This class contains a lifeboat for managing canvas renders
 */
export class Lifeboat {

    /** Active elements in the lifeboat */
    activeElements = [];
    
    /** Frames per second to render in dynamic mode */
    FPS = 60;

    /** 
     * Construct a lifeboat for the requested canvas
     * @param {string} canvasId id of the canvas to render to
     * @param {RenderStyle} [renderStyle] style to render the canvas in
     */
    constructor(canvasId, renderStyle = 0) {
        const ctx = document.getElementById(canvasId);
        this.gl = ctx.getContext("webgl");
        this.renderStyle = renderStyle;
    }

    /**
     * Adds a shape into the lifeboat context
     * @param {Shape} shape shape to add to the canvas
     */
    addShape(shape) {
        this.activeElements.push(shape);
    }

    /**
     * Starts rendering lifeboat context to the canvas
     */
    async float() {
        do {
            resetForRender(this.gl);
            this.activeElements.forEach((el) => el.render(this.gl));
            this.activeElements.forEach((el) => el.update());
            await sleep(1 / this.FPS);
        } while(this.renderStyle);
    }
}