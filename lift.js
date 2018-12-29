class Lift extends Block {
    constructor(x, y, w, h, xvel, yvel, xrange, yrange, xstate, ystate) {
        super(x, y, w, h, xstate, ystate, false);

        this.xorgpos = x;
        this.yorgpos = y;

        this.xvel = xvel;
        this.yvel = yvel;

        this.xrange = xrange;
        this.yrange = yrange;

        this.type = BLOCK_TYPE.LIFT;
    }

    lateUpdate() {
        if (this.xstate == BLOCK_STATE.DYNAMIC) {
            if (this.x < this.xrange[0]) {
                this.x = this.xrange[0];
                this.vx *= -1;
                if (player.y + player.h == this.y && player.onground) player.x += this.vx * 3;
            }
            if (this.x + this.w > this.xrange[1]) {
                this.x = this.xrange[1] - this.w;
                this.vx *= -1;
                if (player.y + player.h == this.y && player.onground) player.x += this.vx * 3;
            }
        }

        if (this.ystate == BLOCK_STATE.DYNAMIC) {
            if (this.y < this.yrange[0]) {
                if (player.y + player.h == this.y && player.onground) player.y = this.yrange[0] - player.h;
                this.y = this.yrange[0];
                this.vy *= -1;
            }
            if (this.y + this.h > this.yrange[1]) {
                if (player.y + player.h == this.y && player.onground) player.y = this.yrange[1] - this.h - player.h;
                this.y = this.yrange[1] - this.h;
                this.vy *= -1;
            }
        }
    }
}
