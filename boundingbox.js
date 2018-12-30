class BoundingBox {
    constructor(x, y, w, h, left = true, right = true, top = true, bottom = true) {
        this.x = x;
        this.y = y;

        this.w = w;
        this.h = h;

        this.vertices = {
            topLeft: [this.x, this.y],
            topRight: [this.x + this.w, this.y],
            bottomLeft: [this.x, this.y + this.h],
            bottomRight: [this.x + this.w, this.y + this.h]
        };

        this.collisionSides = {
            left: left,
            right: right,
            top: top,
            bottom: bottom
        };
    }

    debug() {
        ctx.textAlign = `center`;
        ctx.fillStyle = `rgba(0, 0, 0, 1)`;
        ctx.font = `11px Arial`
        ctx.fillText(`${ this.x }; ${ this.y }`, this.x, this.y - 5);
        ctx.fillText(`${ this.x + this.w }; ${ this.y }`, this.x + this.w, this.y - 5);
        ctx.fillText(`${ this.x }; ${ this.y + this.h }`, this.x, this.y + this.h + 15);
        ctx.fillText(`${ this.x + this.w }; ${ this.y + this.h }`, this.x + this.w, this.y + this.h + 15);
    }

    updateVertices() {
        this.vertices = {
            topLeft: [this.x, this.y],
            topRight: [this.x + this.w, this.y],
            bottomLeft: [this.x, this.y + this.h],
            bottomRight: [this.x + this.w, this.y + this.h]
        };
    }
}
