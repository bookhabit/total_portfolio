const cvs = document.getElementById("tetris")
const ctx = cvs.getContext("2d");
console.log(cvs)
console.log(ctx)

// 정사각형 만들기
ctx.fillStyle = "red"
ctx.fillRect(60,40,20,20)
ctx.strokeStyle = "black"
ctx.strokeRect(60,40,20,20)

// 변수로 만들기
const SQ = SQUARESIZE= 20

ctx.fillStyle = "red"
ctx.fillRect(4*SQ,2*SQ,SQ,SQ)
ctx.strokeStyle = "black"
ctx.strokeRect(4*SQ,2*SQ,SQ,SQ)

// draw square function
function drawSquare(x,y,color){
    ctx.fillStyle = color
    ctx.fillRect(x*SQ,y*SQ,SQ,SQ)
    ctx.strokeStyle = "black"
    ctx.strokeRect(x*SQ,y*SQ,SQ,SQ)
}

drawSquare(5,6,"green")


// create game board
const ROW = 20
const COLUMN = 10
const VACANT = "white"

// game board의 인덱스 가지고 있음
let board = [] 
for(r=0;r<ROW;r++){
    board[r] = []
    console.log('board[r]',board)
    for(c=0;c<COLUMN;c++){
        board[r][c] = VACANT
        console.log('board',board)
    }
}

// To draw the board
function drawBoard(){
    for(r=0;r<ROW;r++){
        for(c=0;c<COLUMN;c++){
            drawSquare(c,r,board[r][c])
        }
    }
}
drawBoard()