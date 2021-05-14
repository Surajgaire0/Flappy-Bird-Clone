function Menu(canvas) {
    this.spriteX = 0;
    this.spriteY = 230;
    this.width = 174;
    this.height = 149;
    this.canvas = canvas;
    this.x = (this.canvas.width - this.width) / 2;
    this.y = (this.canvas.height - this.height) / 2;

    this.isMenuClicked = (e) => {
        if (this.x < e.offsetX && this.x + this.width > e.offsetX &&
            this.y < e.offsetY && this.y + this.height > e.offsetY) {
            return true;
        };
        return false;
    };

    this.draw = (ctx, sprite) => {
        ctx.drawImage(sprite, this.spriteX, this.spriteY, this.width, this.height, this.x, this.y, this.width, this.height);
    }
}

export default Menu;