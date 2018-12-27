class Block {
    constructor(x = 0, y = 0, w = DEFAULT_BLOCK_SIZE, h = DEFAULT_BLOCK_SIZE, xstate = BLOCK_STATE.STATIC, ystate = BLOCK_STATE.STATIC, g = true) {
        this.xvel = 0;
        this.yvel = 0;

        this.xacc = 0;
        this.yacc = 0;

        this.xstate = xstate;
        this.ystate = ystate;
        this.onground = false;

        this.bb = new BoundingBox(x, y, w, h);

        this.g = g;

        this.strokeWeight = 3;
    }

    update() {
        if (this.ystate == BLOCK_STATE.DYNAMIC && this.g) this.ay = GRAVITY;
        this.vx += this.ax;
        this.vy += this.ay;
        if (this.vy > 10) this.vy = 10;

        if (this.xstate != BLOCK_STATE.STATIC) this.x += this.vx;
        if (this.ystate != BLOCK_STATE.STATIC) this.y += this.vy;

        this.ax = 0;
        this.ay = 0;

        this.onground = false;

        if (!(this.xstate == BLOCK_STATE.STATIC && this.ystate == BLOCK_STATE.STATIC)) {
            for (let i = BLOCKS.length - 1; i > 0; i--) {
                let other = BLOCKS[i];

                if (other != this) {
                    collide(this, other);
                }
            }
        }

        this.lateUpdate();
    }

    lateUpdate() {}

    render() {
        ctx.fillStyle = `rgba(50, 50, 50, 1)`;
        ctx.fillRect(this.x, this.y, this.w, this.h);

        ctx.fillStyle = `rgba(100, 100, 100, 1)`;
        ctx.fillRect(this.x + this.strokeWeight, this.y + this.strokeWeight, this.w - this.strokeWeight * 2, this.h - this.strokeWeight * 2);

        if (debug) {
            this.bb.debug();
        }
    }

    get x() { return this.bb.x; }
    set x(nx) { this.bb.x = nx; }
    get y() { return this.bb.y; }
    set y(ny) { this.bb.y = ny; }

    get vx() { return this.xvel; }
    set vx(nvx) { this.xvel = nvx; }
    get vy() { return this.yvel; }
    set vy(nvy) { this.yvel = nvy; }

    get ax() { return this.xacc; }
    set ax(nax) { this.xacc = nax; }
    get ay() { return this.yacc; }
    set ay(nay) { this.yacc = nay; }

    get w() { return this.bb.w; }
    set w(nw) { this.bb.w = nw; }
    get h() { return this.bb.h; }
    set h(nh) { this.bb.h = nh; }
}
