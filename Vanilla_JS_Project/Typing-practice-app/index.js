// random quotes api
const quoteApiUrl = "https://api.quotable.io/random?minLength=40&maxLength=60"

const quoteSection = document.getElementById("quote")
const userInput = document.getElementById("quote-input")

let quote = ""
let time = 60
let timer = ""
let mistakes = 0

// display random quotes
const renderNewQuote = async ()=>{
    console.log('랜덤 api')
    const response = await fetch(quoteApiUrl)
    let data = await response.json();
    quote = data.content;
    
    // array of chars in quote
    let arr = quote.split("").map((value)=>{
        return "<span class='quote-chars'>"+value+"</span>"
    })
    quoteSection.innerHTML += arr.join("")
}

// Logic to compare input words with quote
// quoteChars : 사용자가 따라 입력해야할 인용구 문자
// userInputChars : 사용자가 입력하는 문자
userInput.addEventListener("input",()=>{
    let quoteChars = document.querySelectorAll(".quote-chars")
    quoteChars = Array.from(quoteChars)
    
    // Array of user input chars
    let userInputChars = userInput.value.split("")
    
    // Loop through each char in quote
    quoteChars.forEach((char,index)=>{
        console.log(char.innerText)
        console.log(userInputChars[index])
        // Check chars with quote chars
        if(char.innerText == userInputChars[index]){
            char.classList.add("success");
        }
        // if user hasn't entered anything or backspaced
        else if(userInputChars[index]==null){
            if(char.classList.contains("success")){
                char.classList.remove("success")
            }else{
                char.classList.remove("fail")
            }
        }
        // if user entered wrong char
        else{
            if(!char.classList.contains("fail")){
                mistakes++;
                char.classList.add("fail")
            }
            document.getElementById("mistakes").innerText = mistakes;
        }

        // Return true if all chars are correct
        let check = quoteChars.every((element)=>{
            return element.classList.contains("success")
        })

        // End test if all chars are correct
        if(check){
            displayResult()
        }

    })
})

// Update timer
function updateTimer(){
    if(time==0){
        // End test if reaches 0 
        displayResult()
    }else{
        document.getElementById("timer").innerText = --time + "s";
    }
}

// Set timer
const timeReduce = ()=>{
    time = 60;
    timer = setInterval(updateTimer,1000)
}

// End test
const displayResult = ()=>{
    // Display result div
    document.querySelector(".result").style.display = "block"
    clearInterval(timer)
    document.getElementById("stop-test").style.display = "none"
    userInput.disabled = true;
    // 정확도 - 속도 구하기
    let timeTaken = 1;
    if(time != 0){
        timeTaken = (60 - time) / 100;
    }
    document.getElementById("wpm").innerText = (userInput.value.length / 5 / timeTaken).toFixed(2) + "wpm"
    document.getElementById("accuracy").innerText = Math.round(((userInput.value.length - mistakes)/userInput.value.length)*100) + "%"
}

// Start test
const startTest = ()=>{
    mistakes = 0;
    timer = "";
    userInput.disabled = false
    timeReduce()
    document.getElementById("start-test").style.display = "none"
    document.getElementById("stop-test").style.display = "block"
}

// Reset test
const resetTest = ()=>{
    mistakes = 0;
    timer = "";
    userInput.disabled = false
    timeReduce()
    document.getElementById("start-test").style.display = "none"
    document.querySelector(".result").style.display = "none"
    document.getElementById("stop-test").style.display = "block"
    renderNewQuote()
}

window.onload = ()=>{
    userInput.value = "";
    document.getElementById("start-test").style.display = "block"
    document.getElementById("stop-test").style.display = "none"
    userInput.disabled = true
    renderNewQuote()
}