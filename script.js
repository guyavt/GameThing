let can = document.getElementById(`board`),
    ctx = can.getContext(`2d`),
    fps = 60,
    frc = 0,
    ivl,
    player = new Block(WIDTH / 2, HEIGHT / 2- 200, 50, 50, BLOCK_STATE.DYNAMIC, BLOCK_STATE.DYNAMIC),
    debug = false,
    left = false,
    right = false,
    up = false,
    down = false,
    walls = {
        left: new Block(0, 0, 20, HEIGHT),
        right: new Block(WIDTH - 20, 0, 20, HEIGHT, BLOCK_STATE.STATIC, BLOCK_STATE.STATIC),
        top: new Block(0, 0, WIDTH, 20),
        bottom: new Block(0, HEIGHT - 20, WIDTH, 20)
    },
    obj = new Trapdoor(WIDTH / 2, HEIGHT - 50, 60, 10, 10);


window.addEventListener(`load`, e => {
    can.width = WIDTH;
    can.height = HEIGHT;

    BLOCKS.push(player);
    BLOCKS.push(obj);

    for (let w of Object.values(walls)) {
        BLOCKS.push(w);
    }

    ivl = setInterval(loop, 1000 / fps);
});

window.addEventListener(`keydown`, e => {
    if (e.key == `ArrowLeft`) left = true;
    if (e.key == `ArrowRight`) right = true;
    if (e.key == `ArrowUp`) up = true;
    if (e.key == `ArrowDown`) down = true;
});

window.addEventListener(`keyup`, e => {
    if (e.key == `ArrowLeft`) left = false;
    if (e.key == `ArrowRight`) right = false;
    if (e.key == `ArrowUp`) up = false;
    if (e.key == `ArrowDown`) down = false;
});


function loop() {
    frc++;

    update();
    render();
}

function update() {
    if (left) player.vx = -3;
    else if (!right) player.vx = 0;
    if (right) player.vx = 3;
    else if (!left) player.vx = 0;
    if (up && player.onground) player.vy = -10;

    player.update();

    for (let b of BLOCKS) {
        if (b != player)
            b.update();
    }
}

function render() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    ctx.save();
    ctx.translate(-player.x / 2 + WIDTH / 4, -player.y / 2 + HEIGHT / 4);
    for (let b of BLOCKS) {
        if (b != player)
            b.render();
    }

    player.render();
    ctx.restore();
}
