function randColor() {
    return `hsl(${360*Math.random()},${Math.floor(Math.random() * 101)}%,${Math.floor(Math.random() * 101)}%)`;
}

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

// Paddle
var paddleWidth = 75;
var paddleHeight = 10;
var paddleX = (canvas.width-paddleWidth) / 2;
var paddleColor = randColor();

var rightPressed = false;
var leftPressed = false;

// Ball
var ballX = canvas.width/2;
var ballY = canvas.height-30;
var ballRadius = 5;
var ballColor = randColor();

var dx = 2;
var dy = -2;


function drawBall() {
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = ballColor;
    ctx.fill();
    ctx.closePath();
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = paddleColor;
    ctx.fill();
    ctx.closePath();
}

function draw() {
    ctx.clearRect(0, canvas.height - paddleHeight, canvas.width, canvas.height );
    drawBall();
    drawPaddle();
    ballX += dx;
    ballY += dy;

    if ( ballY + dy < ballRadius ) {
        dy = -dy
        ballColor = randColor();
    } else if ( ballY + dy > canvas.height-ballRadius ) {
        if ( ballX > paddleX && ballX < paddleX + paddleWidth  ) {
            dy = -dy
            paddleColor = ballColor;
            ballColor = randColor();
        } else {
            alert('Looser!');
            document.location.reload();
            clearInterval(interval);
        }
    }

    if( ballX + dx > canvas.width-ballRadius || ballX + dx < ballRadius ) {
        dx = -dx;
        ballColor = randColor();
    }

    if(rightPressed) {
        paddleX += 7;
        if ( paddleX + paddleWidth > canvas.width ) {
            paddleX = canvas.width - paddleWidth;
        }
    } else if(leftPressed) {
        paddleX -= 7;
        if ( paddleX < 0 ) {
            paddleX = 0;
        }
    }
}

function keyDownHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    } else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    } else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}

var interval = setInterval(draw, 10);

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
