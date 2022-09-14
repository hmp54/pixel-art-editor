const CANVAS_WIDTH = 720; 
const CANVAS_HEIGHT = 720; 
const SCALE = 20; 
const grid_color = '#E6E6E3'; 

//CREATE CANVAS AND CANVAS GRID
let canvas = document.querySelector("canvas"); 
let ctx = canvas.getContext("2d"); 
let coords = {x: 0, y: 0}; //Cursor coordinates

canvas.width = CANVAS_WIDTH; 
canvas.height = CANVAS_HEIGHT; 

ctx.beginPath();
ctx.lineWidth = 1; 
ctx.strokeStyle = grid_color; 

for(let y= SCALE; y < CANVAS_HEIGHT; y+= SCALE){
    ctx.moveTo(0,y); 
    ctx.lineTo(CANVAS_WIDTH,y); 
}

for(let x = SCALE; x < CANVAS_WIDTH; x+= SCALE){
    ctx.moveTo(x, 0);
    ctx.lineTo(x, CANVAS_HEIGHT);  
}

ctx.stroke(); 

//DRAW PIXELS BASED ON CURSOR COORDINATES
document.addEventListener('mousedown', start); 
document.addEventListener('mousedown', draw); 
document.addEventListener('mouseup', stop); 
//draw on mousedown and/or mousemove

function start(event){
    document.addEventListener('mousemove', draw);
    reposition(event); 
    console.log('click')
}

function reposition(event){
    let x = roundToNearestInterval((event.clientX - canvas.offsetLeft)); 
    let y = roundToNearestInterval(event.clientY - canvas.offsetTop); 

    if(coords.x != x || coords.y != y){
        coords.x = x; 
        coords.y = y; 
        console.log("X: " + coords.x + "Y: " + coords.y);
    }
}

function stop(event){
    document.removeEventListener('mousemove', draw); 
}

function draw(event){
    ctx.fillStyle = 'pink';
    reposition(event); 
    ctx.fillRect(coords.x, coords.y, SCALE, SCALE); 
}


function roundToNearestInterval(value){
    return Math.floor(value/SCALE) * SCALE; 
}