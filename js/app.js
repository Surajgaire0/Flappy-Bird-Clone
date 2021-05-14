import Background from './bg.mjs';
import Bird from './bird.mjs';
import Gameover from './gameover.mjs';
import Foreground from './fg.mjs';
import Menu from './menu.mjs';

let canvas, ctx;
let sprite;
let bg, fg, bird, gameover;
let state;
let score, highScore;
let menu;

let start = () => {
    canvas = document.querySelector('.canvas');
    ctx = canvas.getContext('2d');

    sprite = new Image();
    sprite.src = './assets/sprite.png';

    state = {
        current: 2,
        menu: 0,
        running: 1,
        gameover: 2
    }

    bg = new Background(canvas);
    gameover = new Gameover(canvas);
    fg = new Foreground(canvas);
    menu = new Menu(canvas);

    reset();
    loop();
}

let reset = () => {
    bird = new Bird(canvas);
    score = 0;
}

//update function
let update = () => {
    if (state.current == state.running) {
        fg.update();
        bird.update();
    };
}

//draw function
let draw = () => {
    ctx.fillStyle = 'rgb(65,163,168)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    bg.draw(ctx, sprite);
    fg.draw(ctx, sprite);

    if (state.current == state.menu) {
        menu.draw(ctx, sprite);
    }
    else if (state.current == state.running) {
        bird.draw(ctx, sprite);

        //draw score
        ctx.font = "25px Verdana";

        ctx.fillStyle = 'darkorange';
        ctx.fillText(`Score: ${score}`, 650, 45);
    }
    else if (state.current == state.gameover) {
        gameover.draw(ctx, sprite, score, highScore);
    }
}

//loop
let loop = () => {
    update();
    draw();
    requestAnimationFrame(loop);
}

document.addEventListener('DOMContentLoaded', start);

document.addEventListener('click', (e) => {
    if (state.current == state.menu) {
        if (menu.isMenuClicked(e)) {
            state.current = state.running;
            reset();
        }
    }
    else if (state.current == state.running) {
        bird.rise();
    }
    else if (state.current == state.gameover) {
        if (gameover.isButtonClicked(e)) {
            state.current = state.running;
            reset();
        }
    }
});