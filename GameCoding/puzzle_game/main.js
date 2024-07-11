const imgContainer = document.querySelector(".image-container")
const startButton = document.querySelector(".start-button")
const gameText = document.querySelector(".game-text")
const playTime = document.querySelector(".play-time")

const tileCount = 16;

let tiles = []

setGame()

function setGame(){
    imgContainer.innerHTML = ""
    tiles = createImageTiles();
    // 초기 이미지 보여줌
    tiles.forEach(tile => imgContainer.appendChild(tile));
    console.log('첫번째 imgContainer', imgContainer);

    // 2초 후에 뒤섞인 이미지를 보여줌
    setTimeout(() => {
        imgContainer.innerHTML = "";
        shuffle(tiles).forEach(tile => imgContainer.appendChild(tile));
    }, 2000);
    // console.log('2번째 imgContainer', imgContainer)
}



// li태그 (이미지 컨테이너 1개씩 생성)
function createImageTiles(){
    const tempArray = []
    Array(tileCount).fill().forEach((_,i)=>{
        const li = document.createElement("li")
        li.setAttribute('data-index',i)
        li.classList.add(`list${i}`)
        tempArray.push(li)
    })
    return tempArray
}

// 랜덤으로 섞기 - index 이용
function shuffle(array) {
    let index = array.length - 1;
    while (index > 0) {
        let randomIndex = Math.floor(Math.random() * (index + 1));
        [array[index], array[randomIndex]] = [array[randomIndex], array[index]];
        index--;
    }
    return array;
}

// events
imgContainer.addEventListener('dragstart',e=>{
    console.log(e)
})
