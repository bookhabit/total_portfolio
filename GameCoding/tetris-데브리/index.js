// DOM
const playground = document.querySelector(".playground > ul")

// Setting
const GAME_ROWS = 20;
const GAME_COLS = 10;

// Variables
let score = 0;
let duration = 500; // 떨어지는 시간
let downInterval;
let tempMovingItem;

const BLOCKS = {
    // 사용자 방향키에 따라 모양 변경
    // x와 y의 좌표값을 가진다
    tree:[
        [[2,1],[0,1],[1,0],[1,1]],
        [],
        [],
        []
    ]
}

// 블록의 타입
const movingItem = {
    type : "tree",
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
    renderBlocks()
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

function renderBlocks(){
    const {type,direction,top,left} = tempMovingItem
    // 이전 블록의 좌표 삭제
    const movingBlocks = document.querySelectorAll(".moving")
    movingBlocks.forEach(moving=>{
        moving.classList.remove(type,"moving")
    })
    // 블록 좌표 생성 (클래스 추가해서 화면에 보여짐)
    BLOCKS[type][direction].forEach(block=>{
        const x = block[0] + left // ul태그 1줄당 li의 값
        const y = block[1] + top // li의 row값

        // 화면 벗어나지 않도록 에러 조건 처리
        // 이 값은 픽셀 1개
        
        const target = playground.childNodes[y] ? playground.childNodes[y].childNodes[0].childNodes[x] : null; 
        console.log('target값',target)
        const isAvailable = checkEmpty(target)
        if(isAvailable){
            console.log('true문')
            target.classList.add(type,"moving")
        }else{
            console.log('범위 벗어남')
            // 블록의 초기 값 원상복귀
            tempMovingItem = {...movingItem}
            // setTimeout(()=>{
            //     renderBlocks()
            // },0)
            renderBlocks()
        }
    })
    movingItem.left = left;
    movingItem.top = top;
    movingItem.direction = direction
}

// 화면에 벗어나지 않도록 확인
function checkEmpty(target){
    if(!target){
        return false
    }
    return true
}

// 블록 이동시키기 
// left와 top값을 변경시켜서 좌표를 변경시켜준다.
function moveBlock(moveType,amount){
    tempMovingItem[moveType] += amount;
    renderBlocks()
}

// Event handling
// keydown event는 ArrowLeft (37) , ArrowRight(39) , ArrowDown(40) , ArrowUp(38) 4가지의 key가 있다. 
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
        default : 
            break
    }
})