function Foreground(canvas) {
    this.spriteX = 280;
    this.spriteY = 0;
    this.spriteWidth = 216;
    this.spriteHeight = 109;
    this.x = 0;
    this.y = canvas.height - 109; //canvas_height-spriteHeight
    this.dx = 2;
    this.canvas = canvas;

    this.update = () => {
        this.x = (this.x - this.dx) % canvas.width;
    }

    this.draw = (ctx, sprite) => {
        ctx.drawImage(sprite, this.spriteX, this.spriteY, this.spriteWidth, this.spriteHeight, this.x, this.y, this.canvas.width * 2, this.spriteHeight);
    };
}

export default Foreground;