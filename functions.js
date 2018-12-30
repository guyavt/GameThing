let xrecheck = false,
    yrecheck = false;

function collide(block, other) {
    let lastx = block.bb.vertices.topLeft[0] - block.vx, lasty = block.bb.vertices.topLeft[1] - block.vy;
    let ox = other.bb.vertices.topLeft[0], oy = other.bb.vertices.topLeft[1];

    if (
        block.bb.vertices.topLeft[0] < ox + other.bb.w &&
        block.bb.vertices.topLeft[0] + block.bb.w > ox &&
        block.bb.vertices.topLeft[1] < oy + other.bb.h &&
        block.bb.vertices.topLeft[1] + block.bb.h > other.y
    ) {
        if (
            lastx < ox + other.bb.w &&
            lastx + block.bb.w > ox &&
            block.bb.vertices.topLeft[1] < oy + other.bb.h &&
            block.bb.vertices.topLeft[1] + block.bb.h > other.y
        ) {
            if (
                block.bb.vertices.topLeft[0] < ox + other.bb.w &&
                block.bb.vertices.topLeft[0] + block.bb.w > ox &&
                lasty < oy + other.bb.h &&
                lasty + block.bb.h > other.y
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
                    if (block.vy < 0 && other.bb.collisionSides.bottom) {
                        block.y -= (block.bb.vertices.topLeft[1] - (oy + other.h));
                    } else if (block.vy > 0 && other.bb.collisionSides.top) {
                        block.y += (oy - (block.bb.vertices.topLeft[1] + block.h));
                        block.onground = true;
                    }

                    block.vy = 0;
                } else if (other.ystate == BLOCK_STATE.PUSHABLE) {
                    other.y += block.vy - other.vy;

                    if (block.vy < 0 && other.bb.collisionSides.bottom) {
                        block.y -= (block.bb.vertices.topLeft[1] - (oy + other.h)) - other.vy;
                    } else if (block.vy > 0 && other.bb.collisionSides.top) {
                        block.y += (oy - (block.bb.vertices.topLeft[1] + block.h)) + other.vy;
                        block.onground = true;
                    }
                } else {
                    if (block.vy < 0 && other.bb.collisionSides.bottom) {
                        block.y -= (block.bb.vertices.topLeft[1] - (oy + other.h)) - other.vy;
                    } else if (block.vy > 0 && other.bb.collisionSides.top) {
                        block.y += (oy - (block.bb.vertices.topLeft[1] + block.h)) + other.vy;
                        block.onground = true;
                    }

                    block.vy = 0;
                }

                if (block.ystate != BLOCK_STATE.STATIC && other.type == BLOCK_TYPE.SPRINGBOARD) {
                    block.ay = other.force * -block.ydir;
                    block.onground = false;
                    // if (up) block.ay += (other.force * -block.ydir) / 4;
                }

                if (other.xstate == BLOCK_STATE.DYNAMIC && block.onground) block.ax = other.vx;
            }
        } else {
            if (other.xstate == BLOCK_STATE.STATIC) {
                if (block.vx < 0 && other.bb.collisionSides.right) {
                    block.x -= block.vx;
                    block.x -= (block.bb.vertices.topLeft[0] - (ox + other.w));
                } else if (block.vx > 0 && other.bb.collisionSides.left) {
                    block.x -= block.vx;
                    block.x += (ox - (block.bb.vertices.topLeft[0] + block.w));
                }

                block.vx = 0;
            } else if (other.xstate == BLOCK_STATE.PUSHABLE) {
                other.x += block.vx - other.vx;

                if (block.vx < 0 && other.bb.collisionSides.right) {
                    block.x += (block.bb.vertices.topLeft[0] - (ox + other.w)) - other.vx;
                    block.x -= block.vx;
                } else if (block.vx > 0 && other.bb.collisionSides.left) {
                    block.x += (ox - (block.bb.vertices.topLeft[0] + block.w)) + other.vx;
                    block.x -= block.vx;
                }
            } else {
                if (block.vx < 0 && other.bb.collisionSides.right) {
                    block.x += (block.bb.vertices.topLeft[0] - (ox + other.w)) - other.vx;
                    block.x -= block.vx;
                } else if (block.vx > 0 && other.bb.collisionSides.left) {
                    block.x += (ox - (block.bb.vertices.topLeft[0] + block.w)) + other.vx;
                    block.x -= block.vx;
                }

                block.vx = 0;
            }
        }
    }
}
