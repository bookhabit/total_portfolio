const cvs = document.getElementById("tetris")
const ctx = cvs.getContext("2d");
console.log(cvs)
console.log(ctx)
ctx.fillStyle = "blue"
ctx.fillRect(100,150,50,50) // 직사각형

ctx.strokeStyle = "red"
ctx.strokeRect(100,200,50,50)