function Pipe(canvas, y, sprite) {
    this.spriteWidth = 55;
    this.spriteHeight = 400;
    this.width = 55;
    this.height = 225;
    this.spriteX_topPipe = 552;
    this.spriteY_topPipe = 0;
    this.spriteX_bottomPipe = 500;
    this.spriteY_bottomPipe = 0;
    this.dx = -5;
    this.gap = 138;
    this.canvas = canvas;
    this.x = this.canvas.width;
    this.y = y;
    this.lower_y = this.y + this.height + this.gap;//y_pos of lower pipe
    this.crossed = false;


    this.update = () => {
        this.x = this.x + this.dx;
    }

    this.cross = () => {
        this.crossed = true;
    }

    this.draw = (ctx) => {
        //top pipe
        ctx.drawImage(sprite, this.spriteX_topPipe, this.spriteY_topPipe, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
        //bottom pipe
        ctx.drawImage(sprite, this.spriteX_bottomPipe, this.spriteY_bottomPipe, this.spriteWidth, this.spriteHeight, this.x, this.lower_y, this.width, this.height);
    }
}

export default Pipe;