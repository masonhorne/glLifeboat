'use strict';

export class Color {
    constructor(red, green, blue, alpha = 1) {
        this.r = red;
        this.g = green;
        this.b = blue;
        this.a = alpha;
    }
}

export class Red extends Color {
    constructor() {
        super(256, 0, 0);
    }
}

export class Green extends Color {
    constructor() {
        super(0, 256, 0);
    }
}

export class Blue extends Color {
    constructor() {
        super(0, 0, 256);
    }
}
