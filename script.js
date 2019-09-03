//Snakes Game
sessionStorage.setItem("hiscore", 0);

function init() {
    canvas = document.getElementById('myCanvas');
    pen = canvas.getContext('2d');
    W = canvas.width;
    H = canvas.height;
    score = 0;
    game_over = false;

    /* The function returns an object that provides method and
     * properties for drawing and manupulating images and graphics 
     * on a canvas element in a document
     */

    snake = {
        init_length: 5,
        color: "green",
        cells: [],
        // cells is an array of coordinate object which makes up the snake body
        // coordinate object consist of the x and y coordinates of the block 
        direction: "right",


        createSnake: function () {
            for (var i = this.init_length - 1; i >= 0; --i) {
                this.cells.push({ x: i, y: 0 });
                //the rightmost block(tail) is the first element to be poped
                //cells contain : n-1, n-2, n-3, ... 0
            }
        },

        drawSnake: function () {
            for (var i = 0; i < this.cells.length; ++i) {
                pen.fillStyle = this.color;
                //defines the color of the pen to draw on canvas
                pen.fillRect(this.cells[i].x * 10, this.cells[i].y * 10, 9, 9);
                // function draws a solid rectangle of width arg3 and height arg2 cornered at (arg1,arg2)
            }
        },

        updateSnake: function () {

            //current head coordinates
            var headX = this.cells[0].x;
            var headY = this.cells[0].y;
            var dx = 0, dy = 0;

            if (headX == food.x && headY == food.y) {
                // if snake eats food
                food = getRandomFood();
                score += 1;
            }
            else {
                temp = this.cells.pop();
            }

            // snake eats itself
            for (i = 1; i < this.cells.length; ++i) {
                if (this.cells[i].x == headX && this.cells[i].y == headY) {
                    game_over = true;
                    h = sessionStorage.getItem("hiscore");
                    h = (h > score) ? h : score;
                    sessionStorage.setItem("hiscore", h);
                    return;
                }
            }


            // snake movements
            if (this.direction == "right") {
                if (headX == 30) {
                    for (i = 0; i < this.cells.length; ++i)
                        this.cells[i].x = 0 - i;
                }
                dx = 1; dy = 0;
            }
            if (this.direction == "left") {
                if (headX == 0) {
                    for (i = 0; i < this.cells.length; ++i)
                        this.cells[i].x = 30 + i;
                }
                dx = -1; dy = 0;
            }
            if (this.direction == "up") {
                if (headY == 0) {
                    for (i = 0; i < this.cells.length; ++i)
                        this.cells[i].y = 15 + i;
                }
                dx = 0; dy = -1;
            }
            if (this.direction == "down") {
                if (headY == 15) {
                    for (i = 0; i < this.cells.length; ++i)
                        this.cells[i].y = 0 - i;
                }
                dx = 0; dy = 1;
            }

            headX = this.cells[0].x;
            headY = this.cells[0].y;
            this.cells.unshift({ x: (headX + dx), y: (headY + dy) });

        }
    };

    //we cant call the function using this because that will act as a declaration
    snake.createSnake();
    //snake.drawSnake();

    function keyPressed(e) {
        /* Key codes:
                ArrowLeft = 37
                ArrowUp = 38
                ArrowRight = 39
                ArrowDown = 40
        */
        if (e.keyCode == 37)
            snake.direction = "left";
        if (e.keyCode == 38)
            snake.direction = "up";
        if (e.keyCode == 39)
            snake.direction = "right";
        if (e.keyCode == 40)
            snake.direction = "down";
    }
    document.addEventListener('keydown', keyPressed);
}

function draw() {
    pen.clearRect(0, 0, W, H);
    snake.drawSnake();

    //drawing food
    pen.fillStyle = food.color;
    pen.fillRect(food.x * 10, food.y * 10, 10, 10);

    document.getElementById("score").textContent = score;
    document.getElementById("hiscore").textContent = sessionStorage.getItem("hiscore");

}

function update() {
    snake.updateSnake();
}

function gameLoop() {
    draw();
    update();

    if (game_over == true) {
        clearInterval(f);
        if (confirm("Opps! Retry?"))
            main();
        else {
            document.getElementsByClassName("divider")[0].classList.remove("end");
            document.getElementsByClassName("msg")[0].classList.remove("end");
        }
    }
}

function getRandomFood() {
    var foodX = Math.round(Math.random() * (W - 10) / 10);
    var foodY = Math.round(Math.random() * (H - 10) / 10);

    foodColors = ["red", "yellow", "aqua"];
    var i = Math.floor(Math.random() * foodColors.length);


    var food = {
        x: foodX,
        y: foodY,
        color: foodColors[i]
    };

    return food;
}
function main() {
    init();

    //SetInterval is a predefined function
    //Here it calls the gameLoop function every 100ms
    food = getRandomFood();
    f = setInterval(gameLoop, 150);
}

main();