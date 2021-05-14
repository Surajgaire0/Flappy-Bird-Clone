function Gameover(canvas) {
    this.spriteX = 175;
    this.spriteY = 230;
    this.width = 225;
    this.height = 200;
    this.canvas = canvas;
    this.x = (this.canvas.width - this.width) / 2;
    this.y = (this.canvas.height - this.height) / 2;

    this.isButtonClicked = (e) => {
        if (this.x + 80 < e.offsetX && this.x + 151 > e.offsetX &&
            this.y + 173 < e.offsetY && this.y + 205 > e.offsetY) {
            return true;
        };
        return false;
    }

    this.draw = (ctx, sprite, score = 0, high = 0) => {
        ctx.drawImage(sprite, this.spriteX, this.spriteY, this.width, this.height, this.x, this.y, this.width, this.height);
        ctx.drawImage(sprite, 358, 157, 45, 45, this.x + 26, this.y + 86, 45, 45);

        ctx.font = "22px Verdana";

        ctx.fillStyle = 'green';
        ctx.fillText(score, this.x + 175, this.y + 95);
        ctx.fillText(high, this.x + 175, this.y + 135);
    }
}

export default Gameover;