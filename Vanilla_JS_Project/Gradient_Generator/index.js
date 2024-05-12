let colorOne = document.getElementById("color-a")
let colorTwo = document.getElementById("color-b")
let currentDirection = 'to bottom'
let outputCode = document.getElementById("code")

function setDirection(value,_this){
    let directions = document.querySelectorAll(".buttons button")
    console.log(directions,value,_this)
    for(let i of directions){
        i.classList.remove("active")
    }
    _this.classList.add("active")
    currentDirection = value;
}

function generateCode(){
    // Textarea의 value값 문자열로 넣어줌
    outputCode.value = `background-image: linear-gradient(${currentDirection}, ${colorOne.value}, ${colorTwo.value})`
    // BODY의 배경색 지정
    document.getElementsByTagName("BODY")[0].style.backgroundImage = `linear-gradient(${currentDirection},${colorOne.value},${colorTwo.value})`
}

function copyText(){
    outputCode.select()
    document.execCommand("copy")
    alert("Gradient Copied")
}