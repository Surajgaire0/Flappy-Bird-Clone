function Bird(canvas) {
    this.spriteX = 278;
    this.spriteY = 112;
    this.spriteWidth = 34;
    this.spriteHeight = 26;
    this.canvas = canvas;
    this.x = this.canvas.width / 6;
    this.y = this.canvas.height / 3;
    this.width = this.spriteWidth * 1.33;
    this.height = this.spriteHeight * 1.33;
    this.dy = 2;

    this.update = () => {
        this.y = this.y + this.dy;
        this.dy = this.dy + 0.25; // acceleration
    }

    this.rise = () => {
        this.dy = -5;
    }

    this.draw = (ctx, sprite) => {
        ctx.drawImage(sprite, this.spriteX, this.spriteY, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
    }
}

export default Bird;