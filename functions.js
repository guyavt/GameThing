function collide(block, other) {
    if (
        block.x < other.x + other.w &&
        block.x + block.w > other.x &&
        block.y < other.y + other.h &&
        block.y + block.h > other.y
    ) {
        let lastx = block.x - block.vx,
            lasty = block.y - block.vy;
        if (
            lastx < other.x + other.w &&
            lastx + block.w > other.x &&
            block.y < other.y + other.h &&
            block.y + block.h > other.y
        ) {
            if (
                block.x < other.x + other.w &&
                block.x + block.w > other.x &&
                lasty < other.y + other.h &&
                lasty + block.h > other.y
            ) {
                if (other.xstate != BLOCK_STATE.STATIC) {
                    block.x += other.vx;
                    collide(block, other);
                } else if (other.ystate != BLOCK_STATE.STATIC) {
                    block.y += other.vy;
                    collide(block, other);
                }
            } else {
                block.y -= block.vy;

                if (other.ystate == BLOCK_STATE.STATIC) {
                    if (block.vy < 0) {
                        block.y -= (block.y - (other.y + other.h));
                    } else if (block.vy > 0) {
                        block.y += (other.y - (block.y + block.h));
                        block.onground = true;
                    }

                    block.vy = 0;
                } else if (other.ystate == BLOCK_STATE.PUSHABLE) {
                    other.y += block.vy - other.vy;

                    if (block.vy < 0) {
                        block.y -= (block.y - (other.y + other.h)) - other.vy;
                    } else if (block.vy > 0) {
                        block.y += (other.y - (block.y + block.h)) + other.vy;
                        block.onground = true;
                    }
                } else {
                    if (block.vy < 0) {
                        block.y -= (block.y - (other.y + other.h)) - other.vy;
                    } else if (block.vy > 0) {
                        block.y += (other.y - (block.y + block.h)) + other.vy;
                        block.onground = true;
                    }

                    block.vy = 0;
                }

                if (other.xstate == BLOCK_STATE.DYNAMIC && block.onground) block.x += other.vx;
            }
        } else {
            block.x -= block.vx;

            if (other.xstate == BLOCK_STATE.STATIC) {
                if (block.vx < 0) {
                    block.x -= (block.x - (other.x + other.w));
                } else if (block.vx > 0) {
                    block.x += (other.x - (block.x + block.w));
                }

                block.vx = 0;
            } else if (other.xstate == BLOCK_STATE.PUSHABLE) {
                other.x += block.vx - other.vx;

                if (block.vx < 0) {
                    block.x -= (block.x - (other.x + other.w)) - other.vx;
                } else if (block.vx > 0) {
                    block.x += (other.x - (block.x + block.w)) + other.vx;
                }
            } else {
                if (block.vx < 0) {
                    block.x -= (block.x - (other.x + other.w)) - other.vx;
                } else if (block.vx > 0) {
                    block.x += (other.x - (block.x + block.w)) + other.vx;
                }

                if (block.onground) block.x += other.vx;

                block.vx = 0;
            }
        }
    }
}
