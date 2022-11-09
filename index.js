const eatingSound = new Audio('eatsound.wav');
const gameover = new Audio('gameover.wav');
const movingSound = new Audio('movingsound.wav');




let speed = 5;
let score = 0;
let lastPaintTime = 0;
let snakeArray = [
    {x: 13, y: 15}
];
let movedDirection = {x: 0, y: 0}; 
food = {x: 6, y: 7}; 

function mainFunc(currenttime) {
    window.requestAnimationFrame(mainFunc);
    
    if((currenttime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = currenttime;
    startGame();
}

function collapsed(snake) {
    // If you bump into yourself 
    for (let i = 1; i < snakeArray.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
    // If you bump into the wall
    if(snake[0].x >= 18 || snake[0].x <=0 || snake[0].y >= 18 || snake[0].y <=0){
        return true;
    }
        
    return false;
}

function startGame(){
    // Part 1: Updating the snake array & Food
    if(collapsed(snakeArray)){
        gameover.play();
        
        movedDirection =  {x: 0, y: 0}; 
        alert("Game Over. Press any key to play again");
        snakeArray = [{x: 13, y: 15}];
       
        score = 0; 
    }

   
    if(snakeArray[0].y === food.y && snakeArray[0].x ===food.x){
        eatingSound.play();
        score += 1;
        
        scorebox.innerHTML = "Score: " + score;
        snakeArray.unshift({x: snakeArray[0].x + movedDirection.x, y: snakeArray[0].y + movedDirection.y});
        let a = 2;
        let b = 16;
        food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())}
    }

    
    for (let i = snakeArray.length - 2; i>=0; i--) { 
        snakeArray[i+1] = {...snakeArray[i]};
    }

    snakeArray[0].x += movedDirection.x;
    snakeArray[0].y += movedDirection.y;

   
   
    snakeboard.innerHTML = "";
    snakeArray.forEach((e, index)=>{
        snake= document.createElement('div');
        snake.style.gridRowStart = e.y;
        snake.style.gridColumnStart = e.x;

        if(index === 0){
            snake.classList.add('snakehead');
        }
        else{
            snake.classList.add('snakebody');
        }
        snakeboard.appendChild(snake);
    });

    foods = document.createElement('div');
    foods.style.gridRowStart = food.y;
    foods.style.gridColumnStart = food.x;
    foods.classList.add('snakefood')
    snakeboard.appendChild(foods);


}







window.requestAnimationFrame(mainFunc);
window.addEventListener('keydown', e =>{
    movedDirection = {x: 0, y: 1} 
    movingSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            movedDirection.x = 0;
            movedDirection.y = -1;
            break;

        case "ArrowDown":
            console.log("ArrowDown");
            movedDirection.x = 0;
            movedDirection.y = 1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            movedDirection.x = -1;
            movedDirection.y = 0;
            break;

        case "ArrowRight":
            console.log("ArrowRight");
            movedDirection.x = 1;
            movedDirection.y = 0;
            break;
        default:
            break;
    }

});




