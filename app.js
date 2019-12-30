const canvas = document.querySelector("#jsCanvas");
const ctx = canvas.getContext('2d');

const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");


const INITIAL_COLOR = "#2c2c2c"
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.strokeStyle = "#INITIAL_COLOR";
ctx.fillStyle = "#INITIAL_COLOR";
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function handleModeClick(){
    if(filling === true){
        filling = false;
        mode.innerText = "Fill";
    }else{
        filling = true;
        mode.innerText = "paint";
    }

}

function handleColorClick(event){
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handleRangeChange(event){
    const size = event.target.value;
    ctx.lineWidth = size;
}


function startPainting(event){
    painting = true;
}

function stopPainting(){
    painting = false;
}

function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting){
        ctx.beginPath(); //현재 경로의 시작점값 초기화 
        ctx.moveTo(x,y); //x, y 위치가 경로의 시작점으로 고정
    }else{
        ctx.lineTo(x,y);//x, y 위치가 경로의 도착점으로 고정 
        ctx.stroke(); //경로를 그리는 function
     }
}

function handleCanvasClick(){
    if(filling){
    ctx.fillRect(0,0,CANVAS_SIZE,CANVAS_SIZE);
    }
}

function handleSaveClick(){
    const image = canvas.toDataURL("");
    const link = document.createElement("a");
    link.href = image
    link.download = "IMAGE_DOWNLOAD";
    link.click();
}


if(canvas){
    Array.from(colors).forEach(color => color.addEventListener("click",handleColorClick));
    canvas.addEventListener("mousemove",(e)=>{if(!filling){onMouseMove(e);}});
    canvas.addEventListener("mousedown",startPainting);
    canvas.addEventListener("mouseup",stopPainting);
    canvas.addEventListener("mouseleave",stopPainting);
    canvas.addEventListener("mousedown",handleCanvasClick);
}

if(range){
    range.addEventListener("input",handleRangeChange);
}

if(mode){
    mode.addEventListener("click",handleModeClick);
}

if(saveBtn){
    saveBtn.addEventListener("click",handleSaveClick);
    console.log("saveBtn Load");
}