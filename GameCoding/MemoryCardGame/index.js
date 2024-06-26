const cards = document.querySelectorAll(".card")

let matchedCard = 0;
let cardOne,cardTwo;
let disableDeck = false;

// 카드 뒤집기
function flipCard(e){
    let clickedCard = e.target;
    // 첫번째, 두번째 똑같은 카드 선택하지 못하게 막기
    // 뒤집을 때는 하나씩만 뒤집을 수 있도록 에러처리
    if(clickedCard !== cardOne && !disableDeck){
        clickedCard.classList.add("flip")
        if(!cardOne){
            // 첫번째 클릭한 카드 설정
            return cardOne = clickedCard;
        }
        cardTwo = clickedCard
        disableDeck = true;
        console.log(cardOne,cardTwo)

        let cardOneImg = cardOne.querySelector(".back-view img").src,
        cardTwoImg = cardTwo.querySelector(".back-view img").src
        matchCards(cardOneImg,cardTwoImg)
    }
}

// 클릭한 카드이미지 2개가 일치한지 확인! (정답인지)
function matchCards(img1,img2){
    if(img1 === img2){
        matchedCard++
        
        // 총 16개이므로 8개 동일한 이미지를 맞추면 게임끝
        if(matchedCard == 8){
            alert("게임 성공")
            setTimeout(() => {
                return shuffleCard()
            }, 1000);
        }
        // 정답을 맞춘 카드는 다시 뒤집지 못하도록 이벤트 제거
        cardOne.removeEventListener("click",flipCard)
        cardTwo.removeEventListener("click",flipCard)
        cardOne = cardTwo = "" // 카드 2개 초기화
        return disableDeck = false
        
    }
    // 클릭한 카드가 일치하지 않다면
    setTimeout(() => {
        cardOne.classList.add("shake")
        cardTwo.classList.add("shake")
    }, 400);

    // 일치하지 않으면 클래스 삭제 (다시 원래대로 뒤집어줌)
    setTimeout(() => {
        cardOne.classList.remove("shake","flip")
        cardTwo.classList.remove("shake","flip")
        cardOne = cardTwo = "" // 카드 2개 초기화
        disableDeck = false
    }, 1200);
}

// 게임 초기화!
function shuffleCard(){
    matchedCard = 0;
    cardOne = cardTwo = ""
    disableDeck = false

    // 카드 랜덤으로 정렬
    let arr = [1,2,3,4,5,6,7,8,1,2,3,4,5,6,7,8,]
    arr.sort(()=>Math.random() > 0.5 ? 1 : -1) 

    cards.forEach((card,index)=>{
        console.log('card',card)
        card.classList.remove("flip")
        let imgTag = card.querySelector('.back-view img')
        imgTag.src = `images/img-${arr[index]}.png`
        card.addEventListener("click",flipCard)
    })
}

shuffleCard()

cards.forEach(card=>{
    card.classList.add("flip")
    card.addEventListener("click",flipCard)
})