let xrecheck = false,
    yrecheck = false;

function collide(block, other) {
    let lastx = block.x - block.vx, lasty = block.y - block.vy;
    let ox = other.x, oy = other.y;

    if (
        block.x < ox + other.w &&
        block.x + block.w > ox &&
        block.y < oy + other.h &&
        block.y + block.h > other.y
    ) {
        if (
            lastx < ox + other.w &&
            lastx + block.w > ox &&
            block.y < oy + other.h &&
            block.y + block.h > other.y
        ) {
            if (
                block.x < ox + other.w &&
                block.x + block.w > ox &&
                lasty < oy + other.h &&
                lasty + block.h > other.y
            ) {
                if (other.xstate != BLOCK_STATE.STATIC && !xrecheck) {
                    xrecheck = true;
                    yrecheck = false;
                    block.x += other.vx;
                    collide(block, other);
                }
                if (other.ystate != BLOCK_STATE.STATIC && !yrecheck) {
                    xrecheck = false;
                    yrecheck = true;
                    block.y += other.vy;
                    collide(block, other);
                }
            } else {
                block.y -= block.vy;

                if (other.ystate == BLOCK_STATE.STATIC) {
                    if (block.vy < 0) {
                        block.y -= (block.y - (oy + other.h));
                    } else if (block.vy > 0) {
                        block.y += (oy - (block.y + block.h));
                        block.onground = true;
                    }

                    block.vy = 0;
                } else if (other.ystate == BLOCK_STATE.PUSHABLE) {
                    oy += block.vy - other.vy;

                    if (block.vy < 0) {
                        block.y -= (block.y - (oy + other.h)) - other.vy;
                    } else if (block.vy > 0) {
                        block.y += (oy - (block.y + block.h)) + other.vy;
                        block.onground = true;
                    }
                } else {
                    if (block.vy < 0) {
                        block.y -= (block.y - (oy + other.h)) - other.vy;
                    } else if (block.vy > 0) {
                        block.y += (oy - (block.y + block.h)) + other.vy;
                        block.onground = true;
                    }

                    block.vy = 0;
                }

                if (other.xstate == BLOCK_STATE.DYNAMIC && block.onground) block.ax = other.vx;
            }
        } else {
            block.x -= block.vx;

            if (other.xstate == BLOCK_STATE.STATIC) {
                if (block.vx < 0) {
                    block.x -= (block.x - (ox + other.w));
                } else if (block.vx > 0) {
                    block.x += (ox - (block.x + block.w));
                }

                block.vx = 0;
            } else if (other.xstate == BLOCK_STATE.PUSHABLE) {
                ox += block.vx - other.vx;

                if (block.vx < 0) {
                    block.x -= (block.x - (ox + other.w)) - other.vx;
                } else if (block.vx > 0) {
                    block.x += (ox - (block.x + block.w)) + other.vx;
                }
            } else {
                if (block.vx < 0) {
                    block.x -= (block.x - (ox + other.w)) - other.vx;
                } else if (block.vx > 0) {
                    block.x += (ox - (block.x + block.w)) + other.vx;
                }

                block.vx = 0;
            }
        }
    }
}
