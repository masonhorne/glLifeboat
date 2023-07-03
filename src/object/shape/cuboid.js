'use strict';
import { Shape } from "./shape.js";
import { Point } from "../model/point.js";
import { Black } from "../model/color.js";

/**
 * This class contains render settings for a cuboid
 */
export class CuboidRenderSettings {

    /**
     * Render settings for the faces of the cuboid
     * @param {Color} leftFace 
     * @param {Color} backFace 
     * @param {Color} rightFace 
     * @param {Color} topFace 
     * @param {Color} bottomFace 
     * @param {Color} frontFace 
     */
    constructor(leftFace = undefined,
        backFace = undefined,
        rightFace = undefined,
        topFace = undefined,
        bottomFace = undefined,
        frontFace = undefined
    ) {
        this.leftColor = leftFace ?? new Black();
        this.backColor = backFace ?? new Black();
        this.rightColor = rightFace ?? new Black();
        this.topColor = topFace ?? new Black();
        this.bottomColor = bottomFace ?? new Black();
        this.frontColor = frontFace ?? new Black();
    }
}

/**
 * This class contains a Cuboid
 */
export class Cuboid extends Shape {

    /**
     * Constructs a cuboid object
     * 
     * @param {Point} frontTopLeft point contain the pixel coordinates of front top left of the cuboid
     * @param {number} width width of the cuboid in pixels
     * @param {number} height height of the cuboid in pixels
     * @param {number} length length of the cuboid in pixels
     * @param {CuboidRenderSettings} [renderSettings] render settings for cuboid
     */
    constructor (frontTopLeft, width, height, length, renderSettings = undefined) {
        super();
        this.setFrontTopLeft(frontTopLeft);
        this.w = width;
        this.h = height;
        this.l = length;
        this.renderSettings = renderSettings ?? new CuboidRenderSettings();
    }

    /**
     * Updates the cuboids front top left point along with minX, minY, and minZ values
     * @param {Point} frontTopLeft point containing the pixel coordinates of the front top left of the cuboid
     */
    setFrontTopLeft(frontTopLeft) {
        this.point = frontTopLeft;
        this.minX = frontTopLeft.x;
        this.minY = frontTopLeft.y;
        this.minZ = frontTopLeft.z;
    }

    /**
     * Render the rectangle to the canvas of the provided context
     * 
     * @param {WebGLRenderingContext} gl rendering context for the canvas
     */
    render(gl) {
        if(!this.initPixelRender(gl)) {
            console.log("GL not provided for Rectangle");
        } else {
            this.setupPositionBuffer(gl);
            const x1 = this.point.x - this.minX, x2 = this.point.x + this.w - this.minX, y1 = this.point.y - this.minY, y2 = this.point.y + this.h - this.minY, z1 = this.point.z - this.minZ, z2 = this.point.z + this.l - this.minZ;
            const p1 = new Point(x1, y1, z1), p2 = new Point(x2, y1, z1), p3 = new Point(x1, y2, z1), p4 = new Point(x2, y2, z1), p5 = new Point(x1, y1, z2), p6 = new Point(x2, y1, z2), p7 = new Point(x1, y2, z2), p8 = new Point(x2, y2, z2);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
                // Back face
                ...p1.coordinate(),
                ...p4.coordinate(),
                ...p3.coordinate(),
                ...p1.coordinate(),
                ...p2.coordinate(),
                ...p4.coordinate(),
                // Left face
                ...p1.coordinate(),
                ...p7.coordinate(),
                ...p5.coordinate(),
                ...p1.coordinate(),
                ...p3.coordinate(),
                ...p7.coordinate(),
                // Right face
                ...p2.coordinate(),
                ...p6.coordinate(),
                ...p8.coordinate(),
                ...p2.coordinate(),
                ...p8.coordinate(),
                ...p4.coordinate(),
                // Top face
                ...p1.coordinate(),
                ...p5.coordinate(),
                ...p6.coordinate(),
                ...p1.coordinate(),
                ...p6.coordinate(),
                ...p2.coordinate(),
                // Bottom face
                ...p3.coordinate(),
                ...p8.coordinate(),
                ...p7.coordinate(),
                ...p3.coordinate(),
                ...p4.coordinate(),
                ...p8.coordinate(),
                // Front face
                ...p5.coordinate(),
                ...p7.coordinate(),
                ...p8.coordinate(),
                ...p5.coordinate(),
                ...p8.coordinate(),
                ...p6.coordinate(),
            ]), gl.STATIC_DRAW);
            this.setupColorBuffer(gl);
            gl.bufferData(gl.ARRAY_BUFFER, new Uint8Array([
                // Back face
                ...this.renderSettings.backColor.rgb(),
                ...this.renderSettings.backColor.rgb(),
                ...this.renderSettings.backColor.rgb(),
                ...this.renderSettings.backColor.rgb(),
                ...this.renderSettings.backColor.rgb(),
                ...this.renderSettings.backColor.rgb(),
                // Left face
                ...this.renderSettings.leftColor.rgb(),
                ...this.renderSettings.leftColor.rgb(),
                ...this.renderSettings.leftColor.rgb(),
                ...this.renderSettings.leftColor.rgb(),
                ...this.renderSettings.leftColor.rgb(),
                ...this.renderSettings.leftColor.rgb(),
                // Right face
                ...this.renderSettings.rightColor.rgb(),
                ...this.renderSettings.rightColor.rgb(),
                ...this.renderSettings.rightColor.rgb(),
                ...this.renderSettings.rightColor.rgb(),
                ...this.renderSettings.rightColor.rgb(),
                ...this.renderSettings.rightColor.rgb(),
                // Top face
                ...this.renderSettings.topColor.rgb(),
                ...this.renderSettings.topColor.rgb(),
                ...this.renderSettings.topColor.rgb(),
                ...this.renderSettings.topColor.rgb(),
                ...this.renderSettings.topColor.rgb(),
                ...this.renderSettings.topColor.rgb(),
                // Bottom face
                ...this.renderSettings.bottomColor.rgb(),
                ...this.renderSettings.bottomColor.rgb(),
                ...this.renderSettings.bottomColor.rgb(),
                ...this.renderSettings.bottomColor.rgb(),
                ...this.renderSettings.bottomColor.rgb(),
                ...this.renderSettings.bottomColor.rgb(),
                // Front face
                ...this.renderSettings.frontColor.rgb(),
                ...this.renderSettings.frontColor.rgb(),
                ...this.renderSettings.frontColor.rgb(),
                ...this.renderSettings.frontColor.rgb(),
                ...this.renderSettings.frontColor.rgb(),
                ...this.renderSettings.frontColor.rgb(),
            ]), gl.STATIC_DRAW);
            this.processPositionBuffer(gl);
            this.processColorBuffer(gl);
            gl.drawArrays(gl.TRIANGLES, 0, 36);
        }
    }
}
