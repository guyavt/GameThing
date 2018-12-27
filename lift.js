class Lift extends Block {
    constructor(x, y, w, h, xvel = -1, yvel = 0, xstate = BLOCK_STATE.DYNAMIC, ystate = BLOCK_STATE.STATIC) {
        super(x, y, w, h, xstate, ystate);

        this.xvel = xvel;
        this.yvel = yvel;

        this.xorgvel = this.xvel;
        this.yorgvel = this.yvel;
    }

    lateUpdate() {
        if (this.vx == 0)
            this.vx = this.xorgvel * -1;

        if (this.vy == 0)
            this.vy = this.yorgvel * -1;
    }
}
