class Springboard extends Block {
    constructor(x, y, w, h, f) {
        super(x, y, w, h);

        this.force = f;

        this.init();
    }

    init() {
        this.bb.collisionSides.left = false;
        this.bb.collisionSides.right = false;

        this.type = BLOCK_TYPE.SPRINGBOARD;
    }
}
