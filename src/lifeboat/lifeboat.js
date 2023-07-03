'use strict';
import { resetForRender } from "../object/utility/webglutils.js";
import { sleep } from "../object/utility/sleep.js";

/**
 * This class contains a lifeboat for managing canvas renders
 */
export class Lifeboat {

    /** Active elements in the lifeboat */
    activeElements = [];
    
    /** Frames per second to render in dynamic mode */
    FPS = 60;

    /**
    * @typedef {number} RenderStyle
    */

    /** 
    * Render styles available for the lifeboat
    * @enum {RenderStyle} style to render the canvas
    */
    static RENDER_STYLE = {
        STATIC: 0,
        DYNAMIC: 1,
    };

    /** 
     * Construct a lifeboat for the requested canvas
     * @param {WebGLRenderingContext} gl rendering context for the canvas
     * @param {RenderStyle} [renderStyle] style to render the canvas in
     */
    constructor(gl, renderStyle = 0) {
        this.gl = gl;
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