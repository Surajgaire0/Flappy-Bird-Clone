function Background(canvas) {
    this.spriteX = 0;
    this.spriteY = 0;
    this.spriteWidth = 274;
    this.spriteHeight = 226;
    this.x = 0;
    this.y = canvas.height - 226; //canvas_width-spriteHeight
    this.canvas = canvas;

    this.draw = (ctx, sprite) => {
        ctx.drawImage(sprite, this.spriteX, this.spriteY, this.spriteWidth, this.spriteHeight, this.x, this.y, this.canvas.width, this.spriteHeight);
    };
}

export default Background;