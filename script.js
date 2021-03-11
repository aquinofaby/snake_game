let canvas = document.getElementById('snake');
let context = canvas.getContext ('2d');
let box = 32;
let snake = []; // criando a cobrinha sera uma lista  com varias coordenadas
snake [0] = {
    x: 8 * box,
    y: 8 * box
}

let direction = "right";
let food = { // criar posições aleatorias pra comidinha no jogo//
    x: Math.floor (Math.random() * 15+1 ) * box, //MATH.FLOOr retira a parte flutuante do numero random no caso 16.1 vira 16//
    y: Math.floor (Math.random() * 15+1 ) * box
}


function criarBG () {
    context.fillStyle = "CornflowerBlue";
    context.fillRect(0,0,16 * box, 16 * box);
}


function criarCobrinha () {
    for (i=0; i < snake.length; i++){
        context.fillStyle = "DarkSlateBlue";
        context.fillRect(snake[i].x, snake[i].y, box,box);
    }
}

function criarFood () {
    context.fillStyle  = "Deeppink";
    context.fillRect (food.x, food.y, box, box);
}

document.addEventListener('keydown', update); // pegar o keydow evento de click e chamar a função update//

function update (event) {
    if (event.keyCode == 37 && direction != "right") direction = "left";
    if (event.keyCode == 38 && direction != "down") direction = "up";
    if (event.keyCode == 39 && direction != "left") direction = "right";
    if (event.keyCode == 40 && direction != "up") direction = "down";
}

function iniciarJogo(){
    if (snake[0].x > 15*box && direction =="right") snake [0].x = 0;
    if (snake[0].x < 0  && direction =="left") snake [0].x = 16*box;
    if (snake[0].y > 15*box && direction =="down") snake [0].y = 0
    if (snake[0].y < 0 && direction == "up") snake [0].y = 16*box;

    for (i = 1; i <snake.length; i++) {
        if (snake[0].x == snake[i].x && snake[0].y == snake [i].y){ // se a posição 0 de x (cabeça) for examente a mesma posição de i de y (corpo) e se a posição 0 de y  (corpo) for examente a mesma posição de i de x (cabeça)//
            clearInterval(jogo);
            alert ('Game Over');
        }
    }
    criarBG();
    criarCobrinha ();
    criarFood ();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(direction=="right") snakeX += box; //Se a direção for igual a right a posição do snakeX acrescenta mais um quadradinho (box)//
    if(direction=="left") snakeX -= box; // pra direita aumenta pra esquerda diminui
    if(direction=="up") snakeY -= box; 
    if(direction=="down") snakeY+= box;

    if(snakeX != food.x || snakeY != food.y) {
        snake.pop ();
    }
    else {food.x = Math.floor (Math.random() * 15+1 ) * box,
         food.y = Math.floor (Math.random() * 15+1 ) * box

    }


    let newHead = {
        x: snakeX,
        y: snakeY

    }
    
    snake.unshift(newHead);
}

let jogo = setInterval (iniciarJogo, 100);