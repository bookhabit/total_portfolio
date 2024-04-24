const gameContainer = document.querySelector(".container")
const userResult = document.querySelector(".user_result img")
const cpuResult = document.querySelector(".cpu_result img")
const result = document.querySelector(".result")
const optionImages = document.querySelectorAll(".option_image")

optionImages.forEach((image,index) => {
    image.addEventListener("click",(event)=>{
        // 사용자가 클릭한 이미지 active 클래스 적용
        image.classList.add("active")

        // 가위 바위 보 3초동안 주먹으로 통일
        userResult.src = cpuResult.src = "images/rock.png"
        // 가위~ 바위~ 보!
        setTimeout(function() {
            result.textContent = "가위~";
            setTimeout(function() {
                result.textContent = "바위~";
                setTimeout(function() {
                    result.textContent = "보!!";
                }, 1000); // 1초 후에 "보"로 변경
            }, 1000); // 1초 후에 "바위"로 변경
        }, 700); // 1초 후에 "가위"로 변경

        // 클릭하지 않은 이미지는 active 클래스 제거
        optionImages.forEach((image2,index2)=>{
            index !== index2 && image2.classList.remove('active')
        })

        gameContainer.classList.add("start")

        // 시간 초 지정
        let time = setTimeout(()=>{
            gameContainer.classList.remove("start")
            // 사용자가 클릭한 이미지 DOM 요소 접근해서 src 주소 가져와서 사용자 결과화면 이미지 주소에 삽입
            let imageSrc = event.target.querySelector("img").src
            userResult.src = imageSrc

            // 컴퓨터 가위바위보 랜덤으로 돌리기
            // 이미지와 글자 S R P 순서 맞춰야함
            let randomNumber = Math.floor(Math.random()*3)
            let cpuImages = ["images/scissors.png","images/rock.png","images/paper.png"]
            cpuResult.src = cpuImages[randomNumber]

            let cpuValue = ["S","R","P"][randomNumber]
            let userValue = ["S","R","P"][index]
            
            let outcomes = {
                RR:"무승부",
                RP:"패",
                RS:"승",
                PP:"무승부",
                PR:"승",
                PS:"패",
                SS:"무승부",
                SR:"패",
                SP:"승",
            }

            // 결과 화면
            let outComeValue = outcomes[userValue + cpuValue]
            result.innerText = outComeValue
        },3500)
    })
})