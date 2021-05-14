import Background from './bg.mjs';
import Bird from './bird.mjs';
import Gameover from './gameover.mjs';
import Foreground from './fg.mjs';
import Menu from './menu.mjs';
import Pipe from './pipe.mjs';
import { getRandom } from './utils.mjs';

let canvas, ctx;
let sprite;
let bg, fg, bird, gameover;
let state;
let score, highScore;
let menu;
let pipe, pipeArray = [];
let interval;

let start = () => {
    canvas = document.querySelector('.canvas');
    ctx = canvas.getContext('2d');

    sprite = new Image();
    sprite.src = './assets/sprite.png';

    state = {
        current: 0,
        menu: 0,
        running: 1,
        gameover: 2
    }

    bg = new Background(canvas);
    gameover = new Gameover(canvas);
    fg = new Foreground(canvas);
    menu = new Menu(canvas);

    loop();
}

let reset = () => {
    bird = new Bird(canvas);
    score = 0;
    pipeArray = [new Pipe(canvas, -getRandom(0, 150), sprite)];

    interval = setInterval(() => {
        pipe = new Pipe(canvas, -getRandom(0, 100), sprite);
        pipeArray.push(pipe);
    }, 3000);
}

//update function
let update = () => {
    if (state.current == state.running) {
        fg.update();
        bird.fall();

        //don't draw pipe when not visible
        if (pipeArray.length > 0) {
            if (pipeArray[0].x + pipeArray[0].width <= 0) {
                pipeArray.shift();
            }
        }

        pipeArray.forEach((pipe) => {
            pipe.update();

            if (!pipe.crossed) {
                if (pipe.x <= bird.x - pipe.width) {
                    pipe.cross();
                    score++;
                }
            }

            //if collision, game completed
            if (bird.hasCollisionDetected(pipe, fg)) {
                state.current = state.gameover;
                clearInterval(interval);
                highScore = window.localStorage.getItem('high-score') ? parseInt(window.localStorage.getItem('high-score')) : 0;
                if (score > highScore) {
                    highScore = score;
                    window.localStorage.setItem('high-score', score);
                }
            }
        })
    };
}

//draw function
let draw = () => {
    ctx.fillStyle = 'rgb(65,163,168)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    bg.draw(ctx, sprite);


    if (state.current == state.menu) {
        menu.draw(ctx, sprite);
    }
    else if (state.current == state.running) {
        bird.draw(ctx, sprite);

        pipeArray.forEach((pipe) => {
            pipe.draw(ctx);
        })

        //draw score
        ctx.font = "25px Verdana";

        ctx.fillStyle = 'darkorange';
        ctx.fillText(`Score: ${score}`, 650, 45);
    }
    else if (state.current == state.gameover) {
        pipeArray.forEach((pipe) => {
            pipe.draw(ctx);
        })

        bird.draw(ctx, sprite);

        gameover.draw(ctx, sprite, score, highScore);
    }

    fg.draw(ctx, sprite);
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