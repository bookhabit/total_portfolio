import BLOCKS from "./blocks.js";

// DOM
const playground = document.querySelector(".playground > ul")
const gameText = document.querySelector('.game-text')
const scoreDisplay = document.querySelector('.score')
const restartButton = document.querySelector('.game-text > button')


// Setting
const GAME_ROWS = 20;
const GAME_COLS = 10;

// Variables
let score = 0;
let duration = 500; // 떨어지는 시간
let downInterval;
let tempMovingItem;

// 블록의 타입
const movingItem = {
    type : "",
    direction:0,
    top:0,
    left:3,
}

init()

// Functions
function init(){
    tempMovingItem = {...movingItem}
    for(let i=0; i<GAME_ROWS; i++){
        prependNewLine()
    }
    generateNewBlock()
}

// 10개의 픽셀을 가진 1줄을 20개 출력
function prependNewLine(){
    const li = document.createElement("li")
    const ul = document.createElement("ul")
    for(let j=0; j<GAME_COLS; j++){
        const matrix = document.createElement("li")
        ul.prepend(matrix)    
    }
    li.prepend(ul)
    playground.prepend(li)
}

function renderBlocks(moveType=""){
    const {type,direction,top,left} = tempMovingItem
    console.log('렌더링',type)
    // 이전 블록의 좌표 삭제
    const movingBlocks = document.querySelectorAll(".moving")
    movingBlocks.forEach(moving=>{
        moving.classList.remove(type,"moving")
    })
    // 블록 좌표 생성 (클래스 추가해서 화면에 보여짐)
    BLOCKS[type][direction].some(block=>{
        const x = block[0] + left // ul태그 1줄당 li의 값
        const y = block[1] + top // li의 row값

        // 화면 벗어나지 않도록 에러 조건 처리
        // 이 값은 픽셀 1개
        
        const target = playground.childNodes[y] ? playground.childNodes[y].childNodes[0].childNodes[x] : null; 
        const isAvailable = checkEmpty(target)
        if(isAvailable){
            target.classList.add(type,"moving")
        }else{
            // 블록의 초기 값 원상복귀
            tempMovingItem = {...movingItem}
            if(moveType === "retry"){
                clearInterval(downInterval)
                showGameoverText()
            }
            setTimeout(()=>{
                renderBlocks("retry")
                if(moveType === "top"){
                    seizeBlock()
                }
            },0)
            // renderBlocks()
            return true
        }
    })
    movingItem.left = left;
    movingItem.top = top;
    movingItem.direction = direction
}

// 블록이 화면 제일 아래에 닿으면 처리하는 함수
// 새로운 블록 생성
// 화면 아래의 블록들 저장
function seizeBlock(){
    console.log('seize block')
    const movingBlocks = document.querySelectorAll(".moving")
    movingBlocks.forEach(moving=>{
        moving.classList.remove("moving")
        moving.classList.add("seized")
    })
    checkMatch()
}

function checkMatch(){
    const childNodes = playground.childNodes;
    childNodes.forEach(child=>{
        let matched = true;
        child.children[0].childNodes.forEach(li=>{
            if(!li.classList.contains("seized")){
                // ul 1줄에 1칸이라도 없으면
                matched = false; 
            }
        })
        if(matched){
            child.remove();
            prependNewLine()
            score++
            scoreDisplay.innerText = score;
        }
    })

    generateNewBlock()
}

function generateNewBlock(){

    // 아래로 1줄씩 떨어뜨리기
    clearInterval(downInterval)
    downInterval = setInterval(() => {
        moveBlock('top',1) 
    }, duration);

    const blockArray = Object.entries(BLOCKS)
    const randomIndex = Math.floor(Math.random()*blockArray.length)

    movingItem.type = blockArray[randomIndex][0]
    movingItem.top = 0;
    movingItem.left = 3;
    movingItem.direction = 0;
    tempMovingItem = {...movingItem}
    renderBlocks()
}

// 화면에 벗어나지 않도록 확인
function checkEmpty(target){
    if(!target || target.classList.contains("seized")){
        return false
    }
    return true
}

// 블록 이동시키기 
// left와 top값을 변경시켜서 좌표를 변경시켜준다.
function moveBlock(moveType,amount){
    tempMovingItem[moveType] += amount;
    renderBlocks(moveType)
}

function changeDirection(){
    const direction = tempMovingItem.direction;
    direction === 3 ? tempMovingItem.direction = 0 : tempMovingItem.direction += 1;
    renderBlocks()
}

function dropBlock(){
    clearInterval(downInterval)
    downInterval = setInterval(() => {
        moveBlock("top",1)
    }, 10);
}

function showGameoverText(){
    gameText.style.display = 'flex'
}

// Event handling
// keydown event는 ArrowLeft (37) , ArrowRight(39) , ArrowDown(40) , ArrowUp(38), spaceBar(32)
document.addEventListener("keydown",e=>{
    switch(e.keyCode){
        case 39:
            moveBlock("left",1)
            break
        case 37:
            moveBlock("left",-1)
            break
        case 40:
            moveBlock("top",1)
            break;
        case 38 : 
            changeDirection();
            break;
        case 32 : 
            dropBlock();
            break;
        default : 
            break
    }
})

restartButton.addEventListener("click",()=>{
    playground.innerHTML = "";
    gameText.style.display = 'none'
    init()
})